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

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import loadable from '@loadable/component';
import { useStaticQuery, graphql } from 'gatsby';
import { rootFix, rootFixPages, findSelectedPages, findSubPages, LARGE_SCREEN_WIDTH } from '../../utils';
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
import { GlobalHeader } from '../GlobalHeader';
import { GlobalHeaderTemp } from '../GlobalHeader/temp';
import { SEO } from '../SEO';
import { ProgressCircle } from '../ProgressCircle';
import nextId from 'react-id-generator';

// Cache spec
let openAPISpec;

let OpenAPIBlock;
let SideNav;

const toggleSideNav = (setShowSideNav) => {
  setShowSideNav((showSideNav) => !showSideNav);
};

export default ({ children, pageContext, location }) => {
  location.pathname = decodeURIComponent(location.pathname);

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
            componentPath
            path
          }
        }
        site {
          pathPrefix
          siteMetadata {
            menu
            docs {
              title
              path
            }
            versions {
              title
              path
            }
            pages {
              title
              path
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
        ParliamentSearchIndex
      }
    `
  );

  const { allMdx, allSitePage, site, allGithub, allGithubContributors, ParliamentSearchIndex } = data;
  const { siteMetadata, pathPrefix } = site;
  const { menu, versions, pages, subPages, docs } = siteMetadata;

  const [showSideNav, setShowSideNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathWithRootFix = rootFix(location.pathname);
  const pagesWithRootFix = rootFixPages(pages);
  const selectedPages = findSelectedPages(pathWithRootFix, subPages);
  const selectedSubPages = findSubPages(pathWithRootFix, pagesWithRootFix, subPages);
  const hasSideNav = selectedSubPages.length > 0;

  if (hasSideNav && !SideNav) {
    SideNav = loadable(() => import('../SideNav'));
  }

  const frontMatter = pageContext?.frontmatter;
  const hasGlobalHeaderTemp = frontMatter?.GlobalHeaderTemp;
  const hasLayout = pageContext?.frontmatter?.layout !== 'none';

  const hasOpenAPISpec = frontMatter?.openAPISpec;
  if (typeof hasOpenAPISpec !== 'undefined') {
    if (openAPISpec !== hasOpenAPISpec) {
      openAPISpec = hasOpenAPISpec;
    }
  }

  if (openAPISpec && !OpenAPIBlock) {
    setIsLoading(true);
    OpenAPIBlock = loadable(() => import('../OpenAPIBlock'));

    OpenAPIBlock.load().then(() => {
      setIsLoading(false);
    });
  }

  const layoutId = nextId();
  const sideNavId = nextId();

  return (
    <>
      <Helmet>
        <style>
          {`
          @font-face {
            font-family: "adobe-clean";
            src: url("https://use.typekit.net/af/cb695f/000000000000000000017701/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"), url("https://use.typekit.net/af/cb695f/000000000000000000017701/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"), url("https://use.typekit.net/af/cb695f/000000000000000000017701/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
            font-display: swap;
            font-style: normal;
            font-weight: 400;
          }
          
          @font-face {
            font-family: "adobe-clean";
            src: url("https://use.typekit.net/af/74ffb1/000000000000000000017702/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff2"), url("https://use.typekit.net/af/74ffb1/000000000000000000017702/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff"), url("https://use.typekit.net/af/74ffb1/000000000000000000017702/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("opentype");
            font-display: swap;
            font-style: italic;
            font-weight: 400;
          }
          
          @font-face {
            font-family: "adobe-clean";
            src: url("https://use.typekit.net/af/eaf09c/000000000000000000017703/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/eaf09c/000000000000000000017703/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/eaf09c/000000000000000000017703/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
            font-display: swap;
            font-style: normal;
            font-weight: 700;
          }
          
          @font-face {
            font-family: "adobe-clean";
            src: url("https://use.typekit.net/af/40207f/0000000000000000000176ff/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3") format("woff2"), url("https://use.typekit.net/af/40207f/0000000000000000000176ff/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3") format("woff"), url("https://use.typekit.net/af/40207f/0000000000000000000176ff/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3") format("opentype");
            font-display: swap;
            font-style: normal;
            font-weight: 300;
          }
          
          @font-face {
            font-family: "adobe-clean-serif";
            src: url("https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3") format("woff2"), url("https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3") format("woff"), url("https://use.typekit.net/af/505d17/00000000000000003b9aee44/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3") format("opentype");
            font-display: swap;
            font-style: normal;
            font-weight: 900;
          }
          
          html, body {
            margin: 0;
            text-size-adjust: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          *[hidden] {
            display: none !important;
          }`}
        </style>
        <noscript>
          {`
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
          `}
        </noscript>
      </Helmet>
      <Provider
        value={{
          location,
          pageContext,
          hasSideNav,
          siteMetadata,
          pathPrefix,
          allSitePage,
          allMdx,
          allGithub,
          allGithubContributors
        }}>
        <SEO title={frontMatter?.title} description={frontMatter?.description} />
        <div
          dir="ltr"
          className="spectrum spectrum--medium spectrum--large spectrum--light"
          color-scheme="light"
          css={css`
            min-height: 100vh;
            background-color: var(--spectrum-global-color-gray-50);
          `}>
          {hasLayout ? (
            <>
              <div
                id={layoutId}
                css={css`
                  display: grid;
                  grid-template-areas: 'header header' 'sidenav main';
                  grid-template-rows: var(--spectrum-global-dimension-size-800);
                  grid-template-columns: ${hasSideNav ? '256px auto' : '0 auto'};

                  ${hasLayout &&
                  `@media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                    grid-template-columns: 0px auto;
                  }`}
                `}>
                <div
                  css={css`
                    grid-area: header;
                    position: fixed;
                    height: ${hasGlobalHeaderTemp
                      ? 'var(--spectrum-global-dimension-size-1000)'
                      : 'var(--spectrum-global-dimension-size-800)'};
                    left: 0;
                    right: 0;
                    background-color: var(--spectrum-global-color-gray-50);
                    z-index: 2;
                  `}>
                  {hasGlobalHeaderTemp ? (
                    <GlobalHeaderTemp />
                  ) : (
                    <GlobalHeader
                      menu={menu}
                      versions={versions}
                      pages={pages}
                      docs={docs}
                      location={location}
                      hasSideNav={hasSideNav}
                      toggleSideNav={() => {
                        toggleSideNav(setShowSideNav);
                      }}
                    />
                  )}
                </div>
                <div
                  id={sideNavId}
                  hidden={!hasSideNav}
                  css={css`
                    grid-area: sidenav;
                    position: fixed;
                    z-index: 1;
                    width: 256px;
                    height: 100%;
                    background-color: var(--spectrum-global-color-gray-75);

                    ${hasLayout &&
                    `@media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                      transition: transform var(--spectrum-global-animation-duration-200) ease-in-out;
                      transform: translateX(${showSideNav ? '0' : '-100%'});
                    }`}
                  `}>
                  {SideNav && (
                    <SideNav
                      selectedPages={selectedPages}
                      selectedSubPages={selectedSubPages}
                      searchIndex={ParliamentSearchIndex}
                    />
                  )}
                </div>
                <div
                  css={css`
                    grid-area: main;
                  `}>
                  <div hidden={!hasOpenAPISpec}>
                    {openAPISpec && (
                      <main
                        css={css`
                          [role='navigation'] [role='menuitem'] + ul {
                            display: block;
                          }
                        `}>
                        {OpenAPIBlock && <OpenAPIBlock specUrl={openAPISpec} />}
                      </main>
                    )}
                  </div>
                  {!hasOpenAPISpec && children}
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
                <ProgressCircle />
              </div>

              <div
                css={css`
                  display: none;

                  @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
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
            </>
          ) : (
            children
          )}
        </div>
      </Provider>
    </>
  );
};
