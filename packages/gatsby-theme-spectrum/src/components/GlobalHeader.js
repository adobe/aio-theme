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

import React, { useRef, useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { findSelectedTopPage } from './utils';
import { css } from '@emotion/core';
import { Grid, Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Divider } from '@react-spectrum/divider';
import { Button } from './Button';
import { Link } from './Link';
import { Adobe, ChevronDown } from './Icons';
import classNames from 'classnames';
import '@spectrum-css/typography';
import '@spectrum-css/tabs';
import '@spectrum-css/icon';
import '@spectrum-css/dropdown';
import '@spectrum-css/popover';
import '@spectrum-css/assetlist';

const stretched = css`
  height: 100%;
`;

const GlobalHeader = ({ globalNav, pages, docs, location }) => {
  const nav = useRef(null);
  const selectedTabIndicator = useRef(null);
  const [tabs] = useState([]);
  const primaryPopover = useRef(null);
  const secondaryPopover = useRef(null);
  const [openPrimaryMenu, setOpenPrimaryMenu] = useState(false);
  const [openSecondaryMenu, setOpenSecondaryMenu] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const positionSelectedTabIndicator = (path, tabs) => {
    const selectedTab = tabs[pages.indexOf(findSelectedTopPage(location.pathname, pages))];

    if (selectedTab) {
      selectedTabIndicator.current.style.transform = `translate(${selectedTab.current.offsetLeft}px, 0px)`;
      selectedTabIndicator.current.style.width = `${selectedTab.current.offsetWidth}px`;
    }
  };

  useEffect(() => {
    selectedTabIndicator.current.style.transition = isAnimated ? '' : 'none';
    positionSelectedTabIndicator(location.pathname, tabs);

    // Font affects positioning of the Tab indicator
    document.fonts.ready.then(() => {
      positionSelectedTabIndicator(location.pathname, tabs);
      setIsAnimated(true);
    });
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (event) => {
      if (globalNav.menus.length) {
        if (!primaryPopover.current.contains(event.target)) {
          setOpenPrimaryMenu(false);
        }
      }

      if (globalNav.menus.length > 1) {
        if (!secondaryPopover.current.contains(event.target)) {
          setOpenSecondaryMenu(false);
        }
      }
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <header
      role="banner"
      css={css`
        ${stretched};
        border-bottom: var(--spectrum-global-dimension-static-size-10) solid var(--spectrum-global-color-gray-200);
        box-sizing: border-box;
      `}>
      <nav css={stretched} role="navigation" aria-label="Global">
        <Grid
          areas={['title navigation console profile']}
          columns={['minmax(256px, max-content)', 'auto', 'size-1200', 'size-1200']}
          alignItems="center"
          marginX="size-400"
          height="100%">
          <View gridArea="title" height="100%">
            <Flex height="100%" alignItems="center">
              <View>
                <a
                  href={globalNav.home.path}
                  css={css`
                    text-decoration: none;
                  `}>
                  <Flex alignItems="center">
                    {globalNav.home.logo === 'adobe' ? (
                      <Adobe
                        css={css`
                          width: var(--spectrum-global-dimension-static-size-450);
                          height: var(--spectrum-global-dimension-static-size-400);
                          display: block;
                          margin-right: var(--spectrum-global-dimension-static-size-200);
                        `}
                      />
                    ) : (
                      globalNav.home.logo
                    )}
                    <strong className="spectrum-Heading--XXS">{globalNav.home.title}</strong>
                  </Flex>
                </a>
              </View>
              {globalNav.menus.slice(0, 2).map((menu, index) => {
                const isPrimary = index === 0;
                const id = new Date().getTime();

                return (
                  menu.title && (
                    <div
                      key={index}
                      css={css`
                        box-sizing: border-box;
                        padding: var(--spectrum-global-dimension-static-size-200)
                          var(--spectrum-global-dimension-static-size-300) 0
                          var(--spectrum-global-dimension-static-size-300);
                        height: calc(100% + 1px);
                        border-left: 1px solid transparent;
                        border-right: 1px solid transparent;
                        ${isPrimary
                          ? `
                        margin-left: var(--spectrum-global-dimension-static-size-300);
                        `
                          : ''}
                        ${globalNav.menus.length === 1
                          ? `
                          border-color: var(--spectrum-global-color-gray-200);
                        `
                          : ''}
                      `}>
                      <div
                        className={classNames('spectrum-Dropdown', 'spectrum-Dropdown--quiet', {
                          'is-open': isPrimary ? openPrimaryMenu : openSecondaryMenu
                        })}>
                        <button
                          className={classNames(
                            'spectrum-FieldButton',
                            'spectrum-FieldButton--quiet',
                            'spectrum-Dropdown-trigger',
                            { 'is-selected': isPrimary ? openPrimaryMenu : openSecondaryMenu }
                          )}
                          aria-haspopup="listbox"
                          aria-expanded={isPrimary ? openPrimaryMenu : openSecondaryMenu}
                          aria-controls={id}
                          onClick={(event) => {
                            event.stopPropagation();
                            event.nativeEvent.stopImmediatePropagation();

                            if (isPrimary) {
                              setOpenPrimaryMenu(!openPrimaryMenu);
                              setOpenSecondaryMenu(false);
                            } else {
                              setOpenSecondaryMenu(!openSecondaryMenu);
                              setOpenPrimaryMenu(false);
                            }
                          }}>
                          <span className="spectrum-Dropdown-label">{menu.title}</span>
                          <ChevronDown className="spectrum-Dropdown-icon" />
                        </button>
                      </div>
                      <div
                        ref={isPrimary ? primaryPopover : secondaryPopover}
                        id={id}
                        aria-hidden={isPrimary ? !openPrimaryMenu : !openSecondaryMenu}
                        className={classNames(
                          'spectrum-Popover',
                          'spectrum-Popover--bottom',
                          'spectrum-Dropdown-popover',
                          'spectrum-Dropdown-popover--quiet',
                          { 'is-open': isPrimary ? openPrimaryMenu : openSecondaryMenu }
                        )}
                        css={css`
                          display: block;
                          padding: var(--spectrum-global-dimension-static-size-300);
                          z-index: 2;
                          max-width: none !important;
                        `}>
                        <Flex gap="size-400">
                          {menu.sections.map((section, i) => (
                            <React.Fragment key={i}>
                              <View>
                                {section.heading && (
                                  <View marginBottom="size-200" marginStart="size-200">
                                    <strong className="spectrum-Heading--XS">{section.heading}</strong>
                                  </View>
                                )}
                                <ul className="spectrum-AssetList">
                                  {section.pages.map((page, k) => (
                                    <li
                                      key={k}
                                      className="spectrum-AssetList-item"
                                      css={css`
                                        width: auto !important;
                                        height: auto !important;
                                        min-height: var(--spectrum-global-dimension-static-size-500) !important;
                                        ${page.description
                                          ? 'margin-bottom: var(--spectrum-global-dimension-static-size-200);'
                                          : ''}
                                      `}>
                                      <a
                                        css={css`
                                          display: flex;
                                          z-index: 1;
                                          height: 100%;
                                          width: 100%;
                                          align-items: center;
                                          color: inherit;
                                          text-decoration: none;
                                          padding-top: var(--spectrum-global-dimension-static-size-100);
                                          padding-bottom: var(--spectrum-global-dimension-static-size-100);
                                        `}
                                        href={page.path}>
                                        <Flex direction="column">
                                          <View>{page.title}</View>
                                          {page.description && (
                                            <View marginTop="size-100">
                                              <span
                                                className="spectrum-Body--XS"
                                                css={css`
                                                  color: var(--spectrum-global-color-gray-700);
                                                `}>
                                                {page.description}
                                              </span>
                                            </View>
                                          )}
                                        </Flex>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </View>
                              {section.divider && <Divider orientation="vertical" size="S" marginTop="size-600" />}
                            </React.Fragment>
                          ))}
                        </Flex>
                        {menu.sections[0].viewAll && (
                          <View marginTop="size-100" marginStart="size-200">
                            <Link
                              css={css`
                                text-decoration: none;
                                font-weight: 700;
                              `}
                              href={menu.sections[0].viewAll.path}>
                              {menu.sections[0].viewAll.title}
                            </Link>
                          </View>
                        )}
                      </div>
                    </div>
                  )
                );
              })}
            </Flex>
          </View>
          <View gridArea="navigation" marginStart="size-200">
            <div ref={nav} className="spectrum-Tabs spectrum-Tabs--quiet spectrum-Tabs--horizontal" role="tablist">
              {pages.slice(0, 4).map((page, index) => {
                const { title, path } = page;
                const ref = createRef();
                tabs.push(ref);

                const isActive = ({ isPartiallyCurrent }) =>
                  isPartiallyCurrent
                    ? {
                        'aria-selected': 'true',
                        className: 'is-selected spectrum-Tabs-item'
                      }
                    : { className: 'spectrum-Tabs-item' };

                return (
                  <GatsbyLink role="tab" getProps={isActive} key={index} ref={ref} to={path} partiallyActive={true}>
                    <span className="spectrum-Tabs-itemLabel">{title}</span>
                  </GatsbyLink>
                );
              })}
              <div
                ref={selectedTabIndicator}
                className="spectrum-Tabs-selectionIndicator"
                css={css`
                  bottom: -10px !important;
                  transition-property: transform, width;
                `}></div>
              <View marginStart="size-400">
                {docs.path && (
                  <Button variant="primary" elementType="a" href={docs.path}>
                    View Docs
                  </Button>
                )}
              </View>
            </div>
          </View>
          <View gridArea="console" justifySelf="center">
            {globalNav.console && (
              <Button variant="primary" elementType="a" href="https://console.adobe.io">
                Console
              </Button>
            )}
          </View>
          <View gridArea="profile" justifySelf="center">
            {globalNav.signIn && (
              <Button isQuiet variant="primary" elementType="a" href="https://adobe.io">
                Sign in
              </Button>
            )}
          </View>
        </Grid>
      </nav>
    </header>
  );
};

GlobalHeader.propTypes = {
  globalNav: PropTypes.object,
  pages: PropTypes.array,
  docs: PropTypes.object,
  location: PropTypes.object
};

export { GlobalHeader };
