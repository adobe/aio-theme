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

import React, { Fragment, useRef, useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';
import { Link as GatsbyLink } from 'gatsby';
import { findSelectedTopPage, rootFix, rootFixPages, getExternalLinkProps, LARGE_SCREEN_WIDTH } from '../../utils';
import { css } from '@emotion/react';
import { AnchorButton } from '../AnchorButton';
import { Adobe, TripleGripper } from '../Icons';
import { ActionButton, Text } from '../ActionButton';
import { PickerButton } from '../Picker';
import { Menu, Item as MenuItem } from '../Menu';
import { Popover } from '../Popover';
import { Tabs, Item as TabsItem, TabsIndicator, positionIndicator, animateIndicator } from '../Tabs';
import '@spectrum-css/typography';
import '@spectrum-css/assetlist';

const GlobalHeader = ({ menu, versions, pages, docs, location, toggleSideNav, hasSideNav }) => {
  const nav = useRef(null);
  const selectedTabIndicator = useRef(null);
  // Don't animate the tab indicator by default
  const [isAnimated, setIsAnimated] = useState(false);
  const [tabs] = useState([]);
  const versionPopover = useRef(null);
  const versionPopoverId = nextId();
  const [openVersionMenu, setOpenVersionMenu] = useState(false);
  const hasMenu = menu || menu === null;

  const getSelectedTabIndex = () => {
    const pathWithRootFix = rootFix(location.pathname);
    const pagesWithRootFix = rootFixPages(pages);

    let selectedTabIndex = pagesWithRootFix.indexOf(findSelectedTopPage(pathWithRootFix, pagesWithRootFix));

    // Assume first tab is selected
    if (selectedTabIndex === -1) {
      selectedTabIndex = 0;
    }

    return selectedTabIndex;
  };

  const positionSelectedTabIndicator = () => {
    const selectedTabIndex = getSelectedTabIndex();
    const selectedTab = tabs.filter((tab) => tab.current)[selectedTabIndex];

    positionIndicator(selectedTabIndicator, selectedTab);
  };

  useEffect(() => {
    animateIndicator(selectedTabIndicator, isAnimated);
    positionSelectedTabIndicator();
  }, [location.pathname]);

  useEffect(() => {
    // Clicking outside of menu should close menu
    const onClick = (event) => {
      if (versions?.length && !versionPopover.current.contains(event.target)) {
        setOpenVersionMenu(false);
      }
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <header
      role="banner"
      css={css`
        height: 100%;
        border-bottom: var(--spectrum-global-dimension-size-10) solid var(--spectrum-global-color-gray-200);
        box-sizing: border-box;
      `}>
      <nav
        css={css`
          height: 100%;
        `}
        role="navigation"
        aria-label="Global">
        <div
          css={css`
            display: grid;
            grid-template-areas: 'title navigation optional';
            grid-template-columns: minmax(auto, min-content) auto minmax(auto, min-content);
            align-items: center;
            margin-left: var(--spectrum-global-dimension-size-400);
            margin-right: var(--spectrum-global-dimension-size-400);
            height: 100%;

            @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
              grid-template-columns: minmax(auto, min-content) auto 0 0;
              margin-right: 0;
              margin-left: 0;
              height: calc(100% + var(--spectrum-global-dimension-size-10));
              overflow: hidden;
            }
          `}>
          <div
            css={css`
              height: 100%;
              grid-area: title;
            `}>
            <div
              css={css`
                display: flex;
                height: 100%;
                align-items: center;
              `}>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}>
                <div
                  css={css`
                    margin-right: var(--spectrum-global-dimension-size-50);
                    display: none;

                    @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                      display: block;
                      visibility: ${hasSideNav ? 'visible' : 'hidden'};
                    }
                  `}>
                  <ActionButton
                    isQuiet
                    onClick={() => {
                      toggleSideNav && toggleSideNav();
                    }}>
                    <TripleGripper />
                  </ActionButton>
                </div>
                <a
                  href="/"
                  css={css`
                    text-decoration: none;
                  `}>
                  <div
                    css={css`
                      display: flex;
                      align-items: center;

                      @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                        svg {
                          margin-right: var(--spectrum-global-dimension-size-100);
                        }

                        strong {
                          display: none;
                        }
                      }
                    `}>
                    <Adobe
                      css={css`
                        width: var(--spectrum-global-dimension-size-300);
                        height: var(--spectrum-global-dimension-size-250);
                        display: block;
                        margin-right: var(--spectrum-global-dimension-size-100);
                      `}
                    />
                    <strong className="spectrum-Heading spectrum-Heading--sizeXXS">Developer</strong>
                  </div>
                </a>
              </div>

              {hasMenu && (
                <div
                  css={css`
                    margin-left: var(--spectrum-global-dimension-size-300);
                    box-sizing: border-box;
                    padding: var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-300) 0
                      var(--spectrum-global-dimension-size-300);
                    height: calc(100% + var(--spectrum-global-dimension-size-10));
                    border-left: 1px solid var(--spectrum-global-color-gray-200);
                    border-right: 1px solid var(--spectrum-global-color-gray-200);

                    @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                      display: none;
                    }
                  `}>
                  <ActionButton elementType="a" isQuiet href="/apis" {...getExternalLinkProps()}>
                    <Text>Discover</Text>
                  </ActionButton>
                </div>
              )}
            </div>
          </div>
          <div
            css={css`
              grid-area: navigation;
              ${hasMenu && 'margin-left: var(--spectrum-global-dimension-size-200);'}

              @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                overflow-x: auto;
                overflow-x: overlay;
                overflow-y: hidden;

                .spectrum-Tabs {
                  padding-bottom: var(--spectrum-global-dimension-size-400);
                  margin-top: var(--spectrum-global-dimension-size-400);

                  ${versions?.length > 0 &&
                  `
                    & > .spectrum-Tabs-item:first-of-type {
                      margin-right: var(--spectrum-global-dimension-size-300);
                    }
                  `}
                }

                .spectrum-Tabs-selectionIndicator {
                  bottom: calc(
                    var(--spectrum-global-dimension-size-400) - var(--spectrum-global-dimension-size-125)
                  ) !important;
                }
              }
            `}>
            <Tabs
              ref={nav}
              onFontsReady={() => {
                positionSelectedTabIndicator();
                setIsAnimated(true);
              }}>
              {hasMenu && (
                <div
                  css={css`
                    display: none;
                    margin-right: var(--spectrum-global-dimension-size-300);

                    @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                      display: block;
                    }
                  `}>
                  <TabsItem elementType="a" href="/apis">
                    Discover
                  </TabsItem>
                </div>
              )}
              {pages.map((page, i) => {
                const { title, path } = page;
                const ref = createRef();
                tabs.push(ref);

                return (
                  <Fragment key={i}>
                    <TabsItem elementType={GatsbyLink} ref={ref} to={path} selected={getSelectedTabIndex() === i}>
                      {title}
                    </TabsItem>
                    {i === 0 && versions?.length > 0 && (
                      <div
                        css={css`
                          margin-left: var(--spectrum-global-dimension-size-100) !important;
                          margin-right: var(--spectrum-global-dimension-size-300);

                          @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                            display: none;
                          }
                        `}>
                        <PickerButton
                          isQuiet
                          isOpen={openVersionMenu}
                          ariaControls={versionPopoverId}
                          onClick={(event) => {
                            event.stopPropagation();
                            event.nativeEvent.stopImmediatePropagation();

                            setOpenVersionMenu((openVersionMenu) => !openVersionMenu);
                          }}>
                          {versions[0].title}
                        </PickerButton>
                        <Popover
                          ref={versionPopover}
                          id={versionPopoverId}
                          variant="picker"
                          isQuiet
                          isOpen={openVersionMenu}>
                          <Menu>
                            {versions.map((version, i) => {
                              const isFirst = i === 0;

                              return (
                                <MenuItem key={i} isSelected={isFirst} isHighlighted={isFirst} href={version.path}>
                                  {version.title}
                                </MenuItem>
                              );
                            })}
                          </Menu>
                        </Popover>
                      </div>
                    )}
                  </Fragment>
                );
              })}
              <TabsIndicator
                ref={selectedTabIndicator}
                css={css`
                  bottom: calc(-1 * var(--spectrum-global-dimension-size-125)) !important;
                `}
              />
              <div
                css={css`
                  margin-left: var(--spectrum-global-dimension-size-400);
                `}>
                {docs && (
                  <AnchorButton variant="primary" href={docs.path}>
                    View Docs
                  </AnchorButton>
                )}
              </div>
            </Tabs>
          </div>
          <div
            css={css`
              grid-area: optional;
              justify-self: flex-end;

              @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                display: none;
              }
            `}>
            <div
              css={css`
                display: flex;
              `}>
              <AnchorButton variant="primary" href="https://console.adobe.io">
                Console
              </AnchorButton>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

GlobalHeader.propTypes = {
  menu: PropTypes.bool,
  pages: PropTypes.array,
  docs: PropTypes.object,
  location: PropTypes.object,
  toggleSideNav: PropTypes.func,
  hasSideNav: PropTypes.bool
};

export { GlobalHeader };
