import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
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
import { Header } from './Header';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

export default ({ children, pageContext, location }) => {
  const data = useStaticQuery(
    graphql`
      query {
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
  const hasSideNav = siteMetadata.subPages.some(
    (page) => page.path && location.pathname.startsWith(withPrefix(page.path))
  );

  return (
    <Provider value={{ location, pageContext, hasSideNav, siteMetadata, allSitePage, allMdx }}>
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
            <Header />
          </View>
          <View
            backgroundColor="gray-75"
            gridArea="sidenav"
            isHidden={!hasSideNav}
            position="fixed"
            zIndex="1"
            width="256px"
            height="100%">
            <SideNav />
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
