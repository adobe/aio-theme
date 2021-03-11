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
import { SEO } from '../SEO';
import { ProgressCircle } from '../ProgressCircle';

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

  return (
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
                  height: var(--spectrum-global-dimension-size-800);
                  left: 0;
                  right: 0;
                  background-color: var(--spectrum-global-color-gray-50);
                  z-index: 2;
                `}>
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
              </div>
              <div
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
  );
};
