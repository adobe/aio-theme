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
import { Search } from '../Search';
import nextId from 'react-id-generator';

const SideNav = ({ selectedPages, selectedSubPages, searchIndex }) => {
  // If one page has header enabled, use header navigation type for all navigation items
  const hasHeader = selectedSubPages.some((page) => page.header);

  const renderSubtree = (pages, level) =>
    pages
      .filter((page) => page.title && page.path)
      .map((page, index) => {
        const isSelected = selectedPages.find((selectedItem) => selectedItem === page);
        const id = nextId();

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
              { 'is-expanded': isSelected || hasHeader },
              { 'is-selected': selectedPages[selectedPages.length - 1] === page && isSelected }
            ])}>
            {page.header ? (
              <h2 className="spectrum-SideNav-heading" id={id}>
                {page.title}
              </h2>
            ) : (
              <GatsbyLink to={page.path} className="spectrum-SideNav-itemLink" role="treeitem" aria-level={level}>
                {page.title}
              </GatsbyLink>
            )}
            {page.pages && (
              <ul className="spectrum-SideNav" {...(page.heading ? { 'aria-labelledby': id } : {})}>
                {renderSubtree(page.pages, level + 1)}
              </ul>
            )}
          </li>
        );
      });

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      css={css`
        margin-top: var(--spectrum-global-dimension-size-800);
      `}>
      <Search
        searchIndex={searchIndex}
        css={css`
          padding-top: var(--spectrum-global-dimension-size-400);
          margin-left: var(--spectrum-global-dimension-size-400);
          margin-bottom: var(--spectrum-global-dimension-size-200);
        `}
      />
      <div
        role="tree"
        css={css`
          box-sizing: border-box;
          padding: 0 var(--spectrum-global-dimension-size-400) var(--spectrum-global-dimension-size-400);
          overflow: auto;
          height: calc(
            100vh - var(--spectrum-global-dimension-size-800) - var(--spectrum-global-dimension-size-400) -
              var(--spectrum-global-dimension-size-400)
          );
        `}>
        <ul
          aria-label="Table of contents"
          className={classNames('spectrum-SideNav', { 'spectrum-SideNav--multiLevel': !hasHeader })}>
          {renderSubtree(selectedSubPages, 1)}
        </ul>
      </div>
    </nav>
  );
};

SideNav.propTypes = {
  selectedPages: PropTypes.array,
  selectedSubPages: PropTypes.array,
  searchIndex: PropTypes.object
};

export { SideNav };
