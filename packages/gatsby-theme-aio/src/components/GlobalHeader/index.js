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

import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';
import { withPrefix } from 'gatsby';
import { GatsbyLink } from '../GatsbyLink';
import {
  findSelectedTopPage,
  findSelectedTopPageMenu,
  rootFix,
  rootFixPages,
  getExternalLinkProps,
  DESKTOP_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
  DEFAULT_HOME,
} from '../../utils';
import { css } from '@emotion/react';
import { AnchorButton } from '../AnchorButton';
import { Button } from '../Button';
import { ProgressCircle } from '../ProgressCircle';
import { Adobe, ChevronDown, Magnify, Close, TripleGripper, CheckMark } from '../Icons';
import { ActionButton, Text as ActionButtonLabel } from '../ActionButton';
import { PickerButton } from '../Picker';
import { Menu, Item as MenuItem } from '../Menu';
import { Popover } from '../Popover';
import { Image } from '../Image';
import { Link } from '../Link';
import {
  Tabs,
  HeaderTabItem as TabsItem,
  Label as TabsItemLabel,
  TabsIndicator,
  positionIndicator,
  animateIndicator,
} from '../Tabs';
import '@spectrum-css/typography';
import '@spectrum-css/assetlist';
import { Divider } from '../Divider';
import DEFAULT_AVATAR from './avatar.svg';

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

const getAvatar = async userId => {
  try {
    const req = await fetch(`https://cc-api-behance.adobe.io/v2/users/${userId}?api_key=SUSI2`);
    const res = await req.json();
    return res?.user?.images?.['138'] ?? DEFAULT_AVATAR;
  } catch (e) {
    console.warn(e);
    return DEFAULT_AVATAR;
  }
};

const GlobalHeader = ({
  hasIMS,
  ims,
  isLoadingIms,
  home,
  versions,
  pages,
  docs,
  location,
  toggleSideNav,
  hasSideNav,
  hasSearch,
  showSearch,
  setShowSearch,
  searchButtonId,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(getSelectedTabIndex(location, pages));
  const tabsRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const selectedTabIndicatorRef = useRef(null);
  // Don't animate the tab indicator by default
  const [isAnimated, setIsAnimated] = useState(false);
  const versionPopoverRef = useRef(null);
  const profilePopoverRef = useRef(null);
  const [openVersion, setOpenVersion] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(-1);
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});

  const POPOVER_ANIMATION_DELAY = 200;
  const versionPopoverId = 'version ' + nextId();
  const profilePopoverId = 'profile ' + nextId();
  const hasHome = home?.hidden !== true;

  const positionSelectedTabIndicator = index => {
    const selectedTab = pages[index].tabRef;

    if (selectedTab?.current) {
      positionIndicator(selectedTabIndicatorRef, selectedTab);
    }
  };

  useEffect(() => {
    const index = getSelectedTabIndex(location, pages);
    setSelectedTabIndex(index);
    const pathWithRootFix = rootFix(location.pathname);
    setSelectedMenuItem(findSelectedTopPageMenu(pathWithRootFix, pages[index]));
    animateIndicator(selectedTabIndicatorRef, isAnimated);
    positionSelectedTabIndicator(index);
  }, [location.pathname]);

  useEffect(() => {
    (async () => {
      if (ims && ims.isSignedInUser()) {
        const profile = await ims.getProfile();
        setProfile(profile);
        setAvatar(await getAvatar(profile.userId));
        setIsLoadingProfile(false);
      } else if (!isLoadingIms) {
        setIsLoadingProfile(false);
      }
    })();
  }, [ims]);

  useEffect(() => {
    if (versionPopoverRef.current) {
      if (openVersion) {
        const { left } = versionPopoverRef.current.getBoundingClientRect();

        versionPopoverRef.current.style.left = `calc(${left}px + var(--spectrum-global-dimension-size-160))`;
        versionPopoverRef.current.style.position = 'fixed';
      } else {
        // Wait for animation to finish
        setTimeout(() => {
          versionPopoverRef.current.style = '';
        }, POPOVER_ANIMATION_DELAY);
      }
    }
  }, [openVersion]);

  useEffect(() => {
    if (openMenuIndex !== -1) {
      const menuRef = pages[openMenuIndex].menuRef;

      const { left } = menuRef.current.getBoundingClientRect();

      menuRef.current.style.left = `${left}px`;
      menuRef.current.style.position = 'fixed';
    } else {
      pages.forEach(page => {
        const menuRef = page.menuRef;
        if (menuRef) {
          // Wait for animation to finish
          setTimeout(() => {
            menuRef.current.style = '';
          }, POPOVER_ANIMATION_DELAY);
        }
      });
    }
  }, [openMenuIndex]);

  useEffect(() => {
    // Clicking outside of menu should close menu
    const onClick = event => {
      if (versionPopoverRef.current && !versionPopoverRef.current.contains(event.target)) {
        setOpenVersion(false);
      }

      if (profilePopoverRef?.current && !profilePopoverRef.current.contains(event.target)) {
        setOpenProfile(false);
      }

      pages.some(page => {
        if (page?.menuRef?.current && !page.menuRef.current.contains(event.target)) {
          setOpenMenuIndex(-1);
        }
      });
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setOpenVersion(false);
      setOpenMenuIndex(-1);
    };

    tabsContainerRef.current.addEventListener('scroll', onScroll, { passive: true });

    return () => tabsContainerRef.current.removeEventListener('scroll', onScroll);
  }, []);

  const openDropDown = data => {
    if (data.isOpen) {
      setOpenMenuIndex(data.index);
      setOpenVersion(data.isOpen);
      if (openMenuIndex === -1 || openMenuIndex !== data.index) {
        setTimeout(() => {
          document.getElementById(`menuIndex${data.index}-0`).focus();
        }, 100);
      }
    }
  };

  const handleCredential = () => {

    const section = document.getElementById('adobe-get-credential');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }

  }

  return (
    <header
      role="banner"
      css={css`
        height: 100%;
        border-bottom: var(--spectrum-global-dimension-size-10) solid
          var(--spectrum-global-color-gray-200);
        box-sizing: border-box;

        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          border-bottom: none;
        }
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
            margin-right: var(--spectrum-global-dimension-size-200);
            height: 100%;

            @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
              grid-template-columns: minmax(auto, min-content) auto 0 0;
              margin-right: 0;
              margin-left: 0;
              height: calc(100% + var(--spectrum-global-dimension-size-10));
              overflow: hidden;
            }
          `}>
          <div
            css={css`
              display: none;

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                grid-area: title;
                display: block;
                margin: 0 var(--spectrum-global-dimension-size-100);
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

          <div
            css={css`
              height: 100%;
              @media screen and (min-width: ${MOBILE_SCREEN_WIDTH}) {
                grid-area: title;
                padding-left: ${!hasSideNav ? 'var(--spectrum-global-dimension-size-200)' : '0'};
              }
              @media screen and (width: 768px ){
                margin-left: 40px;
              }
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
                  height: 100%;
                  align-items: center;
                `}>
                <a
                  href="/"
                  tabIndex={'0'}
                  id="adobeIcon"
                  onKeyDown={e => {
                    if (e.key === 'ArrowRight') {
                      document.getElementById('product').focus();
                    }
                  }}
                  css={css`
                    display: flex;
                    height: 100%;
                    text-decoration: none;
                    padding-left: var(--spectrum-global-dimension-size-400);
                    padding-right: var(--spectrum-global-dimension-size-300);
                    padding-bottom: var(--spectrum-global-dimension-size-25);

                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      padding-left: 0;
                      padding-right: 0;
                    }
                  `}>
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                    `}>
                    <Adobe
                      css={css`
                        width: calc(
                          var(--spectrum-global-dimension-size-250) +
                            var(--spectrum-global-dimension-size-25)
                        );
                        height: var(--spectrum-global-dimension-size-225);
                        display: block;
                        margin-right: var(--spectrum-global-dimension-size-100);
                      `}
                    />
                    <strong
                      className="spectrum-Heading spectrum-Heading--sizeXXS"
                      css={css`
                        color: #fa0f00;
                        font-size: calc(
                          var(--spectrum-global-dimension-size-200) -
                            var(--spectrum-global-dimension-size-10)
                        );
                        font-weight: 700;
                        white-space: nowrap;
                      `}>
                      <span
                        css={css`
                          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                            display: none;
                          }
                        `}>
                        Adobe&nbsp;
                      </span>
                      Developer
                    </strong>
                  </div>
                </a>
              </div>

              {hasHome && (
                <div
                  css={css`
                    height: calc(100% + var(--spectrum-global-dimension-size-10));
                    border-left: var(--spectrum-global-dimension-size-10) solid
                      var(--spectrum-global-color-gray-200);
                    border-right: var(--spectrum-global-dimension-size-10) solid
                      var(--spectrum-global-color-gray-200);

                    @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                      display: none;
                    }
                  `}>
                  <Link isQuiet variant="secondary">
                    <a
                      tabIndex={'0'}
                      id={'product'}
                      // onBlur={()=>setOpenMenuIndex(-1)}
                      onKeyDown={e => {
                        if (e.key === 'ArrowLeft') {
                          document.getElementById('adobeIcon').focus();
                        }
                        if (e.key === 'ArrowRight') {
                          document.getElementById('tabindex0').focus();
                        }
                      }}
                      css={css`
                        display: flex;
                        height: calc(100% - var(--spectrum-global-dimension-size-10));
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        padding: 0 var(--spectrum-global-dimension-size-300);
                        white-space: nowrap;
                        color: var(--spectrum-global-color-gray-700);
                        transition: background-color var(--spectrum-global-animation-duration-100)
                            ease-out,
                          color var(--spectrum-global-animation-duration-100) ease-out;

                        &:hover {
                          background-color: var(--spectrum-global-color-gray-75);
                          color: var(--spectrum-global-color-gray-900);
                          text-decoration: none;
                        }
                      `}
                      href={home?.href || DEFAULT_HOME.href}
                      {...getExternalLinkProps(home?.href || DEFAULT_HOME.href)}>
                      {home?.title || DEFAULT_HOME.title}
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div
            ref={tabsContainerRef}
            css={css`
              grid-area: navigation;
              ${hasHome && 'margin-left: var(--spectrum-global-dimension-size-200);'}

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                ${!hasHome && 'margin-left: var(--spectrum-global-dimension-size-300);'}

                overflow-x: auto;
                overflow-x: overlay;
                overflow-y: hidden;
                -ms-overflow-style: none;
                scrollbar-width: none;

                &::-webkit-scrollbar {
                  display: none;
                }

                margin-right: var(--spectrum-global-dimension-size-3000);
              }

              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                display: none;
                position: absolute;
                top: calc(
                  var(--spectrum-global-dimension-size-600) -
                    var(--spectrum-global-dimension-size-10)
                );
                height: var(--spectrum-global-dimension-size-600);
                left: 0;
                right: 0;
                margin-left: 0;
                margin-right: 0;
                background-color: var(--spectrum-global-color-gray-50);
                border-bottom: var(--spectrum-global-dimension-size-10) solid
                  var(--spectrum-global-color-gray-200);
              }
            `}>
            <div
              css={css`
                display: none;
                @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  display: block;
                  pointer-events: none;
                  position: fixed;
                  top: var(--spectrum-global-dimension-size-600);
                  height: calc(
                    var(--spectrum-global-dimension-size-600) -
                      var(--spectrum-global-dimension-size-25)
                  );
                  right: 0;
                  width: var(--spectrum-global-dimension-size-300);
                  background: -webkit-linear-gradient(0deg, rgba(255, 255, 255, 0), white);
                  z-index: 1;
                }
              `}
            />

            <Tabs
              css={css`
                @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                  padding-bottom: var(--spectrum-global-dimension-size-400);
                  margin-top: var(--spectrum-global-dimension-size-400);
                }

                @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  padding-bottom: 0;
                  margin-top: 0;
                }
              `}
              isHeader={true}
              ref={tabsRef}
              onFontsReady={() => {
                positionSelectedTabIndicator(selectedTabIndex);
                setIsAnimated(true);
              }}>
              {hasHome && (
                <div
                  css={css`
                    display: none;
                    margin-right: var(--spectrum-global-dimension-size-300);

                    @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                      display: block;
                    }
                  `}>
                  <TabsItem
                    elementType={GatsbyLink}
                    to={home?.href || DEFAULT_HOME.href}
                    {...getExternalLinkProps(home?.href || DEFAULT_HOME.href)}>
                    <TabsItemLabel>{home?.title || DEFAULT_HOME.title}</TabsItemLabel>
                  </TabsItem>
                </div>
              )}
              {pages.map((page, i) => {
                const isSelectedTab = selectedTabIndex === i;
                const menuPopoverId = 'menu ' + nextId();
                const setTabRef = element => {
                  page.tabRef = { current: element };
                };

                const setTabMenuRef = element => {
                  page.menuRef = { current: element };
                };

                return (
                  <Fragment key={i}>
                    {page.href ? (
                      <TabsItem
                        className={isSelectedTab ? 'isSelected' : ''}
                        css={css`
                          ${isSelectedTab &&
                          `
                          color: var(--spectrum-global-color-gray-900);
                        `}
                        `}
                        onFocus={() => {
                          setOpenMenuIndex(-1);
                        }}
                        elementType={GatsbyLink}
                        {...getExternalLinkProps(page.href)}
                        ref={setTabRef}
                        id={`tabindex${i}`}
                        to={withPrefix(page.href)}
                        selected={isSelectedTab}>
                        <TabsItemLabel> {page.title} </TabsItemLabel>
                      </TabsItem>
                    ) : (
                      <TabsItem
                        tabIndex={'0'}
                        id={`tabindex${i}`}
                        className={isSelectedTab ? 'isSelected' : ''}
                        //  onFocus={()=>{setOpenMenuIndex(-1)}}
                        index={i}
                        hasDropdown
                        openDropDown={openDropDown}
                        css={css`
                          ${openMenuIndex === i &&
                          `
                          &:after {
                            content: '';
                            position: absolute;
                            z-index: -1;
                            height: var(--spectrum-global-dimension-size-800);
                            width: calc(100% + var(--spectrum-global-dimension-size-250));
                            left: calc(-1 * var(--spectrum-global-dimension-size-125));
                            top: calc(-1 * var(--spectrum-global-dimension-size-100));
                            background-color: var(--spectrum-global-color-gray-100);
                          }
                        `}
                          ${isSelectedTab &&
                          `
                          color: var(--spectrum-global-color-gray-900);
                        `}
                        `}
                        ref={setTabRef}
                        selected={isSelectedTab}
                        aria-controls={menuPopoverId}
                        aria-label={page.title}
                        onClick={event => {
                          event.stopImmediatePropagation();

                          setOpenVersion(false);
                          setOpenProfile(false);
                          setOpenMenuIndex(openMenuIndex === i ? -1 : i);
                        }}>
                        <TabsItemLabel>{page.title}</TabsItemLabel>
                        <ChevronDown
                          css={css`
                            width: var(--spectrum-global-dimension-size-125) !important;
                            height: var(--spectrum-global-dimension-size-125) !important;
                            margin-left: var(--spectrum-global-dimension-size-100);
                            transition: transform var(--spectrum-global-animation-duration-100)
                              ease-in-out;
                            ${openMenuIndex === i && `transform: rotate(-90deg);`}
                          `}
                        />
                        <div
                          onClick={event => {
                            event.stopImmediatePropagation();

                            setOpenVersion(false);
                            setOpenProfile(false);
                            setOpenMenuIndex(openMenuIndex === i ? -1 : i);
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={page.title}
                          onFocus={() => {
                            setOpenMenuIndex(i);
                          }}>
                          <Popover
                            ref={setTabMenuRef}
                            id={menuPopoverId}
                            css={css`
                              margin-left: calc(-1 * var(--spectrum-global-dimension-size-65));
                              margin-top: var(--spectrum-global-dimension-size-25);
                              border-top-left-radius: 0;
                              border-top-right-radius: 0;
                              top: var(--spectrum-global-dimension-size-700);
                              ${page.menu.some(menu => menu.description) &&
                              `width: 230px;`}

                              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                                margin-top: calc(-1 * var(--spectrum-global-dimension-size-40));
                              }
                            `}
                            isOpen={openMenuIndex === i}>
                            <Menu>
                              {page.menu.map((menu, k) => {
                                const pathWithRootFix = rootFix(location.pathname);
                                const selectedMenu = findSelectedTopPageMenu(pathWithRootFix, page);
                                const menuHref = withPrefix(menu.href);
                                return (
                                  <MenuItem
                                    className="spectrum-Link spectrum-Link--quiet"
                                    key={k}
                                    tabIndex="0"
                                    id={`menuIndex${i}-${k}`}
                                    href={menuHref}
                                    {...getExternalLinkProps(menuHref)}
                                    isHighlighted={menu === selectedMenu}
                                    isSelected={menu === selectedMenuItem}
                                    isHeightUnset={menu.description ? true : false}
                                    css={css`
                                      display: -webkit-box;
                                      display: -webkit-flex;
                                      display: -ms-flexbox;
                                      display: flex;
                                      height: calc(
                                        100% - var(--spectrum-global-dimension-size-10)
                                      ) !important;
                                      -webkit-align-items: center;
                                      -webkit-box-align: center;
                                      -ms-flex-align: center;
                                      align-items: center;
                                      -webkit-box-pack: center;
                                      -ms-flex-pack: center;
                                      -webkit-justify-content: center;
                                      justify-content: center;
                                      box-sizing: border-box;
                                      padding: ${selectedMenu !== undefined && "0 var(--spectrum-global-dimension-size-175) !important"};
                                      margin-right: ${selectedMenu === undefined && "var(--spectrum-global-dimension-size-175) !important; "}
                                      white-space: nowrap;
                                      color: var(--spectrum-global-color-gray-700) !important;
                                      -webkit-transition: background-color
                                          var(--spectrum-global-animation-duration-100) ease-out,
                                        color var(--spectrum-global-animation-duration-100) ease-out;
                                      transition: background-color
                                          var(--spectrum-global-animation-duration-100) ease-out,
                                        color var(--spectrum-global-animation-duration-100) ease-out;

                                      &:hover {
                                        background-color: var(
                                          --spectrum-global-color-gray-75
                                        ) !important;
                                        color: var(--spectrum-global-color-gray-900) !important;
                                        text-decoration: none !important;
                                      }

                                      &>div>div{
                                        width:var(--spectrum-global-dimension-size-100) !important;
                                      }

                                      &>div>div>svg{
                                        padding : 0 !important;
                                      }

                                    `}
                                    onKeyDown={e => {
                                      if (e.key === 'ArrowDown') {
                                        e.preventDefault();

                                        if (k + 1 === page.menu.length) {
                                          setTimeout(() => {
                                            setOpenMenuIndex(-1);
                                            if (pages.length === i + 1) {
                                              document.getElementById('getCredentialID').focus();
                                            } else {
                                              document.getElementById(`tabindex${i + 1}`).focus();
                                            }
                                          }, 100);
                                        } else {
                                          e.preventDefault();
                                          e.currentTarget.nextElementSibling &&
                                            e.currentTarget.nextElementSibling.focus();
                                        }
                                      }
                                      if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        var event = e;
                                        if (k === 0) {
                                          setOpenMenuIndex(-1);
                                          setTimeout(() => {
                                            document.getElementById(`tabindex${i}`).focus();
                                          }, 100);
                                        }
                                        event.currentTarget.previousElementSibling &&
                                          e.currentTarget.previousElementSibling.focus();
                                      }
                                      if (e.key === 'ArrowRigt') {
                                        e.preventDefault();
                                        e.currentTarget.nextElementSibling &&
                                          e.currentTarget.nextElementSibling.focus();
                                      }
                                      if (e.key === 'ArrowLeft') {
                                        e.preventDefault();
                                        if (k === 0) {
                                          document.getElementById(`tabindex${i}`).focus();
                                        }
                                        e.currentTarget.previousElementSibling &&
                                          e.currentTarget.previousElementSibling.focus();
                                      }
                                      if (e.key === 'Enter') {
                                        e.currentTarget.focus();
                                      }
                                    }}>
                                    {menu.description ? (
                                      <div
                                        css={css`
                                          margin: var(--spectrum-global-dimension-size-100) 0;
                                        `}>
                                        <div
                                          css={css`
                                            color: var(--spectrum-global-color-gray-900);
                                          `}>
                                          {menu.title}
                                        </div>

                                        <div
                                          className="spectrum-Body spectrum-Body--sizeXS"
                                          css={css`
                                            white-space: normal;
                                            margin-top: var(--spectrum-global-dimension-size-50);
                                          `}>
                                          {menu.description}
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        css={css`
                                          margin-top: var(--spectrum-global-dimension-size-50);
                                          margin-bottom: var(--spectrum-global-dimension-size-50);
                                        `}>
                                        {menu.title}
                                      </div>
                                    )}
                                  </MenuItem>
                                );
                              })}
                            </Menu>
                          </Popover>
                        </div>
                      </TabsItem>
                    )}
                    {i === 0 && versions?.length > 0 && (
                      <div
                        css={css`
                          margin-left: var(--spectrum-global-dimension-size-100) !important;
                          margin-right: var(--spectrum-global-dimension-size-300);
                        `}>
                        <PickerButton
                          isQuiet
                          isOpen={openVersion}
                          aria-controls={versionPopoverId}
                          onClick={event => {
                            event.stopImmediatePropagation();

                            setOpenMenuIndex(-1);
                            setOpenProfile(false);
                            setOpenVersion(open => !open);
                          }}>
                          {versions.find(({ selected }) => selected)?.title}
                        </PickerButton>
                        <Popover
                          ref={versionPopoverRef}
                          id={versionPopoverId}
                          variant="picker"
                          isQuiet
                          isOpen={openVersion}
                          css={css`
                              top: var(--spectrum-global-dimension-size-700);
                           `}>
                          <Menu>
                            {versions.map((version, k) => (
                              <MenuItem
                                key={k}
                                isSelected={version.selected}
                                isHighlighted={version.selected}
                                onClick={() => {
                                  setOpenVersion(false);
                                }}
                                href={version.href}
                                {...getExternalLinkProps(version.href)}>
                                  <div
                                    css={css`
                                      margin-top: var(--spectrum-global-dimension-size-50);
                                      margin-bottom: var(--spectrum-global-dimension-size-50);
                                    `}>
                                        {version.title}
                                  </div>
                              </MenuItem>
                            ))}
                          </Menu>
                        </Popover>
                      </div>
                    )}
                  </Fragment>
                );
              })}
              <TabsIndicator
                ref={selectedTabIndicatorRef}
                css={css`
                  bottom: calc(-1 * var(--spectrum-global-dimension-size-125)) !important;

                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    bottom: 0px !important;
                  }
                `}
              />
              {docs && (
                <div
                  css={css`
                    margin-left: var(--spectrum-global-dimension-size-300);
                    white-space: nowrap;
                  `}>
                  <AnchorButton
                    onFocus={e => {
                      setOpenMenuIndex(-1);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'ArrowLeft') {
                        document.getElementById('tabindex5').focus();
                      }
                    }}
                    id={'getCredentialID'}
                    onClick={handleCredential}
                    variant="primary"
                    href={docs.href && withPrefix(docs.href)}>
                    {docs.title ?? 'View Docs'}
                  </AnchorButton>
                </div>
              )}
            </Tabs>
          </div>
          <div
            css={css`
              grid-area: optional;
              justify-self: flex-end;
            `}>
            <div
              css={css`
                display: flex;
              `}>
              {hasSearch && (
                <ActionButton
                  id={searchButtonId}
                  onClick={() => {
                    setShowSearch(show => !show);
                  }}
                  aria-label={showSearch ? 'Close Search' : 'Search'}
                  isQuiet
                  tabIndex="0"
                  css={css`
                    margin-right: var(--spectrum-global-dimension-size-200);

                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      margin-right: 0;
                    }
                    &:focus {
                      border: 2px solid #007aff !important;
                      border-radius: 15% !important;
                    }
                  `}>
                  {showSearch ? <Close /> : <Magnify />}
                </ActionButton>
              )}
              <div
                css={css`
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    display: none;
                  }
                `}>
                <AnchorButton variant="primary" href="/console" id={'consoleId'} tabIndex="0">
                  Console
                </AnchorButton>
              </div>

              {hasIMS && (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: var(--spectrum-global-dimension-size-200);
                    width: auto;
                    // width: var(--spectrum-global-dimension-size-800);
                  `}>
                  <ProgressCircle size="S" hidden={!isLoadingIms} />

                  <ActionButton
                    css={css`
                      margin-top: calc(-1 * var(--spectrum-global-dimension-size-25));
                      &:focus {
                        border: 2px solid #007aff !important;
                        border-radius: 15% !important;
                        padding-right: 5px;
                      }
                    `}
                    hidden={isLoadingIms || isLoadingProfile || profile}
                    variant="primary"
                    tabIndex="0"
                    isQuiet
                    onClick={() => {
                      ims.signIn();
                    }}>
                    <ActionButtonLabel>Sign in</ActionButtonLabel>
                  </ActionButton>

                  <div hidden={!profile}>
                    <button
                      aria-label="Profile"
                      aria-controls={profilePopoverId}
                      aria-expanded={openProfile}
                      onClick={event => {
                        event.stopImmediatePropagation();

                        setOpenVersion(false);
                        setOpenMenuIndex(-1);
                        setOpenProfile(open => !open);
                      }}
                      css={css`
                        display: block;
                        padding: 0;
                        border: none;
                        width: var(--spectrum-global-dimension-size-400);
                        height: var(--spectrum-global-dimension-size-400);
                        border-radius: var(--spectrum-global-dimension-static-percent-50);
                        background: var(--spectrum-global-color-gray-50);
                        overflow: hidden;
                        cursor: pointer;
                      `}>
                      <Image alt="Avatar" src={avatar} />
                    </button>
                    <Popover
                      id={profilePopoverId}
                      ref={profilePopoverRef}
                      isOpen={openProfile}
                      css={css`
                        width: var(--spectrum-global-dimension-size-3400);
                        max-height: var(--spectrum-global-dimension-size-4600);
                        margin-left: calc(-1 * var(--spectrum-global-dimension-size-3000));
                      `}>
                      <div
                        css={css`
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          flex-direction: column;
                        `}>
                        <div
                          css={css`
                            width: var(--spectrum-global-dimension-size-800);
                            height: var(--spectrum-global-dimension-size-800);
                            border-radius: var(--spectrum-global-dimension-static-percent-50);
                            background: var(--spectrum-global-color-gray-50);
                            overflow: hidden;
                            margin-top: var(--spectrum-global-dimension-size-400);
                            margin-bottom: var(--spectrum-global-dimension-size-200);
                          `}>
                          <Image alt="" src={avatar} />
                        </div>

                        <div
                          className="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
                          css={css`
                            padding: 0 var(--spectrum-global-dimension-size-200);
                            text-align: center;
                          `}>
                          {profile && profile.displayName}
                        </div>

                        <div
                          css={css`
                            margin: var(--spectrum-global-dimension-size-200) 0;
                            padding: 0 var(--spectrum-global-dimension-size-200);
                            box-sizing: border-box;
                            width: 100%;
                          `}>
                          <Divider size="S" />
                        </div>

                        <AnchorButton href="https://account.adobe.com/" variant="primary" isQuiet>
                          Edit Profile
                        </AnchorButton>

                        <Button
                          tabIndex="0"
                          variant="primary"
                          css={css`
                            margin: var(--spectrum-global-dimension-size-200) 0;
                          `}
                          onClick={() => {
                            ims.signOut();
                          }}>
                          Sign out
                        </Button>
                      </div>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

GlobalHeader.propTypes = {
  ims: PropTypes.object,
  isLoadingIms: PropTypes.bool,
  home: PropTypes.object,
  versions: PropTypes.array,
  pages: PropTypes.array,
  docs: PropTypes.object,
  location: PropTypes.object,
  toggleSideNav: PropTypes.func,
  hasSideNav: PropTypes.bool,
  setShowSearch: PropTypes.func,
  hasSearch: PropTypes.bool,
  showSearch: PropTypes.bool,
  searchButtonId: PropTypes.string,
};

export { GlobalHeader };
