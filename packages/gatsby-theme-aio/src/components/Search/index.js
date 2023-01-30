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
import { Item as MenuItem, Menu } from '../Menu';
import { Popover } from '../Popover';
import PropTypes from 'prop-types';
import { MOBILE_SCREEN_WIDTH, DESKTOP_SCREEN_WIDTH, SIDENAV_WIDTH, SEARCH_PARAMS, isExternalLink } from '../../utils';
import { getIndexesFromProduct } from '../../../algolia/helpers/get-products-indexes.js';
import classNames from 'classnames';
import '@spectrum-css/typography';
import '@spectrum-css/textfield';
import '@spectrum-css/search';
import '@spectrum-css/button';
import { ActionButton } from '../ActionButton';
import { Close, Magnify } from '../Icons';
import { Checkbox } from '../Checkbox';
import { ProgressCircle } from '../ProgressCircle';

const SEARCH_INPUT_WIDTH = '688px';
const SEARCH_INDEX_ALL = 'All Products';
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

const clearQueryStringParameters = () => {
  window.history.replaceState({}, '', `${window.location.pathname}`);
};

const searchSuggestions = async (algolia, query, indexPrefix, searchIndex, indexAll, existingIndices, setExistingIndices) => {
  const queries = [];
  let indexes;
  if (!existingIndices.length) {
    const algoliaIndices = await algolia.listIndices();
    const algoliaIndexNames = Object.values(algoliaIndices.items).map(({ name }) => name)
    // extract sub array of indices from each product and flatten/merge into single array of indices
    const localIndexList = indexAll.map((prod) => prod.productIndices).flat().map(({ indexName }) => { return indexPrefix ? `${indexPrefix}-${indexName}` : indexName });
    const filteredIndexes = localIndexList.filter(localIndex => algoliaIndexNames.includes(localIndex));
    setExistingIndices(filteredIndexes);
    indexes = filteredIndexes;
  } else {
    indexes = existingIndices;
  }

  // By default use all indexes
  if (searchIndex[0] === SEARCH_INDEX_ALL) {
    searchIndex = indexes;
  }
  // Or prioritize searchIndex
  else {
    const searchProductNames = searchIndex.filter((product) => product !== SEARCH_INDEX_ALL);
    const localProductIndexes = getIndexesFromProduct(searchProductNames[0]);
    searchIndex = [...localProductIndexes, ...indexes.filter((index) => !searchProductNames.includes(index))].filter(index => indexes.includes(index));
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

const searchIndexes = async (algolia, query, indexPrefix, selectedIndex, indexAll, existingIndices, setExistingIndices, keywords) => {

  let indexes;
  if (!existingIndices.length) {
    const algoliaIndices = await algolia.listIndices();
    const algoliaIndexNames = Object.values(algoliaIndices.items).map(({ name }) => name)
    // extract sub array of indices from each product and flatten/merge into single array of indices
    const localIndexList = indexAll.map((prod) => prod.productIndices).flat().map(({ indexName }) => { return indexPrefix ? `${indexPrefix}-${indexName}` : indexName });
    const filteredIndexes = localIndexList.filter(localIndex => algoliaIndexNames.includes(localIndex));
    setExistingIndices(filteredIndexes);
    indexes = filteredIndexes;
  } else {
    indexes = existingIndices;
  }

  if (selectedIndex.includes('all')) {
    selectedIndex = indexes;
  } else {
    selectedIndex = selectedIndex.filter(selected => indexes.includes(selected));
  }

  const queries = [];

  selectedIndex.forEach((indexName) => {
    queries.push({
      indexName,
      query,
      params: {
        facets: [SEARCH_KEYWORDS],
        attributesToRetrieve: ['objectID', 'url', 'product'],
        hitsPerPage: Math.ceil(SEARCH_MAX_RESULTS / selectedIndex.length),
        filters: keywords.map((keyword) => `${SEARCH_KEYWORDS}:"${keyword}"`).join(' AND ')
      }
    });
  });

  return await algolia.multipleQueries(queries);
};

const mapSearchResults = (hits, results) => {
  hits.forEach(({ objectID, url, path, _highlightResult }) => {
    let urlPath = ''
    if (path) {
      // console.log(path);
      urlPath = path;
    } else {
      // console.log(url);
      if (url.includes('https://developer.adobe.com')) {
        urlPath = url.replace('https://developer.adobe.com', '');
      } else {
        urlPath = url;
      }
    }

    // TODO corrupted record url check
    if (!isExternalLink(urlPath)) {
      // Verify url is unique
      if (!results.find((result) => result.url === urlPath)) {
        results.push({
          objectID,
          url: urlPath,
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

const setTargetOrigin = () => {
  const parentURL = document.referrer;

  if (parentURL.indexOf('localhost') >= 0 || parentURL.indexOf('developer-stage.adobe') >= 0 || parentURL.indexOf('hlx.page') >= 0 || parentURL.indexOf('hlx.live') >= 0 || parentURL.indexOf('developer.adobe') >= 0) {
    return parentURL;
  } else {
    return false;
  }
};

const Search = ({ algolia, indexAll, indexPrefix, showSearch, setShowSearch, searchButtonId, isIFramed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [oldSearchQuery, setOldSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(['all']);
  const [searchIndex, setSearchIndex] = useState([SEARCH_INDEX_ALL]);
  const [existingIndices, setExistingIndices] = useState([]);
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
  const [productResults, setProductResults] = useState([]);
  const [keywordResults, setKeywordResults] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchQueryCounter, setSearchQueryCounter] = useState(0);

  const search = async () => {
    if (searchQuery.length) {
      let search;
      setIsSuggestionsOpen(false);
      setQueryStringParameter(SEARCH_PARAMS.query, searchQuery);
      setQueryStringParameter(SEARCH_PARAMS.keywords, selectedKeywords);
      setQueryStringParameter(SEARCH_PARAMS.index, selectedIndex);

      if (isIFramed) {
        const message = JSON.stringify({ 'query': searchQuery, 'keywords': selectedKeywords, 'index': selectedIndex });
        const targetOrigin = setTargetOrigin();
        if (targetOrigin) {
          parent.postMessage(message, targetOrigin);
        }
      }

      setShowSearchResults(true);

      if (searchQuery !== oldSearchQuery) {
        setIsLoading(true);
        search = await searchIndexes(algolia, searchQuery, indexPrefix, ['all'], indexAll, existingIndices, setExistingIndices, selectedKeywords);
      } else {
        search = await searchIndexes(algolia, searchQuery, indexPrefix, selectedIndex, indexAll, existingIndices, setExistingIndices, selectedKeywords);
      }

      const localProduct = searchIndex.filter((product) => product !== SEARCH_INDEX_ALL)[0];

      const mappedProductResults = [SEARCH_INDEX_ALL];
      const mappedSearchResults = [];
      const mappedKeywordResults = [];

      if (search?.results?.length) {
        search.results.forEach(({ hits, facets }) => {
          if (facets === undefined) return;
          if (hits.length > 0) {
            const product = hits[0].product;

            if (product) {
              if (!mappedProductResults.includes(product)) {
                if (product !== localProduct) {
                  mappedProductResults.push(product);
                } else {
                  mappedProductResults.splice(1, 0, localProduct);
                }
              }
            }
          }

          mapSearchResults(hits, mappedSearchResults);
          mapKeywordResults(facets, mappedKeywordResults);

          return true;
        });
      }
      if (searchQuery !== oldSearchQuery) {
        setProductResults(mappedProductResults);
        setOldSearchQuery(searchQuery);
        if (localProduct && mappedProductResults.includes(localProduct)) {
          setSelectedIndex(getIndexesFromProduct(localProduct));
          setTriggerSearch(true);
        } else {
          setSearchResults(mappedSearchResults);
          setKeywordResults(mappedKeywordResults);
          setIsLoading(false);
        }
      } else {
        setSearchResults(mappedSearchResults);
        setKeywordResults(mappedKeywordResults);
        setIsLoading(false);
      }
    }
  };

  useEffect(async () => {
    if (isIFramed) {

      window.addEventListener("message", (e) => {
        const message = JSON.parse(e.data);
        if (message.localPathName) {
          let localPathName = message.localPathName;
          if (localPathName !== "/") {
            // make sure path name has a slash at start/end to match path-prefix format 
            if (!localPathName.startsWith('/')) { localPathName = `/${localPathName}` }
            if (!localPathName.endsWith('/')) { localPathName = `${localPathName}/` }
            const localProduct = indexAll.find(product => product.productIndices.some(idx => {
              return localPathName.startsWith(idx.indexPathPrefix);
            }));

            if (localProduct?.productName) {
              setSearchIndex([localProduct.productName, ...searchIndex]);
            }
          }

          const reply = JSON.stringify({ received: message.localPathName });
          parent.postMessage(reply, "*");
        }
      });
    };

    /* Prepare list of existing indices by cross referencing Algolia */

    const algoliaIndices = await algolia.listIndices();
    const algoliaIndexNames = Object.values(algoliaIndices.items).map(({ name }) => name)
    // extract sub array of indices from each product and flatten/merge into single array of indices
    const localIndexList = indexAll.map((prod) => prod.productIndices).flat().map(({ indexName }) => {
      return indexPrefix ? `${indexPrefix}-${indexName}` : indexName
    });

    const filteredIndexes = localIndexList.filter(localIndex => algoliaIndexNames.includes(localIndex));
    setExistingIndices(filteredIndexes);

  }, [])

  useEffect(() => {
    if (showSearch) {
      // Read search params
      const searchParams = new URL(window.location).searchParams;
      const query = searchParams.get(SEARCH_PARAMS.query);
      const keywords = searchParams.get(SEARCH_PARAMS.keywords);
      const index = searchParams.get(SEARCH_PARAMS.index);

      if (index) {
        setSelectedIndex(index.split(','));
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
    } else {
      clearQueryStringParameters();
    }
  }, [showSearch]);

  useEffect(() => {
    if (triggerSearch) {
      setTriggerSearch(false);
      search();
    }
  }, [triggerSearch]);

  useEffect(() => {
    if (searchResultsRef?.current) {
      searchResultsRef.current.scrollTop = 0;
    }
  }, [searchResults]);

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
        clearQueryStringParameters();
        const searchClose = document.getElementById("aio-Search-close");
        searchClose ? searchClose.focus() : "";
      }
    };

    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, [setShowSearch]);

  useEffect(() => {
    // simple debouncing strategy for search queries while user is typing
    const timeOutId = setTimeout(() => debounceCallback(), 500);
    const debounceCallback = async () => {
      if (searchQuery.length && !searchResults.length) {
        setShowClear(true);

        const suggestions = await searchSuggestions(algolia, searchQuery, indexPrefix, searchIndex, indexAll, existingIndices, setExistingIndices);
        setSearchQueryCounter(searchQueryCounter + 1);
        console.log('Total search queries counted is:', searchQueryCounter);

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
    }

    return () => clearTimeout(timeOutId);

  }, [searchQuery])

  if (isIFramed) {
    useEffect(() => {
      if (suggestionsRef) {
        if (searchSuggestionResults.length > 0) {
          const allLinks = suggestionsRef.current.querySelectorAll("a");
          if (allLinks.length > 0) {
            allLinks.forEach(link => {
              link.target = "_top";
            });
          }
        }
      }
    }, [searchSuggestionResults, searchResults])
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
              setSelectedKeywords([]);
              setShowClear(true);
              setTriggerSearch(true);
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
                }}
                aria-label="Search"
                type="search"
                placeholder="Search"
                className="spectrum-Textfield-input spectrum-Search-input"
                autoComplete="off"
              />
            </div>
            {showClear && (
              <ActionButton
                css={css`
                  position: absolute;
                  
                  margin-right: var(--spectrum-global-dimension-size-100);

                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    margin-right: 0;
                  }
                  &:focus{
                    border: 2px solid #007aff !important;
                    border-radius: 15% !important;
                  }
                `}
                tabIndex="0"
                isQuiet
                aria-label="Clear Search"
                type="reset"
                className="spectrum-ClearButton spectrum-Search-clearButton"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchResults(false);
                  clearQueryStringParameters();
                  inputRef.current.focus();
                }}>
                <Close />
              </ActionButton>
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
                  const title = searchSuggestion._highlightResult.title?.value ? searchSuggestion._highlightResult.title.value : "";
                  const descriptions = Object.entries(searchSuggestion._highlightResult).filter(optn => {
                    return optn[1].matchedWords.length > 0
                  });
                  let content = "";
                  if (descriptions.length > 1) {
                    descriptions.sort((a, b) => {
                      return a[1].value.length > b[1].value.length ? -1 : 1;
                    });
                    content = descriptions[0][1]?.value?.length > descriptions[1][1]?.value?.length ? descriptions[0][1]?.value : descriptions[1][1]?.value;
                  } else {
                    content = descriptions[0][1]?.value ? descriptions[0][1]?.value : "";
                  }

                  content = content.substring(0, 250);

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
                            __html: encodeHTML(title)
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
                            __html: encodeHTML(content)
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

        {isLoading && (<div
          css={css`
                width:100%;
                height:100%;
                display: grid;
                place-items: start center;
              `}>
          <ProgressCircle size="L" />
        </div>)}

        {showSearchResults && !isLoading && (
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
                width: ${SIDENAV_WIDTH};
              `}>
              <h4
                className="spectrum-Heading spectrum-Heading--sizeXS"
                css={css`
                  margin-bottom: var(--spectrum-global-dimension-size-100);
                `}>
                Filter by Products
              </h4>
              <div
                css={css`
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    overflow-x: hidden;
                    max-height: 30%;
                    width: ${SIDENAV_WIDTH};
                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      margin-bottom: 0;
                    }
                  `}>
                {productResults.map((productName, i) => {
                  return (
                    <Checkbox
                      key={i}
                      isSelected={productName === SEARCH_INDEX_ALL ?
                        selectedIndex.includes('all') :
                        selectedIndex.some(index => {
                          return getIndexesFromProduct(productName).includes(index);
                        })
                      }
                      value={productName}
                      onChange={(checked) => {
                        if (!checked) {
                          if (productName === 'All Products') {
                            setSelectedIndex(selectedIndex.filter(index => index !== 'all'));
                          } else {
                            setSelectedIndex(selectedIndex.filter(index => !getIndexesFromProduct(productName).includes(index)));
                          }
                        } else {
                          if (productName === 'All Products') {
                            setSelectedIndex(['all']);
                          } else {
                            setSelectedIndex([...selectedIndex.filter(index => index !== 'all'), ...getIndexesFromProduct(productName)]);
                          }
                        }
                        setSelectedKeywords([]);
                        setTriggerSearch(true);
                      }}>
                      <span>{productName}</span>
                    </Checkbox>
                  );
                })}
              </div>
              <h4
                className="spectrum-Heading spectrum-Heading--sizeXS"
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-200);
                  margin-bottom: var(--spectrum-global-dimension-size-100);
                `}>
                Filter by Keywords
              </h4>
              <div
                css={css`
                    margin-bottom: var(--spectrum-global-dimension-size-100);
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    overflow-x: hidden;
                    max-height: 50%;
                    width: ${SIDENAV_WIDTH};
                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      margin-bottom: 0;
                    }
                  `}>
                {keywordResults.length > 0 ?
                  (keywordResults.map((keywordResult, i) => {
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
                          setTriggerSearch(true);
                        }}>
                        <span
                          css={css`
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        `}>{keyword}</span>
                        {/* will enable once this makes sense currently confuses user to think it's # of results */}
                        {/* <em>&nbsp;({keywordResult[keyword]})</em> */}
                      </Checkbox>
                    );
                  }))
                  :
                  (<div className="spectrum-Body spectrum-Body--sizeS">No filter options available</div>)}
              </div>
            </div>
            <div
              css={css`
                height: 100%;
              `}>
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
                    const title = searchResult._highlightResult.title?.value ? searchResult._highlightResult.title.value : "";
                    const descriptions = Object.entries(searchResult._highlightResult).filter(optn => optn[1].matchedWords.length > 0);
                    let content = "";
                    if (descriptions.length > 1) {
                      descriptions.sort((a, b) => {
                        return a[1].value.length > b[1].value.length ? -1 : 1;
                      });
                      content = descriptions[0][1]?.value?.length > descriptions[1][1]?.value?.length ? descriptions[0][1]?.value : descriptions[1][1]?.value;
                    } else {
                      content = descriptions[0][1]?.value ? descriptions[0][1]?.value : "";
                    }

                    content = content.substring(0, 250);

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
                                __html: encodeHTML(title)
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
                          dangerouslySetInnerHTML={{ __html: encodeHTML(content) }}
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

      {
        !showSearchResults && (
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
        )
      }
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
