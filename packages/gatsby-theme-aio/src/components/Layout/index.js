/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { createElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { css, Global } from '@emotion/react';
import loadable from '@loadable/component';
import algoliaSearch from 'algoliasearch';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import Axios from 'axios';
import {
  DESKTOP_SCREEN_WIDTH,
  findSelectedPages,
  findSubPages,
  MOBILE_SCREEN_WIDTH,
  normalizePagePath,
  rootFix,
  rootFixPages,
  SEARCH_PARAMS,
  SIDENAV_WIDTH,
  trailingSlashFix,
} from '../../utils';
import '@spectrum-css/vars/dist/spectrum-global.css';
import '@spectrum-css/vars/dist/spectrum-medium.css';
import '@spectrum-css/vars/dist/spectrum-large.css';
import '@spectrum-css/vars/dist/spectrum-light.css';
import '@spectrum-css/vars/dist/spectrum-dark.css';
import '@spectrum-css/vars/dist/spectrum-lightest.css';
import '@spectrum-css/vars/dist/spectrum-darkest.css';
import '@spectrum-css/sidenav';
import '@adobe/focus-ring-polyfill';
import { Provider } from '../Context';
import { Search } from '../Search';
import { SideNav } from '../SideNav';
import { GlobalHeader } from '../GlobalHeader';
import { SEO } from '../SEO';
import { ProgressCircle } from '../ProgressCircle';
import nextId from 'react-id-generator';

// GATSBY_ALGOLIA_APPLICATION_ID=...
// GATSBY_ALGOLIA_SEARCH_API_KEY=...
// GATSBY_ALGOLIA_SEARCH_INDEX=[{"index": "index label"}, {"all": "All Results"}]
// GATSBY_ALGOLIA_INDEX_ALL=["index1", "index2", ...]
const hasSearch = !!(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID && process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
);
// GATSBY_ALGOLIA_INDEX_ENV_PREFIX=[prod | stage | *] this is the env prefix assigned to the index name during indexing
const algoliaIndexEnv = process.env.GATSBY_ALGOLIA_INDEX_ENV_PREFIX;

let algolia = null;
if (hasSearch) {
  algolia = algoliaSearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
  );
} else {
  console.warn('AIO: Algolia config missing.');
}

// GATSBY_IMS_CONFIG={"client_id": "...","scope": "..."}
// GATSBY_IMS_SRC=https://.../imslib.js
const hasIMS = !!(process.env.GATSBY_IMS_SRC && process.env.GATSBY_IMS_CONFIG);

// Page source can come from OpenAPI or Iframe
const pageSrc = {
  openAPI: {
    src: null,
    block: null,
    frontMatter: 'openAPISpec',
  },
  frame: {
    src: null,
    block: null,
    frontMatter: 'frameSrc',
  },
};

const toggleSideNav = setShowSideNav => {
  setShowSideNav(showSideNav => !showSideNav);
};

const addScript = url =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = val => resolve(val);
    script.onerror = err => reject(err);
    script.onabort = err => reject(err);

    document.head.appendChild(script);
  });

const updatePageSrc = (type, frontMatter, setIsLoading) => {
  const page = pageSrc[type];

  page.has = frontMatter?.[page.frontMatter];
  if (typeof page.has !== 'undefined' && page.src !== page.has) {
    page.src = page.has;
  }

  if (page.src && !page.block) {
    setIsLoading(true);
    // Import statements have to be hardcoded
    if (type === 'openAPI') {
      page.block = loadable(() => import('../OpenAPIBlock'));
    } else if (type === 'frame') {
      page.block = loadable(() => import('../Frame'));
    }

    page.block.load().then(() => {
      setIsLoading(false);
    });
  }
};

// Used to update the url in the browser
const setQueryStringParameter = (name, value) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
};

/**
 * @returns The query string from the URL
 */
export const getQueryString = () => {
  const params = new URLSearchParams(window.location.search);
  return params.toString();
};

const searchIFrameSource = () => {
  /**
   * Returns expected origin based on the host
   * @param {*} host The host
   * @param {*} suffix A suffix to append
   * @returns The expected origin
   */
  const setExpectedOrigin = (host, suffix = '') => {
    if (isDevEnvironment(host)) {
      return `http://localhost:8000`;
    } else if (isStageEnvironment(host)) {
      return `https://developer-stage.adobe.com${suffix}`;
    } else {
      return `https://developer.adobe.com${suffix}`;
    }
  };

  /**
   * Checks whether the current URL is a dev environment based on host value
   * @param {*} host The host
   * @returns True if the current URL is a dev environment, false otherwise
   */
  function isDevEnvironment(host) {
    return host.indexOf('localhost') >= 0;
  }

  /**
   * Checks whether the current URL is a stage environment based on host value
   * @param {*} host The host
   * @returns True if the current URL is a stage environment, false otherwise
   */
  function isStageEnvironment(host) {
    return host.indexOf('developer-stage') >= 0;
  }

  const src = isDevEnvironment(window.location.host)
    ? setExpectedOrigin(window.location.host)
    : `${setExpectedOrigin(window.location.host, '/search-frame')}`;
  const queryString = new URLSearchParams(window.location.search);
  return queryString && queryString.toString().length > 0
    ? `${src}?${queryString.toString()}`
    : src;
};

export default ({ children, pageContext, location }) => {
  const [ims, setIms] = useState(null);
  const [isLoadingIms, setIsLoadingIms] = useState(true);
  // ["index1", "index2", ...]
  const [indexAll, setIndexAll] = useState(false);

  // Load and initialize IMS
  useEffect(() => {
    const IMS_SRC = process.env.GATSBY_IMS_SRC;
    const IMS_CONFIG = process.env.GATSBY_IMS_CONFIG;

    if (IMS_SRC && IMS_CONFIG) {
      (async () => {
        try {
          await addScript(`${IMS_SRC}`);
          let IMS_CONFIG_JSON = JSON.parse(IMS_CONFIG);
          IMS_CONFIG_JSON.onReady = () => {
            setIms(window.adobeIMS);
            setIsLoadingIms(false);
          };
          window.adobeImsFactory.createIMSLib(IMS_CONFIG_JSON);
          window.adobeIMS.initialize();
        } catch (e) {
          console.error(`AIO: IMS error.`);
        } finally {
          setIsLoadingIms(false);
        }
      })();
    } else {
      console.warn('AIO: IMS config missing.');
      setIsLoadingIms(false);
    }
  }, []);

  // Load all data once and pass it to the Provider
  const data = useStaticQuery(
    graphql`
      query {
        allGithub {
          nodes {
            repository
            default_branch
            root
          }
        }
        allGithubContributors {
          nodes {
            contributors {
              date
              login
              name
            }
            path
          }
        }
        allMdx {
          nodes {
            tableOfContents
            fileAbsolutePath
          }
        }
        allSitePage {
          nodes {
            component
            path
          }
        }
        site {
          pathPrefix
          siteMetadata {
            home {
              title
              path
              hidden
            }
            docs {
              title
              path
            }
            notice{
              title
              type
              text
            }
            versions {
              title
              path
              selected
            }
            pages {
              title
              path
              menu {
                title
                description
                path
              }
            }
            subPages {
              title
              path
              header
              pages {
                title
                path
                pages {
                  title
                  path
                  pages {
                    title
                    path
                    pages {
                      title
                      path
                      pages {
                        title
                        path
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const { allMdx, allSitePage, site, allGithub, allGithubContributors } = data;
  const { siteMetadata, pathPrefix } = site;
  const { home, versions, pages, subPages, docs } = siteMetadata;

  const [showSearch, setShowSearch] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadSearchFrame, setLoadSearchFrame] = useState(false);
  const [hasSideNav, setHasSideNav] = useState(false);

  // Show search if search param is set
  useEffect(() => {
    const searchParams = new URL(window.location).searchParams;
    if (searchParams.get(SEARCH_PARAMS.query)) {
      setShowSearch(true);
    }
  }, [setShowSearch]);

  useEffect( () => {
    if (window.innerWidth >= parseInt(MOBILE_SCREEN_WIDTH)) {
      setShowSideNav(false);
      setHasSideNav(false);
    }
  }, [location]);

  useEffect(() => {
    window.onpopstate = () => {
      const searchParams = new URL(window.location).searchParams;
      if (searchParams.get(SEARCH_PARAMS.query)) {
        searchParams.get(SEARCH_PARAMS.query);
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };
  }, []);

  // Unify all paths
  location.pathname = trailingSlashFix(decodeURIComponent(location.pathname));

  pages.forEach(page => {
    normalizePagePath(page);

    if (page.menu) {
      page.menu.forEach(menu => {
        normalizePagePath(menu);
      });
    }
  });

  if (versions) {
    versions.forEach(version => {
      normalizePagePath(version);
    });
  }

  normalizePagePath(home);
  normalizePagePath(docs);

  const normalizeSubPages = page => {
    normalizePagePath(page);

    if (page.pages) {
      page.pages.forEach(subPage => {
        normalizeSubPages(subPage);
      });
    }
  };

  if (subPages) {
    subPages.forEach(subPage => {
      normalizeSubPages(subPage);
    });
  }

  const pathWithRootFix = rootFix(location.pathname);
  const pagesWithRootFix = rootFixPages(pages);
  const sideNavSelectedPages = findSelectedPages(pathWithRootFix, subPages);
  const sideNavSelectedSubPages = findSubPages(pathWithRootFix, pagesWithRootFix, subPages);
  if (sideNavSelectedSubPages.length > 0) {
    setHasSideNav(true);
  }

  const frontMatter = pageContext?.frontmatter;

  const layoutId = nextId();
  const sideNavId = nextId();
  const searchButtonId = 'aio-Search-close';

  // Update OpenAPI spec and Frame src
  updatePageSrc('openAPI', frontMatter, setIsLoading);
  updatePageSrc('frame', frontMatter, setIsLoading);

  // Set Search indexAll
  useEffect(() => {
    if (hasSearch) {
      Axios.get(
        'https://raw.githubusercontent.com/AdobeDocs/search-indices/main/product-index-map.json'
      )
        .then(result => {
          const productIndexMap = result.data;
          if (typeof productIndexMap === 'string') {
            setIndexAll(JSON.parse(productIndexMap));
          } else if (Object.prototype.toString.call(productIndexMap) == '[object Array]') {
            // https://stackoverflow.com/a/12996879/15028986
            setIndexAll(productIndexMap);
          }
        })
        .catch(err => {
          console.error(`AIO: Failed fetching search index.\n${err}`);
        });
    }
    if (window.innerWidth <= parseInt(MOBILE_SCREEN_WIDTH)) {
      setHasSideNav(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= parseInt(MOBILE_SCREEN_WIDTH)) {
        setHasSideNav(true);
      }
    });
  }, []);

  if (pathPrefix === '/search-frame') {
    return (
      <>
        <Helmet>
          <noscript>{`
          <style>
            #${layoutId} {
              grid-template-columns: 0 auto;
            }
            
            #${sideNavId} {
              display: none !important;
            }
            
            .gatsby-resp-image-image {
              opacity: 1 !important;
            }
          </style>
        `}</noscript>
        </Helmet>

        <Global
          styles={css`
            @font-face {
              font-family: 'adobe-clean';
              src: url('https://use.typekit.net/af/cb695f/000000000000000000017701/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
                  format('woff2'),
                url('https://use.typekit.net/af/cb695f/000000000000000000017701/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
                  format('woff'),
                url('https://use.typekit.net/af/cb695f/000000000000000000017701/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
                  format('opentype');
              font-display: swap;
              font-style: normal;
              font-weight: 400;
            }

            @font-face {
              font-family: 'adobe-clean';
              src: url('https://use.typekit.net/af/74ffb1/000000000000000000017702/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
                  format('woff2'),
                url('https://use.typekit.net/af/74ffb1/000000000000000000017702/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
                  format('woff'),
                url('https://use.typekit.net/af/74ffb1/000000000000000000017702/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
                  format('opentype');
              font-display: swap;
              font-style: italic;
              font-weight: 400;
            }

            @font-face {
              font-family: 'adobe-clean';
              src: url('https://use.typekit.net/af/eaf09c/000000000000000000017703/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
                  format('woff2'),
                url('https://use.typekit.net/af/eaf09c/000000000000000000017703/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
                  format('woff'),
                url('https://use.typekit.net/af/eaf09c/000000000000000000017703/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
                  format('opentype');
              font-display: swap;
              font-style: normal;
              font-weight: 700;

            }

            @font-face {
              font-family: 'adobe-clean';
              src: url('https://use.typekit.net/af/40207f/0000000000000000000176ff/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
                  format('woff2'),
                url('https://use.typekit.net/af/40207f/0000000000000000000176ff/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
                  format('woff'),
                url('https://use.typekit.net/af/40207f/0000000000000000000176ff/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
                  format('opentype');
              font-display: swap;
              font-style: normal;
              font-weight: 300;
            }

            @font-face {
              font-family: 'adobe-clean-serif';
              src: url('https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3')
                  format('woff2'),
                url('https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3')
                  format('woff'),
                url('https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3')
                  format('opentype');
              font-display: swap;
              font-style: normal;
              font-weight: 900;
            }

            html,
            body {
              margin: 0;
              text-size-adjust: none;
              overscroll-behavior: auto contain;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: transparent;

              ${showSearch && 'overflow: hidden;'}
            }

            *[hidden] {
              display: none !important;
            }
          `}
        />
        <div
          dir="ltr"
          className="spectrum spectrum--medium spectrum--large spectrum--light"
          color-scheme="light"
          css={css`
            min-height: 100vh;
            background-color: transparent;
          `}>
          {hasSearch && indexAll && (
            <Search
              algolia={algolia}
              indexAll={indexAll}
              indexPrefix={algoliaIndexEnv ? algoliaIndexEnv : ''}
              showSearch={true}
              setShowSearch={setShowSearch}
              searchButtonId={searchButtonId}
              isIFramed
            />
          )}
        </div>
      </>
    );
  }

  let searchPathNameCheck = '';

  const searchFrameOnLoad = (counter = 0, loaded) => {
    const renderedFrame = document.getElementById('searchIframe');

    renderedFrame.contentWindow.postMessage(
      JSON.stringify({ localPathName: window.location.pathname }),
      '*'
    );
    if (window.location.pathname !== '/') {
      if (searchPathNameCheck !== window.location.pathname) {
        // attempt to establish connection for 3 seconds then time out
        if (counter > 30) {
          // eslint-disable-next-line no-console
          console.warn('Loading Search iFrame timed out');
          return;
        }
        window.setTimeout(() => {
          searchFrameOnLoad(renderedFrame, counter + 1, loaded);
        }, 100);
      }
    }
    // Past this point we successfully passed the local pathname
    // and received a confirmation from the iframe
    if (!loaded) {
      const searchParams = new URL(window.location).searchParams;
      if (searchParams.get(SEARCH_PARAMS.query)) {
        setShowSearch(true);
      }
    }

    loaded = true;
  };

  // Referenced https://stackoverflow.com/a/10444444/15028986
  const checkIframeLoaded = () => {
    const renderedFrame = document.getElementById('searchIframe');
    // Get a handle to the iframe element
    let iframeDoc;
    try {
      iframeDoc = renderedFrame.contentDocument;
      // Check if loading is complete
      if (iframeDoc.readyState === 'complete') {
        renderedFrame.onload = () => {
          searchFrameOnLoad();
        };
        // The loading is complete, call the function we want executed once the iframe is loaded
        return;
      }
    } catch (error) {
      window.setTimeout(checkIframeLoaded, 100);
    }
  };

  const onMessageReceivedFromIframe = evt => {
    // const expectedOrigin = setExpectedOrigin(window.location.host);
    // if (evt.origin !== expectedOrigin) return;
    try {
      const message = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
      if (message.query) {
        setQueryStringParameter(SEARCH_PARAMS.query, message.query);
        setQueryStringParameter(SEARCH_PARAMS.keywords, message.keywords);
        setQueryStringParameter(SEARCH_PARAMS.index, message.index);
      } else if (message.received) {
        searchPathNameCheck = message.received;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    window.addEventListener('message', onMessageReceivedFromIframe);
    if (hasSearch) {
      setLoadSearchFrame(true);
    }
  }, []);

  useEffect(() => {
    checkIframeLoaded();
  }, [loadSearchFrame]);

  return (
    <>
      <Helmet>
        <noscript>{`
          <style>
            #${layoutId} {
              grid-template-columns: 0 auto;
            }
            
            #${sideNavId} {
              display: none !important;
            }
            
            .gatsby-resp-image-image {
              opacity: 1 !important;
            }
          </style>
        `}</noscript>
      </Helmet>

      <Global
        styles={css`
          @font-face {
            font-family: 'adobe-clean';
            src: url('https://use.typekit.net/af/cb695f/000000000000000000017701/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
                format('woff2'),
              url('https://use.typekit.net/af/cb695f/000000000000000000017701/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
                format('woff'),
              url('https://use.typekit.net/af/cb695f/000000000000000000017701/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
                format('opentype');
            font-display: swap;
            font-style: normal;
            font-weight: 400;
          }

          @font-face {
            font-family: 'adobe-clean';
            src: url('https://use.typekit.net/af/74ffb1/000000000000000000017702/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
                format('woff2'),
              url('https://use.typekit.net/af/74ffb1/000000000000000000017702/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
                format('woff'),
              url('https://use.typekit.net/af/74ffb1/000000000000000000017702/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3')
                format('opentype');
            font-display: swap;
            font-style: italic;
            font-weight: 400;
          }

          @font-face {
            font-family: 'adobe-clean';
            src: url('https://use.typekit.net/af/eaf09c/000000000000000000017703/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
                format('woff2'),
              url('https://use.typekit.net/af/eaf09c/000000000000000000017703/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
                format('woff'),
              url('https://use.typekit.net/af/eaf09c/000000000000000000017703/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3')
                format('opentype');
            font-display: swap;
            font-style: normal;
            font-weight: 700;
          }

          @font-face {
            font-family: 'adobe-clean';
            src: url('https://use.typekit.net/af/40207f/0000000000000000000176ff/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
                format('woff2'),
              url('https://use.typekit.net/af/40207f/0000000000000000000176ff/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
                format('woff'),
              url('https://use.typekit.net/af/40207f/0000000000000000000176ff/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3')
                format('opentype');
            font-display: swap;
            font-style: normal;
            font-weight: 300;
          }

          @font-face {
            font-family: 'adobe-clean-serif';
            src: url('https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3')
                format('woff2'),
              url('https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3')
                format('woff'),
              url('https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3')
                format('opentype');
            font-display: swap;
            font-style: normal;
            font-weight: 900;
          }

          html,
          body {
            margin: 0;
            text-size-adjust: none;
            overscroll-behavior: auto contain;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;

            ${showSearch && 'overflow: hidden;'}
            ${showSideNav && 'overflow: hidden;'}
          }

          *[hidden] {
            display: none !important;
          }
        `}
      />
      <Provider
        value={{
          ims,
          isLoadingIms,
          location,
          pageContext,
          hasSideNav,
          siteMetadata,
          pathPrefix,
          allSitePage,
          allMdx,
          allGithub,
          allGithubContributors,
        }}>
        <SEO
          title={frontMatter?.title}
          description={frontMatter?.description}
          keywords={frontMatter?.keywords}
        />
        <div
          dir="ltr"
          className="spectrum spectrum--medium spectrum--large spectrum--light"
          color-scheme="light"
          css={css`
            min-height: 100vh;
            background-color: var(--spectrum-global-color-gray-50);
          `}>
          <>
            <div
              id={layoutId}
              css={css`
                display: grid;
                grid-template-areas: 'header header' 'sidenav main';
                grid-template-rows: var(--spectrum-global-dimension-size-800);
                grid-template-columns: ${hasSideNav ? `${SIDENAV_WIDTH} auto` : '0 auto'};

                @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                  grid-template-columns: 0 auto;
                }

                @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  grid-template-rows: 20px;
                }
              `}>
              <div
                css={css`
                  grid-area: header;
                  position: fixed;
                  height: var(--spectrum-global-dimension-size-800);
                  left: 0;
                  right: 0;
                  background-color: var(--spectrum-global-color-gray-50);
                  z-index: 2;

                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    height: var(--spectrum-global-dimension-size-600);
                  }
                `}>
                <GlobalHeader
                  hasIMS={hasIMS}
                  ims={ims}
                  isLoadingIms={isLoadingIms}
                  home={home}
                  versions={versions}
                  pages={pages}
                  docs={docs}
                  location={location}
                  hasSideNav={hasSideNav}
                  toggleSideNav={() => {
                    toggleSideNav(setShowSideNav);
                  }}
                  hasSearch={hasSearch && indexAll !== null}
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                  searchButtonId={searchButtonId}
                />
              </div>
              {hasSearch && loadSearchFrame && (
                <iframe
                  id="searchIframe"
                  src={searchIFrameSource()}
                  tabIndex="0"
                  css={css`
                    position: fixed;
                    top: var(--spectrum-global-dimension-size-800);
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    background-color: transparent;
                    z-index: 10;
                    width: 100%;
                    height: 100%;
                    display: ${showSearch ? 'block' : 'none'};

                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      top: var(--spectrum-global-dimension-size-600);
                    }

                  `}></iframe>
              )}

              <div
                id={sideNavId}
                hidden={!hasSideNav}
                css={css`
                  grid-area: sidenav;
                  position: fixed;
                  z-index: 1;
                  width: ${SIDENAV_WIDTH};
                  height: 100%;
                  background-color: var(--spectrum-global-color-gray-75);

                  @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                    transition: transform var(--spectrum-global-animation-duration-200) ease-in-out;
                    transform: translateX(${showSideNav ? '0' : '-100%'});
                  }

                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    width: 95%;
                  }
                `}>
                <SideNav
                  mainNavPages={pages}
                  versions={versions}
                  location={location}
                  selectedPages={sideNavSelectedPages}
                  selectedSubPages={sideNavSelectedSubPages}
                  setShowSideNav={setShowSideNav}
                />
              </div>
              <div
                css={css`
                  grid-area: main;
                `}>
                <main hidden={!pageSrc['openAPI'].has}>
                  {pageSrc['openAPI'].src &&
                    pageSrc['openAPI'].block &&
                    createElement(pageSrc['openAPI'].block, { src: pageSrc['openAPI'].src })}
                </main>

                <main hidden={!pageSrc['frame'].has}>
                  {pageSrc['frame'].src &&
                    pageSrc['frame'].block &&
                    createElement(pageSrc['frame'].block, {
                      src: pageSrc['frame'].src,
                      height: frontMatter?.frameHeight,
                      location,
                    })}
                </main>

                {!pageSrc['openAPI'].has && !pageSrc['frame'].has && children}
              </div>
            </div>

            <div
              css={css`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: ${isLoading ? 'grid' : 'none'};
                place-items: center center;
              `}>
              <ProgressCircle size="L" />
            </div>

            {hasSideNav && (
              <div
                role="presentation"
                css={css`
                  display: none;

                  @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                    display: block;
                    transition: opacity 160ms ease-in;
                    background-color: rgba(0, 0, 0, 0.4);
                    pointer-events: none;
                    opacity: 0;
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;

                    ${showSideNav &&
                    `
                    pointer-events: auto;
                    opacity: 1;
                  `}
                  }
                `}
                onClick={() => {
                  toggleSideNav(setShowSideNav);
                }}
              />
            )}
          </>
        </div>
      </Provider>
    </>
  );
};
