/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { useEffect, useState, useRef, createRef, forwardRef, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import '@spectrum-css/tabs';
import nextId from 'react-id-generator';

import {
  cloneChildren,
  MOBILE_SCREEN_WIDTH,
  DESKTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  layoutColumns
} from '../../utils';

const positionIndicator = (indicator, selectedTab) => {
  indicator.current.style.transform = `translate(${selectedTab.current.offsetLeft}px, 0px)`;
  indicator.current.style.width = `${selectedTab.current.offsetWidth}px`;
};

const animateIndicator = (indicator, animate) => {
  indicator.current.style.transition = animate ? '' : 'none';
};

const setTabItemIcon = (child, className, iconSize) => {
  if (child?.props?.children?.props?.mdxType === 'img') {
    return (
      <IconImage image={child} className={classNames(className, `spectrum-Icon--spectrum-icon-size-${iconSize}`)} />
    );
  }
  return <Icons icon={child} className={classNames(className, `spectrum-Icon--spectrum-icon-size-${iconSize}`)} />;
};

const mobileMinWidth = '480px';

const setImageLoading = (child) => {
  if (child?.props?.mdxType === 'img') {
    return cloneElement(child, {
      loading: 'eager'
    });
  }
  return child;
};

const IconImage = ({ image = '', styles = '' }) => {
  return image
    ? cloneElement(image, {
        children: cloneChildren(image.props.children, setImageLoading),
        css: css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          margin-top: var(--spectrum-global-dimension-size-0);

          img {
            display: block;
            object-fit: contain;
          }
          ${styles}
        `
      })
    : null;
};

const Icons = ({ icon, styles }) => {
  return icon
    ? cloneElement(icon, {
        alt: '',
        css: css`
          height: var(--spectrum-global-dimension-size-600);
          width: var(--spectrum-global-dimension-size-600);
          margin-top: var(--spectrum-global-dimension-size-0);

          img {
            display: block;
            object-fit: contain;
          }
          ${styles}
        `
      })
    : null;
};

const Tabs = forwardRef(
  ({ orientation = 'horizontal', isQuiet = true, children, className, onFontsReady, ...props }, ref) => {
    useEffect(() => {
      // Font affects positioning of the Tab indicator
      document.fonts.ready.then(() => {
        onFontsReady && onFontsReady();
      });
    }, [onFontsReady]);

    return (
      <div
        ref={ref}
        {...props}
        role="tablist"
        aria-orientation={orientation}
        className={classNames(className, 'spectrum-Tabs', `spectrum-Tabs--${orientation}`, {
          'spectrum-Tabs--quiet': isQuiet
        })}>
        {children}
      </div>
    );
  }
);

const Item = forwardRef(
  ({ elementType = 'div', isSelected = false, className, children, icon, label, ...props }, ref) => {
    const Element = elementType;
    const id = nextId();
    return (
      <Element
        {...props}
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-controls={id}
        className={classNames(className, 'spectrum-Tabs-item', { 'is-selected': isSelected })}>
        {icon ? <TabItemIcon icon={icon} isSelected={isSelected}></TabItemIcon> : null}
        {label ? <Label> {label} </Label> : null}
        {children}
      </Element>
    );
  }
);

const TabItemIcon = forwardRef(
  ({ elementType = 'div', icon, isSelected, className, children, iconSize = 'xl', ...props }, ref) => {
    const Element = elementType;
    return (
      <Element
        {...props}
        ref={ref}
        className={classNames(className, 'spectrum-Icon', { 'is-selected': isSelected })}
        css={css`
          height: var(--spectrum-global-dimension-size-600);
          width: var(--spectrum-global-dimension-size-550);
          z-index: 1;
        `}>
        {icon ? setTabItemIcon(icon, className, iconSize) : null}
      </Element>
    );
  }
);

const TabsIndicator = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={classNames(className, 'spectrum-Tabs-selectionIndicator')}
      css={css`
        transition-property: transform, width;
      `}></div>
  );
});

const Label = ({ children }) => <span className="spectrum-Tabs-itemLabel">{children}</span>;

const TabView = forwardRef(({ elementType = 'div', isHidden, className, children, ...props }, ref) => {
  const Element = elementType;
  return (
    <Element {...props} ref={ref} hidden={isHidden} className={classNames(className)}>
      {children}
    </Element>
  );
});

const TabsBlock = ({ theme = 'light', orientation = 'horizontal', className, ...props }) => {
  const [tabs] = useState([]);
  const selectedTabIndicator = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState({
    tab: 0
  });

  const propKeys = Object.keys(props);
  let filteredMenuProps = propKeys.filter((key) => key.startsWith('heading')).map((menu) => menu);

  let menuItems = filteredMenuProps.map((_, index) => {
    return {
      heading: props?.[`heading${index}`]?.props?.children || props?.[`heading`],
      content: props?.[`content${index}`] || props?.[`content`],
      image: props?.[`image${index}`] || props?.[`image`]
    };
  });

  const positionSelectedTabIndicator = (index = selectedIndex.tab) => {
    const selectedTab = tabs.filter((tab) => tab?.current)[index];
    positionIndicator(selectedTabIndicator, selectedTab);
  };

  const handleOnChange = (index) => {
    setSelectedIndex({
      tab: index
    });
    positionSelectedTabIndicator(index);
  };

  return (
    <section
      className={classNames(className, `tabsBlock spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        width: 100%;
        overflow: hidden !important;
        margin: 0;
        padding-bottom: calc(var(--spectrum-global-dimension-size-1250) + var(--spectrum-global-dimension-size-250));
      `}>
      <div
        css={css`
          display: ${orientation === 'vertical' ? 'inline-flex' : ''};
          @media only screen and (min-width: ${TABLET_SCREEN_WIDTH}) {
            margin: 0 auto !important;
          }
          @media only screen and (max-width: ${mobileMinWidth}) {
            flex-direction: column;
          }
        `}>
        <div
          css={css`
            display: ${orientation === 'vertical' ? 'grid' : 'block'};
            position: relative;
            grid-template-columns: 300px calc(100% - 300px);
            margin-top: ${orientation === 'vertical' ? 'var(--spectrum-global-dimension-size-300)' : ''};
            width: inherit;
            @media only screen and (max-width: ${mobileMinWidth}) {
              display: block !important;
              width: ${layoutColumns(2.5)} !important;
            }
            @media only screen and (device-width: ${MOBILE_SCREEN_WIDTH}) {
              width: ${layoutColumns(6.4)} !important;
            }
            @media only screen and (device-width: ${TABLET_SCREEN_WIDTH}) {
              width: ${layoutColumns(8)} !important;
            }
          `}>
          {menuItems?.length > 0 ? (
            <Tabs orientation={orientation} isQuiet={true} onFontsReady={positionSelectedTabIndicator}>
              {menuItems.map((data, index) => {
                const ref = createRef();
                tabs.push(ref);
                const isSelected = selectedIndex.tab === index;
                return (
                  <Item
                    className={'tabItem'}
                    key={`tabItem_${index}`}
                    id={`tabItem_${index}`}
                    ref={ref}
                    isSelected={isSelected}
                    aria-controls={`tabView${index}`}
                    tabIndex={index === selectedIndex.tab ? 0 : -1}
                    aria-label={data['heading']}
                    aria-selected={index === selectedIndex.tab}
                    label={<b>{data['heading']}</b>}
                    icon={data['image']}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'Enter') {
                        e.currentTarget.nextSibling && e.currentTarget.nextSibling.focus();
                      }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.currentTarget.previousSibling && e.currentTarget.previousSibling.focus();
                      }
                    }}
                    onFocus={() => {
                      handleOnChange(index);
                    }}
                    onClick={() => {
                      handleOnChange(index);
                    }}
                    css={css`
                      text-align: left;
                      white-space: normal;
                      width: ${orientation === 'vertical'
                        ? 'calc(var(--spectrum-global-dimension-size-2000) + var(--spectrum-global-dimension-size-600))'
                        : 'calc(var(--spectrum-global-dimension-static-grid-fixed-max-width) / var(--spectrum-global-dimension-static-grid-columns))'} !important;
                      font-size: var(--spectrum-global-dimension-size-200);
                      margin-bottom: ${orientation === 'vertical' ? '2.4rem !important' : '0rem'};
                      display: flex !important;
                      padding: var(--spectrum-global-dimension-size-125) !important;
                      height: auto !important;
                      line-height: initial;

                      .spectrum-Tabs-itemLabel {
                        margin-top: 5px;
                        margin-bottom: 5px;
                      }
                      .spectrum-Icon {
                        background-size: var(--spectrum-global-dimension-size-225)
                          var(--spectrum-global-dimension-size-275);
                        width: var(--spectrum-global-dimension-size-500);
                        height: var(--spectrum-global-dimension-size-400);
                      }

                      &.is-disabled {
                        pointer-events: none;
                      }
                      &::before {
                        left: var(--spectrum-global-dimension-size-0) !important;
                        right: var(--spectrum-global-dimension-size-0) !important;
                      }
                      @media only screen and (max-width: ${mobileMinWidth}) {
                        margin-top: var(--spectrum-global-dimension-size-25) !important;
                        margin-bottom: var(--spectrum-global-dimension-size-25) !important;
                      }
                      @media only screen and (min-width: ${TABLET_SCREEN_WIDTH}) {
                        left: var(--spectrum-global-dimension-size-250) !important;
                      }
                    `}
                  />
                );
              })}
              <TabsIndicator ref={selectedTabIndicator} />
            </Tabs>
          ) : null}
          {menuItems?.length > 0
            ? menuItems.map((data, index) => {
                const isHidden = selectedIndex.tab === index;
                return (
                  <TabView
                    key={`tabView_${index}`}
                    className={'tabView'}
                    isHidden={!isHidden}
                    css={css`
                      text-align: left;
                      max-width: 100% !important;
                      padding: ${orientation === 'vertical' ? '' : `${layoutColumns(0.125)} ${layoutColumns(0.25)}`};
                      @media only screen and (max-width: ${mobileMinWidth}) {
                        padding-left: inherit !important;
                        max-width: ${layoutColumns(3)} !important;
                      }

                      @media only screen and (device-width: ${MOBILE_SCREEN_WIDTH}) {
                        max-width: ${layoutColumns(3.5)} !important;
                      }
                      @media only screen and (device-width: ${TABLET_SCREEN_WIDTH}) {
                        max-width: ${layoutColumns(6.5)} !important;
                        padding-left: var(--spectrum-global-dimension-size-500);
                      }
                    `}>
                    {data['content'] ? data['content'] : null}
                  </TabView>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
};

Tabs.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  isQuiet: PropTypes.boolean,
  className: PropTypes.string
};

Item.propTypes = {
  isSelected: PropTypes.boolean,
  className: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.object
};

TabItemIcon.propTypes = {
  elementType: PropTypes.string,
  icon: PropTypes.element,
  isSelected: PropTypes.boolean,
  iconSize: PropTypes.string,
  className: PropTypes.string
};

TabView.propTypes = {
  isHidden: PropTypes.boolean,
  className: PropTypes.string
};

TabsBlock.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark', 'lightest']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  heading: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string
};

export { Tabs, Item, TabView, TabItemIcon, Label, TabsIndicator, positionIndicator, animateIndicator, TabsBlock };
