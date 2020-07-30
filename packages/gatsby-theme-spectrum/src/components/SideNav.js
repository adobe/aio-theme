import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { css } from '@emotion/core';
import classNames from 'classnames';
import '@spectrum-css/sidenav';

const SideNav = ({ selectedPages, selectedSubPages }) => {
  const renderSubtree = (pages, level) =>
    pages.map((page, index) => {
      if (page.title && page.path) {
        const isSelected = selectedPages.find((selectedItem) => selectedItem === page);

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
              { 'is-selected': selectedPages[selectedPages.length - 1] === page && isSelected }
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
        {renderSubtree(selectedSubPages, 1)}
      </ul>
    </nav>
  );
};

SideNav.propTypes = {
  selectedPages: PropTypes.array,
  selectedSubPages: PropTypes.array
};

export { SideNav };
