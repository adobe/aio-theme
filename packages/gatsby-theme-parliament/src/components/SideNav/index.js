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
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { css } from '@emotion/core';
import classNames from 'classnames';
import '@spectrum-css/sidenav';

const SideNav = ({ selectedPages, selectedSubPages }) => {
  const renderSubtree = (pages, level) =>
    pages
      .filter((page) => page.title && page.path)
      .map((page, index) => {
        const isSelected = selectedPages.find((selectedItem) => selectedItem === page);

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
              { 'is-selected': selectedPages[selectedPages.length - 1] === page && isSelected }
            ])}>
            <GatsbyLink to={page.path} className="spectrum-SideNav-itemLink" role="treeitem" aria-level={level}>
              {page.title}
            </GatsbyLink>
            {page.pages && <ul className="spectrum-SideNav">{renderSubtree(page.pages, level + 1)}</ul>}
          </li>
        );
      });

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      css={css`
        margin-top: var(--spectrum-global-dimension-static-size-800);
        padding: var(--spectrum-global-dimension-static-size-400);
      `}>
      <div role="tree">
        <ul aria-label="Table of contents" className="spectrum-SideNav spectrum-SideNav--multiLevel">
          {renderSubtree(selectedSubPages, 1)}
        </ul>
      </div>
    </nav>
  );
};

SideNav.propTypes = {
  selectedPages: PropTypes.array,
  selectedSubPages: PropTypes.array
};

export { SideNav };
