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

import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { findSelectedPages, findSubPages } from './utils';
import '@spectrum-css/vars/dist/spectrum-global.css';
import '@spectrum-css/vars/dist/spectrum-medium.css';
import '@spectrum-css/vars/dist/spectrum-large.css';
import '@spectrum-css/vars/dist/spectrum-light.css';
import '@spectrum-css/sidenav';
import '@adobe/focus-ring-polyfill';
import './Layout.css';
import { Grid } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Provider } from './Context';
import { GlobalHeader } from './GlobalHeader';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

export default ({ children, pageContext, location }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allGithubContributors {
          nodes {
            contributors {
              date
              login
              name
            }
            path,
            href
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
            }
            docs {
              path
            }
            pages {
              title
              path
            }
            subPages {
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
            github {
              repository
              branch
            }
          }
        }
      }
    `
  );

  const allMdx = data.allMdx;
  const allSitePage = data.allSitePage;
  const siteMetadata = data.site.siteMetadata;
  const allGithubContributors = data.allGithubContributors;

  const globalNav = siteMetadata.globalNav;
  const pages = siteMetadata.pages;
  const docs = siteMetadata.docs;

  const selectedPages = findSelectedPages(location.pathname, siteMetadata.subPages);
  const selectedSubPages = findSubPages(location.pathname, siteMetadata.pages, siteMetadata.subPages);
  const hasSideNav = selectedSubPages.length > 0;

  return (
    <Provider value={{ location, pageContext, hasSideNav, siteMetadata, allSitePage, allMdx, allGithubContributors }}>
      <SEO title={pageContext?.frontmatter?.title} description={pageContext?.frontmatter?.description} />
      <div className="spectrum spectrum--medium spectrum--large spectrum--light" lang="en" dir="ltr">
        <Grid
          areas={['header header', 'sidenav main']}
          rows={['size-800']}
          columns={hasSideNav ? ['256px', 'auto'] : ['auto']}>
          <View
            gridArea="header"
            position="fixed"
            height="size-800"
            left="size-0"
            right="size-0"
            backgroundColor="gray-50"
            zIndex="2">
            <GlobalHeader globalNav={globalNav} pages={pages} docs={docs} location={location} />
          </View>
          <View
            backgroundColor="gray-75"
            gridArea="sidenav"
            isHidden={!hasSideNav}
            position="fixed"
            zIndex="1"
            width="256px"
            height="100%">
            <SideNav selectedPages={selectedPages} selectedSubPages={selectedSubPages} />
          </View>
          <View gridArea="main">
            <main
              className="spectrum-Typography"
              css={css`
                min-height: 100vh;
              `}>
              {children}
            </main>
          </View>
        </Grid>
      </div>
    </Provider>
  );
};
