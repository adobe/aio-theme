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
import { isBrowser,   findSelectedTopPage,
  findSelectedTopPageMenu,
  rootFix,
  rootFixPages, isExternalLink, getExternalLinkProps, MOBILE_SCREEN_WIDTH } from '../../utils';
import { css } from '@emotion/react';
import classNames from 'classnames';
import '@spectrum-css/sidenav';
import nextId from 'react-id-generator';
import { ChevronRight, CheckMark } from '../Icons';
import { AnchorButton } from '../AnchorButton';


const getSelectedTabIndex = (location, pages) => {
  const pathWithRootFix = rootFix(location.pathname);
  const pagesWithRootFix = rootFixPages(pages);

  let selectedIndex = pagesWithRootFix.indexOf(
    findSelectedTopPage(pathWithRootFix, pagesWithRootFix)
  );
  let tempArr = pathWithRootFix.split('/');
  let inx = tempArr.indexOf('use-cases');
  if (selectedIndex === -1 && inx > -1) {
    tempArr[inx + 1] = 'agreements-and-contracts';
    tempArr[inx + 2] = 'sales-proposals-and-contracts';
    if (tempArr[inx + 3] == undefined) {
      tempArr.push('');
    }
    let tempPathName = tempArr.join('/');
    selectedIndex = pagesWithRootFix.indexOf(findSelectedTopPage(tempPathName, pagesWithRootFix));
  }
  // Assume first item is selected
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }
  return selectedIndex;
};

const SideNav = ({versions, mainNavPages, selectedPages, selectedSubPages, setShowSideNav, location }) => {
  const [expandedPages, setExpandedPages] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [sideNavClick, setSideNavClick] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});

  // If one page has header enabled, use header navigation type for all navigation items
  const hasHeader = selectedSubPages.some(page => page.header);
  const isMultiLevel = selectedSubPages.some(page => page?.pages?.length > 0);
  const ref = useRef(null);
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
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


  useEffect(() => {
    const index = getSelectedTabIndex(location, mainNavPages);
    const pathWithRootFix = rootFix(location.pathname);
    setSelectedMenuItem(findSelectedTopPageMenu(pathWithRootFix, mainNavPages[index]));
  }, [location.pathname])

  useEffect(() => {
    if (window.innerWidth <= parseInt(MOBILE_SCREEN_WIDTH)) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth <= parseInt(MOBILE_SCREEN_WIDTH)) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    });
  }, []);

  const renderSubtree = (pages, level) =>
    pages
      .filter(page => page.title)
      .map((page, index) => {
        const isSelected = selectedPages.find(selectedItem => selectedItem === page);
        const id = nextId();
        const pageHref = page.href ? page.href : page.menu[0].href;

        if (isSelected && !sideNavClick && !expandedPages.includes(pageHref)) {
          setExpandedPages(pages => [...pages, pageHref]);
        }

        return (
          <li
            key={index}
            role="treeitem"
            aria-level={level}
            aria-expanded={page.header || expandedPages.includes(pageHref)}
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
              { 'is-expanded': page.header || expandedPages.includes(pageHref) },
              { 'is-selected': selectedPages[selectedPages.length - 1] === page && isSelected },
            ])}>
            {page.header ? (
              <h2 className="spectrum-SideNav-heading" id={id}>
                {page.title}
              </h2>
            ) : isExternalLink(pageHref) ? (
              <a
                {...getExternalLinkProps(pageHref)}
                href={pageHref}
                className="spectrum-SideNav-itemLink">
                {page.title}
              </a>
            ) : (
              <GatsbyLink
                onClick={() => {
                  setSideNavClick(true);
                  if (page?.pages?.length && !page.header) {
                    if (expandedPages.includes(pageHref)) {
                      setExpandedPages(pages => pages.filter(href => href !== pageHref));
                    } else {
                      setExpandedPages([...expandedPages, pageHref]);
                    }
                  } else {
                    setShowSideNav(false);
                  }
                }}
                to={pageHref}
                className="spectrum-SideNav-itemLink">
                {page.title}
                {page.pages && page.pages.length > 0 ? (
                  <ChevronRight
                    css={css`
                      position: absolute;
                      right: 0px;
                      width: var(--spectrum-global-dimension-size-125) !important;
                      height: var(--spectrum-global-dimension-size-125) !important;
                      margin-left: var(--spectrum-global-dimension-size-100);
                      transition: transform var(--spectrum-global-animation-duration-100)
                        ease-in-out;
                      ${expandedPages.includes(pageHref) && `transform: rotate(90deg);`}
                    `}
                  />
                ) : null}
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
                      padding-left: calc(${
                        level + 1
                      } * var(--spectrum-global-dimension-size-150)) !important;
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

  const renderMenuTree = (pages, level) =>
    pages
      .filter(page => page.title)
      .map((page, index) => {
        const isSelected = selectedPages.find(selectedItem => selectedItem === page);
        const id = nextId();
        const pageHref = page.href ? page.href : `#${page.title.toLowerCase()}`;

        if (isSelected && !sideNavClick && !expandedMenus.includes(pageHref)) {
          setExpandedMenus(pages => [...pages, pageHref]);
        }

        return (
          <li
            key={index}
            role="treeitem"
            aria-level={level}
            aria-expanded={page.header || expandedMenus.includes(pageHref)}
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
              { 'is-expanded': page.header || expandedMenus.includes(pageHref) },
              { 'is-selected': selectedPages[selectedPages.length - 1] === page && isSelected },
            ])}>
            {page.header ? (
              <h2 className="spectrum-SideNav-heading" id={id}>
                {page.title}
              </h2>
            ) : isExternalLink(pageHref) ? (
              <a
                {...getExternalLinkProps(pageHref)}
                href={pageHref}
                className="spectrum-SideNav-itemLink">

                {page.title}
              </a>
            ) : (
              <GatsbyLink
                onClick={() => {
                  setSideNavClick(true);
                  if (page?.menu?.length && !page.header) {
                    if (expandedMenus.includes(pageHref)) {
                      setExpandedMenus(pages => pages.filter(href => href !== pageHref));
                    } else {
                      setExpandedMenus([...expandedMenus, pageHref]);
                    }
                  } else {
                    setShowSideNav(false);
                  }
                }}
                to={pageHref}
                className="spectrum-SideNav-itemLink">
                { selectedMenuItem === page  && <CheckMark /> }
                {page.title}
                {page.menu && page.menu.length > 0 ? (
                  <ChevronRight
                    css={css`
                      position: absolute;
                      right: 0px;
                      width: var(--spectrum-global-dimension-size-125) !important;
                      height: var(--spectrum-global-dimension-size-125) !important;
                      margin-left: var(--spectrum-global-dimension-size-100);
                      transition: transform var(--spectrum-global-animation-duration-100)
                        ease-in-out;
                      ${expandedMenus.includes(pageHref) && `transform: rotate(90deg);`}
                    `}
                  />
                ) : null}
              </GatsbyLink>
            )}
            {page.menu && (
              <ul
                className="spectrum-SideNav"
                role="group"
                css={css`
                  ${level > 1
                    ? `
                    & > li > a {
                      padding-left: calc(${
                        level + 1
                      } * var(--spectrum-global-dimension-size-150)) !important;
                    }
                  `
                    : ''}
                `}
                {...(page.heading ? { 'aria-labelledby': id } : {})}>
                {renderMenuTree(page.menu, level + 1)}
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
          margin-top: var(--spectrum-global-dimension-size-400);
        }
      `}>
      <div
        css={css`
          box-sizing: border-box;
          padding: var(--spectrum-global-dimension-size-400);
          overflow: auto;
          height: calc(100vh - var(--spectrum-global-dimension-size-800));
        `}>
        {/* The section below is the alternative top menu */}
        {mobileView && (
          <>
            <p>Global Navigation</p>
            <ul
              role="tree"
              aria-label="Global Navigation"
              className={classNames('spectrum-SideNav', 'spectrum-SideNav--multiLevel')}>
              {versions && renderMenuTree([{title: 'Versions', menu: versions}], 1)}
              {renderMenuTree(mainNavPages, 1)}
              <AnchorButton variant="primary" href="/console" id={'consoleId'} tabIndex="0">
                Console
              </AnchorButton>
            </ul>
            {selectedSubPages.length > 0 && (
              <>
                <hr></hr>
                <p>Table of contents</p>
              </>
            )}
          </>
        )}

        {/* The section below is what used to be the sidenav with documentation subpages */}
        {selectedSubPages.length > 0 && (
          <ul
            role="tree"
            aria-label="Table of contents"
            className={classNames('spectrum-SideNav', {
              'spectrum-SideNav--multiLevel': isMultiLevel && !hasHeader,
            })}>
            {renderSubtree(selectedSubPages, 1)}
          </ul>
        )}
      </div>
    </nav>
  );
};

SideNav.propTypes = {
  mainNavPages: PropTypes.array,
  versions: PropTypes.array,
  selectedPages: PropTypes.array,
  selectedSubPages: PropTypes.array,
  setShowSideNav: PropTypes.func,
};

export { SideNav };
