import React, { useContext } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { findSelectedPages } from './utils';
import Context from './Context';
import { css } from '@emotion/core';
import classNames from 'classnames';
import '@spectrum-css/sidenav';

export const SideNav = () => {
  const { siteMetadata, location } = useContext(Context);

  const selectedSideNavPages = findSelectedPages(location.pathname, siteMetadata.subPages);

  const renderSubtree = (pages) =>
    pages.map((page, index) => {
      if (page.title && page.path) {
        const isSelected = selectedSideNavPages.find((selectedItem) => selectedItem === page);

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
              { 'is-selected': selectedSideNavPages[selectedSideNavPages.length - 1] === page && isSelected }
            ])}>
            <GatsbyLink to={page.path} className="spectrum-SideNav-itemLink">
              {page.title}
            </GatsbyLink>
            {page.pages && <ul className="spectrum-SideNav">{renderSubtree(page.pages)}</ul>}
          </li>
        );
      }
    });

  return <ul className="spectrum-SideNav spectrum-SideNav--multiLevel">{renderSubtree(siteMetadata.subPages)}</ul>;
};
