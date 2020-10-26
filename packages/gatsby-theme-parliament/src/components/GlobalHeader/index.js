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
import nextId from 'react-id-generator';
import { Link as GatsbyLink } from 'gatsby';
import { findSelectedTopPage, rootFix, rootFixPages, getExternalLinkProps, LARGE_SCREEN_WIDTH } from '../../utils';
import { css } from '@emotion/core';
import { Grid, Flex } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';
import { Divider } from '@adobe/react-spectrum';
import { Button } from '@adobe/react-spectrum';
import { Link } from '@adobe/react-spectrum';
import { ButtonGroup } from '@adobe/react-spectrum';
import { Adobe, TripleGripper } from '../Icons';
import { ActionButton, Text } from '../ActionButton';
import { PickerButton } from '../Picker';
import { Menu, Item as MenuItem } from '../Menu';
import { Popover } from '../Popover';
import { Tabs, Item as TabsItem, TabsIndicator, positionIndicator, animateIndicator } from '../Tabs';
import '@spectrum-css/typography';
import '@spectrum-css/assetlist';

const stretched = css`
  height: 100%;
`;

const GlobalHeader = ({ globalNav, versions, pages, docs, location, toggleSideNav, hasSideNav }) => {
  const nav = useRef(null);
  const selectedTabIndicator = useRef(null);
  // Don't animate the tab indicator by default
  const [isAnimated, setIsAnimated] = useState(false);
  const [tabs] = useState([]);
  const primaryPopover = useRef(null);
  const secondaryPopover = useRef(null);
  const versionPopover = useRef(null);
  const versionPopoverId = nextId();
  const [openPrimaryMenu, setOpenPrimaryMenu] = useState(false);
  const [openSecondaryMenu, setOpenSecondaryMenu] = useState(false);
  const [openVersionMenu, setOpenVersionMenu] = useState(false);

  const discoverMenu = globalNav.menus.find((menu) => menu.path);

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
      if (globalNav.menus.length && !globalNav.menus[0].path) {
        if (!primaryPopover.current.contains(event.target)) {
          setOpenPrimaryMenu(false);
        }
      }

      if (globalNav.menus.length > 1) {
        if (!secondaryPopover.current.contains(event.target)) {
          setOpenSecondaryMenu(false);
        }
      }

      if (versions?.length) {
        if (!versionPopover.current.contains(event.target)) {
          setOpenVersionMenu(false);
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
        ${stretched}
        border-bottom: var(--spectrum-global-dimension-size-10) solid var(--spectrum-global-color-gray-200);
        box-sizing: border-box;

        @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
          #GlobalHeader-grid {
            grid-template-columns: minmax(auto, min-content) auto 0 0 !important;
            margin-right: 0 !important;
            margin-left: 0 !important;
            height: calc(100% + var(--spectrum-global-dimension-size-10)) !important;
            overflow: hidden;
          }

          #GlobalHeader-grid-navigation {
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

          #GlobalHeader-title {
            svg {
              margin-right: var(--spectrum-global-dimension-size-100);
            }

            strong {
              display: none;
            }
          }

          #GlobalHeader-grid-optional {
            display: none;
          }
        }
      `}>
      <nav css={stretched} role="navigation" aria-label="Global">
        <Grid
          id="GlobalHeader-grid"
          areas={['title navigation optional']}
          columns={['minmax(auto, min-content)', 'auto', 'size-2400']}
          alignItems="center"
          marginX="size-400"
          height="100%">
          <View gridArea="title" height="100%">
            <Flex height="100%" alignItems="center">
              <Flex alignItems="center">
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
                  href={globalNav.home.path}
                  css={css`
                    text-decoration: none;
                  `}>
                  <Flex alignItems="center" id="GlobalHeader-title">
                    {globalNav.home.logo === 'adobe' ? (
                      <Adobe
                        css={css`
                          width: var(--spectrum-global-dimension-size-300);
                          height: var(--spectrum-global-dimension-size-250);
                          display: block;
                          margin-right: var(--spectrum-global-dimension-size-100);
                        `}
                      />
                    ) : (
                      globalNav.home.logo
                    )}
                    <strong className="spectrum-Heading--XXS">{globalNav.home.title}</strong>
                  </Flex>
                </a>
              </Flex>
              {globalNav.menus.map((menu, index) => {
                const isPrimary = index === 0;
                const id = nextId();

                return (
                  <div
                    key={index}
                    css={css`
                      box-sizing: border-box;
                      padding: var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-300) 0
                        var(--spectrum-global-dimension-size-300);
                      height: calc(100% + var(--spectrum-global-dimension-size-10));
                      border-left: 1px solid transparent;
                      border-right: 1px solid transparent;
                      ${isPrimary
                        ? `
                        margin-left: var(--spectrum-global-dimension-size-300);
                        `
                        : ''}
                      ${globalNav.menus.length === 1
                        ? `
                          border-color: var(--spectrum-global-color-gray-200);
                        `
                        : ''}
                        
                        @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                        display: none;
                      }
                    `}>
                    {menu.path ? (
                      <ActionButton elementType="a" isQuiet href={menu.path} {...getExternalLinkProps(menu.path)}>
                        <Text>{menu.title}</Text>
                      </ActionButton>
                    ) : (
                      <>
                        <PickerButton
                          isQuiet
                          isOpen={isPrimary ? openPrimaryMenu : openSecondaryMenu}
                          ariaControls={id}
                          onClick={(event) => {
                            event.stopPropagation();
                            event.nativeEvent.stopImmediatePropagation();

                            if (isPrimary) {
                              setOpenPrimaryMenu((openPrimaryMenu) => !openPrimaryMenu);
                              setOpenSecondaryMenu(false);
                            } else {
                              setOpenSecondaryMenu((openSecondaryMenu) => !openSecondaryMenu);
                              setOpenPrimaryMenu(false);
                            }

                            setOpenVersionMenu(false);
                          }}>
                          {menu.title}
                        </PickerButton>
                        <Popover
                          ref={isPrimary ? primaryPopover : secondaryPopover}
                          id={id}
                          variant="picker"
                          isQuiet
                          isOpen={isPrimary ? openPrimaryMenu : openSecondaryMenu}
                          css={css`
                            display: block;
                            padding: var(--spectrum-global-dimension-size-300);
                            z-index: 2;
                            max-width: none !important;
                            max-height: none !important;
                            width: auto !important;
                          `}>
                          <nav aria-label="Secondary">
                            <Flex>
                              {menu.sections.map((section, i) => (
                                <View key={i} marginEnd="size-400" position="relative">
                                  <View>
                                    {section.heading && (
                                      <View marginBottom="size-200" marginStart="size-200">
                                        <strong className="spectrum-Heading--S">{section.heading}</strong>
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
                                            min-height: var(--spectrum-global-dimension-size-500) !important;
                                            ${page.description
                                              ? 'margin-bottom: var(--spectrum-global-dimension-size-200);'
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
                                              padding-top: var(--spectrum-global-dimension-size-100);
                                              padding-bottom: var(--spectrum-global-dimension-size-100);
                                            `}
                                            href={page.path}
                                            {...getExternalLinkProps(page.path)}>
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
                                  {section.divider && (
                                    <div
                                      css={css`
                                        position: absolute;
                                        height: 100%;
                                        top: 0;
                                        right: calc(-1 * var(--spectrum-global-dimension-size-200));
                                      `}>
                                      <Divider orientation="vertical" marginStart="size-200" size="M" height="100%" />
                                    </div>
                                  )}
                                </View>
                              ))}
                            </Flex>
                            {menu.sections[0].viewAll && (
                              <View marginTop="size-100" marginStart="size-200">
                                <Link isQuiet={true}>
                                  <a
                                    href={menu.sections[0].viewAll.path}
                                    {...getExternalLinkProps(menu.sections[0].viewAll.path)}>
                                    <strong>{menu.sections[0].viewAll.title}</strong>
                                  </a>
                                </Link>
                              </View>
                            )}
                          </nav>
                        </Popover>
                      </>
                    )}
                  </div>
                );
              })}
            </Flex>
          </View>
          <View
            id="GlobalHeader-grid-navigation"
            gridArea="navigation"
            marginStart={globalNav.menus.length === 1 ? 'size-200' : 'size-0'}>
            <Tabs
              ref={nav}
              onFontsReady={() => {
                positionSelectedTabIndicator();
                setIsAnimated(true);
              }}>
              {discoverMenu && (
                <div
                  css={css`
                    display: none;
                    margin-right: var(--spectrum-global-dimension-size-300);

                    @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                      display: block;
                    }
                  `}>
                  <TabsItem elementType="a" href={discoverMenu.path}>
                    {discoverMenu.title}
                  </TabsItem>
                </div>
              )}
              {pages.map((page, i) => {
                const { title, path } = page;
                const ref = createRef();
                tabs.push(ref);

                return (
                  <React.Fragment key={i}>
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
                            setOpenPrimaryMenu(false);
                            setOpenSecondaryMenu(false);
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
                  </React.Fragment>
                );
              })}
              <TabsIndicator
                ref={selectedTabIndicator}
                css={css`
                  bottom: calc(-1 * var(--spectrum-global-dimension-size-125)) !important;
                `}
              />
              <View marginStart="size-400">
                {docs && (
                  <Button variant="primary" elementType="a" href={docs.path} {...getExternalLinkProps(docs.path)}>
                    View Docs
                  </Button>
                )}
              </View>
            </Tabs>
          </View>
          <View id="GlobalHeader-grid-optional" gridArea="optional" justifySelf="flex-end">
            {(globalNav.console || globalNav.signIn) && (
              <ButtonGroup>
                {globalNav.console && (
                  <Button
                    variant="primary"
                    elementType="a"
                    href="https://console.adobe.io"
                    {...getExternalLinkProps('https://console.adobe.io')}>
                    Console
                  </Button>
                )}
                {globalNav.signIn && (
                  <Button
                    isQuiet
                    variant="primary"
                    elementType="a"
                    href="https://adobe.io"
                    {...getExternalLinkProps('https://adobe.io')}>
                    Sign in
                  </Button>
                )}
              </ButtonGroup>
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
  location: PropTypes.object,
  toggleSideNav: PropTypes.func,
  hasSideNav: PropTypes.bool
};

export { GlobalHeader };
