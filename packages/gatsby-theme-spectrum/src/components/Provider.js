import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import classNames from 'classnames';
import '@spectrum-css/vars/dist/spectrum-global.css';
import '@spectrum-css/vars/dist/spectrum-medium.css';
import '@spectrum-css/vars/dist/spectrum-large.css';
import '@spectrum-css/vars/dist/spectrum-light.css';
import '@spectrum-css/sidenav';
import '@adobe/focus-ring-polyfill';
import { Grid, Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Provider } from './Context';
import { Header } from './Header';
import { SEO } from './SEO';

export default ({ children, pageContext, path }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            sideNavs {
              title
              path
              items {
                title
                path
                items {
                  title
                  path
                }
              }
            }
          }
        }
      }
    `
  );

  const sideNavs = data.site.siteMetadata.sideNavs;
  const selectedSideNavItems = [];

  const findSelectedSideNavItems = (items) => {
    items.forEach((item) => {
      if (item.path && path.startsWith(item.path)) {
        selectedSideNavItems.push(item);
      }

      if (item.items) {
        findSelectedSideNavItems(item.items);
      }
    });
  };

  const renderSubtree = (items) =>
    items.map((item, index) => {
      if (item.title && item.path) {
        const isSelected = selectedSideNavItems.find((selectedItem) => selectedItem === item);

        return (
          <li
            key={index}
            css={css`
              &:not(.is-expanded) .spectrum-SideNav {
                display: none;
              }
            `}
            className={classNames([
              'spectrum-SideNav-item',
              { 'is-expanded': isSelected },
              { 'is-selected': selectedSideNavItems[selectedSideNavItems.length - 1] === item && isSelected }
            ])}>
            <a href={item.path} className="spectrum-SideNav-itemLink">
              {item.title}
            </a>
            {item.items && <ul className="spectrum-SideNav">{renderSubtree(item.items)}</ul>}
          </li>
        );
      }
    });

  findSelectedSideNavItems(sideNavs);
  const hasSideNav = selectedSideNavItems.length > 0;

  return (
    <Provider value={{ path, pageContext }}>
      <SEO title={pageContext?.frontmatter?.title} description={pageContext?.frontmatter?.description} />
      <div className="spectrum spectrum--medium spectrum--large spectrum--light" lang="en" dir="ltr">
        <View backgroundColor="gray-50">
          <Grid areas={['header', 'main']} rows={['size-800']}>
            <View gridArea="header">
              <Header path={path} />
            </View>
            <View gridArea="main">
              {hasSideNav ? (
                <>
                  <Flex>
                    <div
                      css={css`
                        flex: 0 0 256px;
                        background-color: var(--spectrum-global-color-gray-75);
                      `}>
                      <nav
                        css={css`
                          position: sticky;
                          top: 0;
                          box-sizing: border-box;
                          padding: var(--spectrum-global-dimension-static-size-400)
                            var(--spectrum-global-dimension-static-size-300);
                        `}>
                        <ul className="spectrum-SideNav spectrum-SideNav--multiLevel">{renderSubtree(sideNavs)}</ul>
                      </nav>
                    </div>
                    {children}
                  </Flex>
                </>
              ) : (
                children
              )}
            </View>
          </Grid>
        </View>
      </div>
    </Provider>
  );
};
