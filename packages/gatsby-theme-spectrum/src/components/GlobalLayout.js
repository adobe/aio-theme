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
import './GlobalLayout.css';
import { Grid } from '@react-spectrum/layout';
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
    <Provider value={{ path, pageContext, hasSideNav }}>
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
            zIndex="1">
            <Header path={path} />
          </View>
          <View
            backgroundColor="gray-75"
            gridArea="sidenav"
            isHidden={!hasSideNav}
            position="fixed"
            width="256px"
            height="100%">
            {/* TODO move to SideNav component */}
            <View elementType="nav" marginTop="size-800" padding="size-400">
              <ul className="spectrum-SideNav spectrum-SideNav--multiLevel">{renderSubtree(sideNavs)}</ul>
            </View>
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
