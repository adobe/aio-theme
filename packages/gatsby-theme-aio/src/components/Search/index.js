/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { AnchorLink } from '../AnchorLink';
import {
  Tabs,
  Item as TabsItem,
  Label as TabsItemLabel,
  TabsIndicator,
  positionIndicator,
  animateIndicator
} from '../Tabs';
import { Item as MenuItem, Menu } from '../Menu';
import { Popover } from '../Popover';
import PropTypes from 'prop-types';
import { MOBILE_SCREEN_WIDTH, DESKTOP_SCREEN_WIDTH, SIDENAV_WIDTH, SEARCH_PARAMS, isExternalLink } from '../../utils';
import classNames from 'classnames';
import '@spectrum-css/typography';
import '@spectrum-css/textfield';
import '@spectrum-css/search';
import '@spectrum-css/button';
import { Cross, Magnify } from '../Icons';
import { Checkbox } from '../Checkbox';

const SEARCH_INPUT_WIDTH = '688px';
const SEARCH_INDEX_ALL = 'all';
const SEARCH_KEYWORDS = 'keywords';
const SUGGESTION_MAX_RESULTS = 50;
const SEARCH_MAX_RESULTS = 100;

// Replace any character in a given unicode range with its html entity equivalent
// Source: https://stackoverflow.com/a/18750001
const encodeHTML = (html) =>
  html
    .replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';')
    .replace(/&#60;mark&#62;/g, '<mark>')
    .replace(/&#60;em&#62;/g, '<em>')
    .replace(/&#60;\/mark&#62;/g, '</mark>')
    .replace(/&#60;\/em&#62;/g, '</em>');

// Used to update the url in the browser
const setQueryStringParameter = (name, value) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
};

const mapToIndexName = (searchIndex) => searchIndex.map((index) => Object.keys(index)[0]);

const searchSuggestions = async (algolia, query, searchIndex, indexAll) => {
  const queries = [];
  // By default use all indexes
  if (Object.keys(searchIndex[0])[0] === SEARCH_INDEX_ALL) {
    searchIndex = indexAll;
  }
  // Or prioritize searchIndex
  else {
    const searchIndexNames = mapToIndexName(searchIndex).filter((index) => index !== SEARCH_INDEX_ALL);
    searchIndex = [...searchIndexNames, ...indexAll.filter((index) => !searchIndexNames.includes(index))];
  }

  searchIndex.forEach((indexName) => {
    queries.push({
      indexName,
      query,
      params: {
        hitsPerPage: Math.ceil(SUGGESTION_MAX_RESULTS / searchIndex.length),
        attributesToRetrieve: ['objectID', 'url', 'title', 'description']
      }
    });
  });

  return await algolia.multipleQueries(queries);
};

const searchIndexes = async (algolia, query, selectedIndex, indexAll, keywords) => {
  if (selectedIndex === 'all') {
    selectedIndex = indexAll;
  } else {
    selectedIndex = [selectedIndex];
  }

  const queries = [];
  selectedIndex.forEach((indexName) => {
    queries.push({
      indexName,
      query,
      params: {
        facets: [SEARCH_KEYWORDS],
        attributesToRetrieve: ['objectID', 'url'],
        hitsPerPage: Math.ceil(SEARCH_MAX_RESULTS / selectedIndex.length),
        filters: keywords.map((keyword) => `${SEARCH_KEYWORDS}:"${keyword}"`).join(' AND ')
      }
    });
  });

  return await algolia.multipleQueries(queries);
};

const mapSearchResults = (hits, results) => {
  hits.forEach(({ objectID, url, _highlightResult }) => {
    // TODO corrupted record url check
    if (!isExternalLink(url)) {
      // Verify url is unique
      if (!results.find((result) => result.url === url)) {
        results.push({
          objectID,
          url,
          _highlightResult
        });
      }
    }
  });
};

const mapKeywordResults = (facets, results) => {
  if (facets[SEARCH_KEYWORDS]) {
    Object.keys(facets[SEARCH_KEYWORDS]).forEach((keyword) => {
      const found = results.find((result) => Object.keys(result)[0] === keyword);
      if (found) {
        // Increase keyword count
        found[keyword] += facets[SEARCH_KEYWORDS][keyword];
      } else {
        results.push({ [keyword]: facets[SEARCH_KEYWORDS][keyword] });
      }
    });
  }
};

const Search = ({ algolia, searchIndex, indexAll, showSearch, setShowSearch, searchButtonId, isIFramed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(mapToIndexName(searchIndex)[0]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [searchSuggestionResults, setSearchSuggestionResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keywordResults, setKeywordResults] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const selectedTabIndicator = useRef(null);
  // Don't animate the tab indicator by default
  const [isAnimated, setIsAnimated] = useState(false);

  const getSelectedTabIndex = () => searchIndex[mapToIndexName(searchIndex).indexOf(selectedIndex)].tabRef;

  const positionSelectedTabIndicator = (selectedTab = getSelectedTabIndex()) => {
    if (showSearchResults && selectedTab?.current) {
      animateIndicator(selectedTabIndicator, isAnimated);
      positionIndicator(selectedTabIndicator, selectedTab);
    }
  };

  const search = async () => {
    if (searchQuery.length) {
      setIsSuggestionsOpen(false);
      setQueryStringParameter(SEARCH_PARAMS.query, searchQuery);
      setQueryStringParameter(SEARCH_PARAMS.keywords, selectedKeywords);
      setQueryStringParameter(SEARCH_PARAMS.index, selectedIndex);

      isIFramed ? parent.postMessage(JSON.stringify({ 'query': searchQuery, 'keywords': selectedKeywords, 'index': selectedIndex }), window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.hostname === 'developer.adobe.com' ? 'https://developer.adobe.com' : 'https://developer-stage.adobe.com') : '';

      positionSelectedTabIndicator();
      setShowSearchResults(true);

      const search = await searchIndexes(algolia, searchQuery, selectedIndex, indexAll, selectedKeywords);

      const mappedSearchResults = [];
      const mappedKeywordResults = [];

      if (search?.results?.length) {
        search.results.forEach(({ hits, facets }) => {
          mapSearchResults(hits, mappedSearchResults);
          mapKeywordResults(facets, mappedKeywordResults);
        });
      }

      setSearchResults(mappedSearchResults);
      setKeywordResults(mappedKeywordResults);
    }
  };

  useEffect(() => {
    if (showSearch) {
      // Read search params
      const searchParams = new URL(window.location).searchParams;
      const query = searchParams.get(SEARCH_PARAMS.query);
      const keywords = searchParams.get(SEARCH_PARAMS.keywords);
      const index = searchParams.get(SEARCH_PARAMS.index);

      if (index) {
        setSelectedIndex(index);
      }

      if (keywords) {
        setSelectedKeywords(keywords.split(','));
      }

      if (query?.length) {
        setSearchQuery(query);
        setShowClear(true);

        setTriggerSearch(true);
      }

      // Autofocus
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    }
  }, [showSearch]);

  useEffect(() => {
    search();
  }, [selectedIndex, selectedKeywords]);

  useEffect(() => {
    if (triggerSearch) {
      setTriggerSearch(false);
      search();
    }
  }, [triggerSearch, setTriggerSearch]);

  useEffect(() => {
    if (searchResultsRef?.current) {
      searchResultsRef.current.scrollTop = 0;
    }
  }, [searchResults]);

  useEffect(() => {
    if (showSearchResults) {
      positionSelectedTabIndicator();

      setIsAnimated(true);
    } else {
      setIsAnimated(false);
    }
  }, [showSearchResults]);

  useEffect(() => {
    const onClick = ({ target }) => {
      setIsSuggestionsOpen(false);

      if (searchRef.current && !searchRef.current.contains(target) && target.id !== searchButtonId) {
        setShowSearch(false);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, [setIsSuggestionsOpen, showSearchResults, setShowSearch, searchRef]);

  useEffect(() => {
    const onEscape = ({ key }) => {
      if (key === 'Escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, [setShowSearch]);

  if (isIFramed) {
    useEffect(() => {
      if (suggestionsRef) {
        if (searchSuggestionResults.length > 0) {
          suggestionsRef.current.querySelectorAll("a").forEach(link => {
            link.target = "_top";
          });
        }
      }
    }, [searchSuggestionResults])

    useEffect(() => {
      if (searchResultsRef) {
        if (searchResults.length > 0) {
          searchResultsRef.current.querySelectorAll("a").forEach(link => {
            link.target = "_top";
          });
        }
      }
    }, [searchResults])
  }

  return (
    <>
      <div
        ref={searchRef}
        css={css`
          position: fixed;
          top: ${isIFramed ? "0" : "var(--spectrum-global-dimension-size-800)"};
          left: 0;
          right: 0;
          ${showSearchResults && 'bottom: 0;'}
          background-color: var(--spectrum-global-color-static-white);
          z-index: 10;

          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
            top: var(--spectrum-global-dimension-size-1200);
          }
        `}>
        <div
          css={css`
            position: relative;
            margin: var(--spectrum-global-dimension-size-400) auto;
            max-width: ${SEARCH_INPUT_WIDTH};

            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              max-width: calc(100vw - var(--spectrum-global-dimension-size-800));
            }
          `}>
          <form
            css={css`
              width: 100%;
            `}
            className="spectrum-Search"
            onSubmit={async (event) => {
              event.preventDefault();

              await search();
            }}>
            <div
              className={classNames('spectrum-Textfield', { 'is-focused': isFocused })}
              css={css`
                min-width: auto;
                width: 100%;
              `}>
              <Magnify className="spectrum-Textfield-icon" />
              <input
                ref={inputRef}
                value={searchQuery}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                onKeyDown={({ key }) => {
                  if (suggestionsRef?.current) {
                    if (key === 'ArrowDown') {
                      suggestionsRef.current.querySelector('[tabindex="0"]').focus();
                    } else if (key === 'ArrowUp') {
                      suggestionsRef.current.querySelector('[tabindex="0"]:last-of-type').focus();
                    }
                  }
                }}
                onChange={async (e) => {
                  const query = e.target.value;
                  setSearchQuery(query);

                  if (query.length && !searchResults.length) {
                    setShowClear(true);

                    const suggestions = await searchSuggestions(algolia, query, searchIndex, indexAll);

                    if (suggestions?.results?.length) {
                      const results = [];
                      suggestions.results.forEach(({ hits }) => {
                        mapSearchResults(hits, results);
                      });
                      setSearchSuggestionResults(results);

                      if (!searchResults.length) {
                        setShowSearchResults(false);
                      }
                    } else {
                      setSearchSuggestionResults([]);
                    }

                    setIsSuggestionsOpen(true);
                  } else {
                    setShowClear(false);
                    setIsSuggestionsOpen(false);
                  }
                }}
                aria-label="Search"
                type="search"
                placeholder="Search"
                className="spectrum-Textfield-input spectrum-Search-input"
                autoComplete="off"
              />
            </div>
            {showClear && (
              <button
                css={css`
                  position: absolute;
                `}
                tabIndex="-1"
                aria-label="Clear Search"
                type="reset"
                className="spectrum-ClearButton spectrum-Search-clearButton"
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current.focus();
                }}>
                <Cross />
              </button>
            )}
          </form>

          <Popover
            isOpen={isSuggestionsOpen}
            css={css`
              position: absolute;
              top: var(--spectrum-global-dimension-size-400);
              width: ${SEARCH_INPUT_WIDTH};

              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                max-width: calc(100vw - var(--spectrum-global-dimension-size-800));
              }
            `}>
            {searchSuggestionResults.length > 0 ? (
              <Menu
                ref={suggestionsRef}
                onKeyDown={({ key }) => {
                  if (suggestionsRef?.current && suggestionsRef.current.contains(document.activeElement)) {
                    if (key === 'ArrowDown') {
                      const nextSibling = document.activeElement.nextElementSibling;
                      if (nextSibling) {
                        nextSibling.focus();
                      } else {
                        suggestionsRef.current.querySelector('[tabindex="0"]').focus();
                      }
                    } else if (key === 'ArrowUp') {
                      const previousSibling = document.activeElement.previousElementSibling;
                      if (previousSibling) {
                        previousSibling.focus();
                      } else {
                        suggestionsRef.current.querySelector('[tabindex="0"]:last-of-type').focus();
                      }
                    }
                  }
                }}>
                {searchSuggestionResults.map((searchSuggestion) => {
                  const to = `${location.origin}${searchSuggestion.url}`;

                  return (
                    <MenuItem key={searchSuggestion.objectID} href={to}>
                      <div
                        css={css`
                          mark,
                          em {
                            background-color: transparent;
                            color: inherit;
                            font-weight: inherit;
                            font-style: inherit;
                            text-decoration: underline;
                          }
                        `}>
                        <strong
                          dangerouslySetInnerHTML={{
                            __html: encodeHTML(searchSuggestion._highlightResult.title.value)
                          }}
                        />

                        <div
                          css={css`
                            font-style: italic;
                            margin: var(--spectrum-global-dimension-size-50) 0;
                          `}>
                          {to}
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: encodeHTML(searchSuggestion._highlightResult.content.value)
                          }}
                        />
                      </div>
                    </MenuItem>
                  );
                })}
              </Menu>
            ) : (
              <div
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-800);
                  margin-bottom: var(--spectrum-global-dimension-size-800);
                `}>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  `}>
                  <h4
                    className="spectrum-Heading spectrum-Heading--sizeS"
                    css={css`
                      margin-bottom: var(--spectrum-global-dimension-size-100);
                    `}>
                    No Results Found
                  </h4>
                  <em>Try another search term</em>
                </div>
              </div>
            )}
          </Popover>
        </div>

        {showSearchResults && (
          <div
            css={css`
              display: flex;
              max-width: ${DESKTOP_SCREEN_WIDTH};
              margin: auto;
              height: 100%;

              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                overflow: auto;
                flex-wrap: wrap;
              }
            `}>
            <div
              css={css`
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                box-sizing: border-box;
                padding: var(--spectrum-global-dimension-size-200);
                min-width: ${SIDENAV_WIDTH};
              `}>
              <h4
                className="spectrum-Heading spectrum-Heading--sizeXS"
                css={css`
                  margin-bottom: var(--spectrum-global-dimension-size-100);
                `}>
                Filter by
              </h4>

              <div
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-100);
                  margin-bottom: var(--spectrum-global-dimension-size-1200);
                  display: flex;
                  flex-direction: column;
                  overflow: auto;

                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    margin-bottom: 0;
                  }
                `}>
                {keywordResults.length > 0 ? (
                  keywordResults.map((keywordResult, i) => {
                    const keyword = Object.keys(keywordResult)[0];

                    return (
                      <Checkbox
                        key={i}
                        isSelected={selectedKeywords.includes(keyword)}
                        value={keyword}
                        onChange={(checked) => {
                          if (checked) {
                            setSelectedKeywords((selectedKeywords) => [...selectedKeywords, keyword]);
                          } else {
                            setSelectedKeywords(
                              selectedKeywords.filter((selectedKeyword) => selectedKeyword !== keyword)
                            );
                          }
                        }}>
                        <span>{keyword}</span>
                        <em>&nbsp;({keywordResult[keyword]})</em>
                      </Checkbox>
                    );
                  })
                ) : (
                  <div className="spectrum-Body spectrum-Body--sizeS">No filter options available</div>
                )}
              </div>
            </div>

            <div
              css={css`
                height: 100%;
              `}>
              <Tabs
                onFontsReady={() => {
                  positionSelectedTabIndicator();
                }}>
                {searchIndex.map((index, i) => {
                  const indexName = Object.keys(index)[0];
                  const indexLabel = index[indexName];

                  const setTabRef = (element) => {
                    index.tabRef = { current: element };
                  };

                  return (
                    <TabsItem
                      key={i}
                      ref={setTabRef}
                      selected={selectedIndex === indexName}
                      tabIndex={0}
                      onClick={async () => {
                        setSelectedKeywords([]);
                        setSelectedIndex(indexName);
                      }}>
                      <TabsItemLabel>{indexLabel}</TabsItemLabel>
                    </TabsItem>
                  );
                })}

                <TabsIndicator ref={selectedTabIndicator} />
              </Tabs>

              {searchResults.length > 0 ? (
                <div
                  ref={searchResultsRef}
                  css={css`
                    height: calc(
                      100% - var(--spectrum-global-dimension-size-800) - var(--spectrum-global-dimension-size-800) -
                        var(--spectrum-global-dimension-size-200)
                    );
                    overflow: auto;

                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      height: auto;
                      overflow: inherit;
                    }
                  `}>
                  {searchResults.map((searchResult) => {
                    const to = `${location.origin}${searchResult.url}`;

                    return (
                      <div
                        css={css`
                          margin: var(--spectrum-global-dimension-size-300);

                          mark,
                          em {
                            background-color: transparent;
                            color: inherit;
                            font-weight: 700;
                            font-style: inherit;
                          }
                        `}>
                        <div
                          className="spectrum-Body spectrum-Body--sizeM"
                          css={css`
                            margin-bottom: var(--spectrum-global-dimension-size-100);
                          `}>
                          <AnchorLink to={to}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: encodeHTML(searchResult._highlightResult.title.value)
                              }}
                            />
                          </AnchorLink>
                        </div>
                        <div
                          css={css`
                            font-style: italic;
                          `}>
                          <AnchorLink variant="secondary" to={to}>
                            {to}
                          </AnchorLink>
                        </div>
                        <div
                          className="spectrum-Body spectrum-Body--sizeS"
                          css={css`
                            margin: var(--spectrum-global-dimension-size-100) 0;
                          `}
                          dangerouslySetInnerHTML={{ __html: encodeHTML(searchResult._highlightResult.content.value) }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  css={css`
                    position: absolute;
                    top: var(--spectrum-global-dimension-size-3600);
                    height: calc(2 * var(--spectrum-global-dimension-size-1250));
                    margin-top: calc(-1 * var(--spectrum-global-dimension-size-1250));
                    text-align: center;
                    right: 0;
                    left: 0;
                    padding: 0 var(--spectrum-global-dimension-size-200);

                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      position: static;
                      margin: var(--spectrum-global-dimension-size-800) 0;
                      height: auto;
                    }
                  `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 104 90"
                    css={css`
                      width: var(--spectrum-global-dimension-size-2400);
                      height: var(--spectrum-global-dimension-size-1200);
                      margin-bottom: var(--spectrum-global-dimension-size-300);
                      fill: var(--spectrum-global-color-static-gray-500);
                    `}>
                    <g>
                      <g>
                        <path d="M37.5,69A24.54,24.54,0,1,0,17,57.92l0,0L1.46,73.52A5,5,0,0,0,5,82.05H5a5,5,0,0,0,3.54-1.47L24.06,65l0,0A24.33,24.33,0,0,0,37.5,69Zm0-46A21.5,21.5,0,1,1,16,44.5,21.52,21.52,0,0,1,37.5,23ZM6.41,78.46A2,2,0,0,1,5,79.05H5a2,2,0,0,1-1.42-3.42L18.83,60.34a25.21,25.21,0,0,0,2.83,2.83Z"></path>
                        <path d="M28.67,53.33a1.51,1.51,0,0,0,1.06.44,1.49,1.49,0,0,0,1.06-.44l6.71-6.71,6.71,6.71a1.5,1.5,0,0,0,2.12,0,1.49,1.49,0,0,0,0-2.12L39.62,44.5l6.71-6.71a1.49,1.49,0,0,0,0-2.12,1.51,1.51,0,0,0-2.12,0L37.5,42.38l-6.71-6.71a1.5,1.5,0,0,0-2.12,2.12l6.71,6.71-6.71,6.71A1.51,1.51,0,0,0,28.67,53.33Z"></path>
                        <path d="M102.5,31a1.5,1.5,0,0,0-1.5,1.5V86.17a.83.83,0,0,1-.83.83H38.83a.83.83,0,0,1-.83-.83V73.5a1.5,1.5,0,0,0-3,0V86.17A3.84,3.84,0,0,0,38.83,90h61.34A3.84,3.84,0,0,0,104,86.17V32.5A1.5,1.5,0,0,0,102.5,31Z"></path>
                        <path d="M37.5,17A1.5,1.5,0,0,0,39,15.5V3.83A.83.83,0,0,1,39.83,3H75V26.5A1.5,1.5,0,0,0,76.5,28h25.55a1.5,1.5,0,0,0,1-2.57L77.55.43a1.43,1.43,0,0,0-.49-.32A1.41,1.41,0,0,0,76.52,0H39.83A3.84,3.84,0,0,0,36,3.83V15.5A1.5,1.5,0,0,0,37.5,17ZM78,5.07,98.37,25H78Z"></path>
                      </g>
                    </g>
                  </svg>
                  <h3 className="spectrum-Heading spectrum-Heading--light spectrum-Heading--sizeM">
                    Sorry, we couldn't find any results for <strong>{searchQuery}</strong>
                  </h3>
                  <p
                    className="spectrum-Body spectrum-Body--S"
                    css={css`
                      margin-top: var(--spectrum-global-dimension-size-100);
                    `}>
                    Make sure all the words are spelled correctly or try to refine your keywords.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!showSearchResults && (
        <div
          css={css`
            position: fixed;
            z-index: 1;
            top: ${isIFramed ? "var(--spectrum-global-dimension-size-800)" : "calc(var(--spectrum-global-dimension-size-1200) + var(--spectrum-global-dimension-size-800))"};
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.4);
            pointer-events: none;
          `}
        />
      )}
    </>
  );
};

Search.propTypes = {
  algolia: PropTypes.object,
  searchIndex: PropTypes.array,
  indexAll: PropTypes.array,
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
  searchButtonId: PropTypes.string
};

export { Search };
