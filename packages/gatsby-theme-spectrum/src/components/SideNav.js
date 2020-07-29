import React, { useContext } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { findSubPages, findSelectedPages } from './utils';
import Context from './Context';
import { css } from '@emotion/core';
import classNames from 'classnames';
import '@spectrum-css/sidenav';

export const SideNav = () => {
  const { siteMetadata, location } = useContext(Context);

  const selectedSideNavPages = findSelectedPages(location.pathname, siteMetadata.subPages);

  const renderSubtree = (pages, level) =>
    pages.map((page, index) => {
      if (page.title && page.path) {
        const isSelected = selectedSideNavPages.find((selectedItem) => selectedItem === page);

        return (
          <li
            role="none"
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
            <GatsbyLink to={page.path} className="spectrum-SideNav-itemLink" role="treeitem" aria-level={level}>
              {page.title}
            </GatsbyLink>
            {page.pages && <ul className="spectrum-SideNav">{renderSubtree(page.pages, level + 1)}</ul>}
          </li>
        );
      }
    });

  return (
    <nav
      role="Navigation"
      aria-label="Primary"
      css={css`
        margin-top: var(--spectrum-global-dimension-static-size-800);
        padding: var(--spectrum-global-dimension-static-size-400);
      `}>
      <ul role="tree" aria-label="Table of contents" className="spectrum-SideNav spectrum-SideNav--multiLevel">
        {renderSubtree(findSubPages(location.pathname, siteMetadata.pages, siteMetadata.subPages), 1)}
      </ul>
    </nav>
  );
};
