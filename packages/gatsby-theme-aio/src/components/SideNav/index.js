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
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { isExternalLink, getExternalLinkProps, MOBILE_SCREEN_WIDTH } from '../../utils';
import { css } from '@emotion/react';
import classNames from 'classnames';
import '@spectrum-css/sidenav';
import nextId from 'react-id-generator';

const SideNav = ({ selectedPages, selectedSubPages, setShowSideNav }) => {
  const [expandedPages, setExpandedPages] = useState([]);

  // If one page has header enabled, use header navigation type for all navigation items
  const hasHeader = selectedSubPages.some((page) => page.header);
  const isMultiLevel = selectedSubPages.some((page) => page?.pages?.length > 0);

  const renderSubtree = (pages, level) =>
    pages
      .filter((page) => page.title && page.href)
      .map((page, index) => {
        const isSelected = selectedPages.find((selectedItem) => selectedItem === page);
        const id = nextId();

        if (isSelected && !expandedPages.includes(page.href)) {
          setExpandedPages((pages) => [...pages, page.href]);
        }

        return (
          <li
            key={index}
            css={css`
              &:not(.is-expanded) .spectrum-SideNav {
                display: none;
              }

              &:first-of-type .spectrum-SideNav-heading {
                margin-top: 0;
              }
            `}
            className={classNames([
              'spectrum-SideNav-item',
              { 'is-expanded': page.header || expandedPages.includes(page.href) },
              { 'is-selected': selectedPages[selectedPages.length - 1] === page && isSelected }
            ])}>
            {page.header ? (
              <h2 className="spectrum-SideNav-heading" id={id}>
                {page.title}
              </h2>
            ) : isExternalLink(page.href) ? (
              <a
                {...getExternalLinkProps(page.href)}
                href={page.href}
                className="spectrum-SideNav-itemLink"
                role="treeitem"
                aria-level={level}>
                {page.title}
              </a>
            ) : (
              <GatsbyLink
                onClick={(event) => {
                  if (page?.pages?.length && !page.header && page.pages.find((subPage) => subPage.href === page.href)) {
                    event.preventDefault();

                    if (expandedPages.includes(page.href)) {
                      setExpandedPages((pages) => pages.filter((href) => href !== page.href));
                    } else {
                      setExpandedPages([...expandedPages, page.href]);
                    }
                  } else {
                    setShowSideNav(false);
                  }
                }}
                to={page.href}
                className="spectrum-SideNav-itemLink"
                role="treeitem"
                aria-level={level}>
                {page.title}
              </GatsbyLink>
            )}
            {page.pages && (
              <ul
                className="spectrum-SideNav"
                css={css`
                  ${level > 1
                    ? `
                    & > li > a {
                      padding-left: calc(${level + 1} * var(--spectrum-global-dimension-size-150)) !important;
                    }
                  `
                    : ''}
                `}
                {...(page.heading ? { 'aria-labelledby': id } : {})}>
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

        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          margin-top: var(--spectrum-global-dimension-size-1200);
        }
      `}>
      <div
        role="tree"
        css={css`
          box-sizing: border-box;
          padding: var(--spectrum-global-dimension-size-400);
          overflow: auto;
          height: calc(100vh - var(--spectrum-global-dimension-size-800));
        `}>
        <ul
          aria-label="Table of contents"
          className={classNames('spectrum-SideNav', { 'spectrum-SideNav--multiLevel': isMultiLevel && !hasHeader })}>
          {renderSubtree(selectedSubPages, 1)}
        </ul>
      </div>
    </nav>
  );
};

SideNav.propTypes = {
  selectedPages: PropTypes.array,
  selectedSubPages: PropTypes.array,
  setShowSideNav: PropTypes.func
};

export { SideNav };
