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

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { isExternalLink, getExternalLinkProps, MOBILE_SCREEN_WIDTH } from '../../utils';
import { css } from '@emotion/react';
import classNames from 'classnames';
import '@spectrum-css/sidenav';
import nextId from 'react-id-generator';
import {ChevronRight} from "../Icons";

const SideNav = ({ selectedPages, selectedSubPages, setShowSideNav }) => {
  const [expandedPages, setExpandedPages] = useState([]);
  const [sideNavClick, setSideNavClick] = useState(false);
  // If one page has header enabled, use header navigation type for all navigation items
  const hasHeader = selectedSubPages.some((page) => page.header);
  const isMultiLevel = selectedSubPages.some((page) => page?.pages?.length > 0);
  const ref = useRef(null);
  const handleClickOutside = event => {
    if (ref.current &&
      !ref.current.contains(event.target)) {
      // reset it when user did not click on the side nav.
      setSideNavClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const renderSubtree = (pages, level) =>
    pages
      .filter((page) => page.title && page.href)
      .map((page, index) => {
        const isSelected = selectedPages.find((selectedItem) => selectedItem === page);
        const id = nextId();

        if (isSelected && !sideNavClick && !expandedPages.includes(page.href)) {
          setExpandedPages((pages) => [...pages, page.href]);
        }

        return (
          <li
            key={index}
            role="treeitem"
            aria-level={level}
            aria-expanded={page.header || expandedPages.includes(page.href)}
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
              <a {...getExternalLinkProps(page.href)} href={page.href} className="spectrum-SideNav-itemLink">
                {page.title}
              </a>
            ) : (
              <GatsbyLink
                onClick={() => {
                  setSideNavClick(true);
                  if (page?.pages?.length && !page.header) {
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
                className="spectrum-SideNav-itemLink">
                {page.title}
                {page.pages && page.pages.length > 0 ? <ChevronRight
                  css={css` position:absolute; right:0px;
                            width: var(--spectrum-global-dimension-size-125) !important;
                            height: var(--spectrum-global-dimension-size-125) !important;
                            margin-left: var(--spectrum-global-dimension-size-100);
                            transition: transform var(--spectrum-global-animation-duration-100) ease-in-out;
                            ${expandedPages.includes(page.href) && `transform: rotate(90deg);`}
                          `}
                /> : null}
              </GatsbyLink>
            )}
            {page.pages && (
              <ul
                className="spectrum-SideNav"
                role="group"
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
      ref={ref}
      id="side-menu"
      role="navigation"
      aria-label="Primary"
      css={css`
        margin-top: var(--spectrum-global-dimension-size-800);

        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          margin-top: var(--spectrum-global-dimension-size-1200);
        }
      `}>
      <div
        css={css`
          box-sizing: border-box;
          padding: var(--spectrum-global-dimension-size-400);
          overflow: auto;
          height: calc(100vh - var(--spectrum-global-dimension-size-800));
        `}>
        <ul
          role="tree"
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
