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
import { SSRProvider, Provider as RSProvider, defaultTheme } from '@adobe/react-spectrum';
import { I18nProvider, useLocale } from '@react-aria/i18n';
import { css } from '@emotion/core';
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
import './index.css';
import { Grid } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';
import { Provider } from '../Context';
import { GlobalHeader } from '../GlobalHeader';
import { GlobalHeaderTemp } from '../GlobalHeader/temp';
import { SEO } from '../SEO';
import { SideNav } from '../SideNav';
import { OpenAPIBlock } from '@adobe/parliament-ui-components';

// Cache spec
let openAPISpec;

const toggleSideNav = (setShowSideNav) => {
  setShowSideNav((showSideNav) => !showSideNav);
};

export default ({ children, pageContext, location }) => {
  location.pathname = decodeURIComponent(location.pathname);

  const { locale, direction } = useLocale();

  // Load all data once and pass it to the Provider
  const data = useStaticQuery(
    graphql`
      query {
        allGithub {
          nodes {
            repository
            branch
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
          siteMetadata {
            globalNav {
              home {
                title
                path
                logo
              }
              menus {
                title
                path
                sections {
                  heading
                  divider
                  viewAll {
                    title
                    path
                  }
                  pages {
                    title
                    path
                    description
                  }
                }
              }
              signIn
              console
              footer {
                allAPIs {
                  title
                  path
                }
                APIs {
                  title
                  path
                }
                services {
                  title
                  path
                }
                community {
                  title
                  path
                }
                support {
                  title
                  path
                }
                developer {
                  title
                  path
                }
                legal {
                  title
                  path
                }
              }
            }
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
  const { siteMetadata } = site;
  const { globalNav, versions, pages, subPages, docs } = siteMetadata;

  const [showSideNav, setShowSideNav] = useState(false);

  const pathWithRootFix = rootFix(location.pathname);
  const pagesWithRootFix = rootFixPages(pages);
  const selectedPages = findSelectedPages(pathWithRootFix, subPages);
  const selectedSubPages = findSubPages(pathWithRootFix, pagesWithRootFix, subPages);
  const hasSideNav = selectedSubPages.length > 0;

  const frontmatter = pageContext?.frontmatter;
  const hasGlobalHeaderTemp = frontmatter?.GlobalHeaderTemp;
  const hasOpenAPISpec = frontmatter?.openAPISpec;

  if (typeof hasOpenAPISpec !== 'undefined') {
    if (openAPISpec !== hasOpenAPISpec) {
      openAPISpec = hasOpenAPISpec;
    }
  }

  return (
    <Provider
      value={{
        location,
        pageContext,
        hasSideNav,
        siteMetadata,
        allSitePage,
        allMdx,
        allGithub,
        allGithubContributors
      }}>
      <SEO
        title={frontmatter?.title}
        description={frontmatter?.description}
        favIcon={frontmatter?.favIcon}
        locale={locale}
        direction={direction}
      />
      <SSRProvider>
        <I18nProvider locale={locale}>
          <RSProvider theme={defaultTheme} colorScheme="light">
            <div
              className="spectrum--medium spectrum--large"
              css={css`
                min-height: 100vh;
                background-color: var(--spectrum-global-color-gray-50);

                @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                  #Layout-grid {
                    grid-template-columns: 0px auto !important;
                  }

                  #Layout-sidenav {
                    transition: transform var(--spectrum-global-animation-duration-200) ease-in-out;
                    transform: translateX(${showSideNav ? '0' : '-100%'});
                  }
                }
              `}>
              <Grid
                id="Layout-grid"
                areas={['header header', 'sidenav main']}
                rows={['size-800']}
                columns={hasSideNav ? ['256px', 'auto'] : ['0px', 'auto']}>
                <View
                  gridArea="header"
                  position="fixed"
                  height={hasGlobalHeaderTemp ? 'size-1000' : 'size-800'}
                  left="size-0"
                  right="size-0"
                  backgroundColor="gray-50"
                  zIndex="2">
                  {hasGlobalHeaderTemp ? (
                    <GlobalHeaderTemp />
                  ) : (
                    <GlobalHeader
                      globalNav={globalNav}
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
                </View>
                <View
                  id="Layout-sidenav"
                  backgroundColor="gray-75"
                  gridArea="sidenav"
                  isHidden={!hasSideNav}
                  position="fixed"
                  zIndex="1"
                  width="256px"
                  height="100%">
                  <SideNav
                    selectedPages={selectedPages}
                    selectedSubPages={selectedSubPages}
                    searchIndex={ParliamentSearchIndex}
                  />
                </View>
                <View gridArea="main">
                  <View isHidden={!hasOpenAPISpec}>{openAPISpec && <OpenAPIBlock specUrl={openAPISpec} />}</View>
                  {!hasOpenAPISpec && children}
                </View>
              </Grid>
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
          </RSProvider>
        </I18nProvider>
      </SSRProvider>
    </Provider>
  );
};
