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
import PropTypes from "prop-types";
import { css } from '@emotion/react';
import '@spectrum-css/tabs';

import { cloneChildren, MOBILE_SCREEN_WIDTH, TABLET_SCREEN_WIDTH, layoutColumns } from '../../utils';

const positionIndicator = (indicator, selectedTab) => {
  indicator.current.style.transform = `translate(${selectedTab.current.offsetLeft}px, 0px)`;
  indicator.current.style.width = `${selectedTab.current.offsetWidth}px`;
};

const animateIndicator = (indicator, animate) => {
  indicator.current.style.transition = animate ? '' : 'none';
};

const setTabItemIcon = (child, className, iconSize) => {
  if ( child?.props?.children?.props?.mdxType === "img") {
    return <IconImage image={child} className={classNames(className, `spectrum-Icon--spectrum-icon-size-${iconSize}`)}/>;
  }
  return <Icons icon={child} className={classNames(className, `spectrum-Icon--spectrum-icon-size-${iconSize}`)}/>;
};

const setImageLoading = (child) => {
  if (child?.props?.mdxType === "img") {
    return cloneElement(child, {
      loading: "eager"
    });
  }
  return child;
};

const IconImage = ({ image = '', styles=''}) => {
  return (image
    ? cloneElement(image, {
        children: cloneChildren(image.props.children, setImageLoading),
        css: css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          margin-top: 0;

          img {
            display: block;
            object-fit: contain;
          }
          ${styles}
        `,
      })
    : null);
  }

const Icons = ({ icon, styles }) => {
  return(
    icon
      ? cloneElement(icon, {
        css: css`
          height: var(--spectrum-global-dimension-size-600);
          width: var(--spectrum-global-dimension-size-600);
          margin-top: 0;

          img {
            display: block;
            object-fit: contain;
          }
          ${styles}
        `
      })
      : null
  )
}

const Tabs = forwardRef(({
  orientation='horizontal',
  density='regular',
  isQuiet = true,
  children,
  className,
  onFontsReady,
  ...props },
  ref) => {

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
      className={classNames(className, 'spectrum-Tabs', `spectrum-Tabs--${orientation}`, { 'spectrum-Tabs--quiet' : isQuiet }, { 'spectrum-Tabs--compact': density === 'compact' })}
    >
      {children}
    </div>
  );
});

const Item = forwardRef(({
  elementType = 'div',
  isDisabled=false,
  isSelected=false,
  className,
  children,
  icon,
  label,
  ...props }, ref
) => {
  const Element = elementType;
  return (
    <Element
      {...props}
      ref={ref}
      role="tab"
      aria-selected={isSelected ? true : false}
      disabled={isDisabled ? true : false}
      className={classNames(className, 'spectrum-Tabs-item', { 'is-selected': isSelected }, { 'is-disabled': isDisabled })}>
      {icon ? <TabItemIcon icon={icon} isSelected={isSelected} isDisabled={isDisabled}></TabItemIcon> : null }
      {label ? <Label> {label} </Label>: null}
      {children}
    </Element>
  );
});

const TabItemIcon = forwardRef(({
  elementType = 'div',
  icon,
  isSelected,
  isDisabled,
  className,
  children,
  iconSize='xl',
  ...props }, ref) => {
  const Element = elementType;
  return (
    <Element
      {...props}
      ref={ref}
      className={classNames(className, 'spectrum-Icon', { 'is-selected': isSelected }, { 'is-disabled ': isDisabled })}
      css={css`
        height: var(--spectrum-global-dimension-size-600);
        width: var(--spectrum-global-dimension-size-550);
        z-index: 1;
      `}
      >
      {icon ? setTabItemIcon(icon, className, iconSize) : null}
    </Element>
  );
});

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
    <Element
      {...props}
      ref={ref}
      role="tabview"
      hidden={isHidden}
      className={classNames(className)}>
      {children}
    </Element>
  );
});

const TabsBlock = ({
  theme='light',
  orientation='horizontal',
  className,
  ...props
}) => {

  const [tabs] = useState([]);
  const selectedTabIndicator = useRef(null);
   const [selectedIndex, setSelectedIndex] = useState({
    tab: 0,
  });

  const propKeys = Object.keys(props);
  let filteredMenuProps = propKeys.filter((key) => key.startsWith("heading")).map(menu=>menu);

  let menuItems = filteredMenuProps.map((_, index) => {
    return {
      heading: props?.[`heading${index}`]?.props?.children || props?.[`heading`],
      tabViewContent: props?.[`tabViewContent${index}`] ||  props?.[`tabViewContent`],
      image: props?.[`image${index}`] || props?.[`image`]
    };
  });

  const positionSelectedTabIndicator = (index = selectedIndex.tab) => {
    const selectedTab = tabs.filter((tab) => tab?.current)[index];
    positionIndicator(selectedTabIndicator, selectedTab);
  };

  return (
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        width: 100%;
        padding: var(--spectrum-global-dimension-size-600) 0
        var(--spectrum-global-dimension-size-200) 0;
      `}
      >
      <div
        css={css`
          display: ${orientation === 'vertical' ? 'inline-flex': ''};
          @media only screen and (max-width: 480px) {
            flex-direction: column;
          }
        `}
      >
        {menuItems?.length > 0 ?
          <Tabs
            orientation={orientation}
            isQuiet={true}
            onFontsReady={positionSelectedTabIndicator}
          >
            {menuItems.map((data, index) => {
              const ref = createRef();
              tabs.push(ref);
              const isSelected = selectedIndex.tab === index;
              return (
                <Item
                  className={"tabItem"}
                  key={`tabItem_${index}`}
                  tabIndex={0}
                  ref={ref}
                  isSelected={isSelected}
                  label={<b>{data['heading']}</b>}
                  icon={data['image']}
                  onClick={() => {
                    setSelectedIndex({
                      tab: index,
                    });
                    positionSelectedTabIndicator(index);
                  }}
                  css={css`
                    text-align: left;
                    white-space: normal;
                    display: flex !important;
                    height: auto !important;
                    padding: var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-250) !important;
                    margin-bottom: var(--spectrum-global-dimension-size-350) !important;
                    width:${layoutColumns(3)} !important;
                    .spectrum-Tabs-itemLabel{
                      font-size:var(--spectrum-global-dimension-size-185);
                      font-weight:bold;
                      margin-left: var(--spectrum-global-dimension-size-200);
                      line-height: initial;
                      margin-top:var(--spectrum-global-dimension-size-100);
                    }

                    .spectrum-Icon{
                      width: 40px;
                      height: 40px;
                    }

                    @media only screen and (max-width: 480px) {
                      max-width: ${layoutColumns(2.5)} !important;
                      justify-content: left;
                      margin-bottom: var(--spectrum-global-dimension-size-150) !important;

                      .spectrum-Tabs-itemLabel{
                        margin-top:var(--spectrum-global-dimension-size-50) !important;
                      }
                    }

                    @media only screen and (device-width: ${TABLET_SCREEN_WIDTH}) {
                      max-width: ${layoutColumns(2)} !important;
                    }
                    @media only screen and (device-width: ${MOBILE_SCREEN_WIDTH}) {
                      max-width: ${layoutColumns(2)} !important;
                    }
                    &.is-disabled {
                      pointer-events:none;
                    }
                    &:hover, &.is-selected {
                        background-color: var(--spectrum-alias-background-color-gray-50, var(--spectrum-global-color-gray-50, var(--spectrum-semantic-gray-50-color-background)));
                        color: var(--spectrum-global-color-gray-900);
                        box-shadow: 0 3px 16px #46303029;
                        border-radius: var(--spectrum-global-dimension-size-50);
                    }
                    img {
                      max-width: var(--spectrum-global-dimension-size-500);
                      max-height: var(--spectrum-global-dimension-size-500);
                    }
                  `}
                />
              )
            })}
            <TabsIndicator ref={selectedTabIndicator} />
          </Tabs>
        : null}
        {menuItems?.length > 0 ?
          menuItems.map((data, index) => {
            const isHidden = selectedIndex.tab === index;
            return(
              <TabView
                key={`tabView_${index}`}
                className={"tabView"}
                isHidden={!isHidden}
                css={css`
                  text-align: left;
                  width:${layoutColumns(8)};
                  padding-left:var(--spectrum-global-dimension-size-700);
                  padding-right:var(--spectrum-global-dimension-size-200);

                  @media only screen and (max-width: 480px) {
                    padding-left: inherit !important;
                    max-width: ${layoutColumns(3)} !important;
                  }

                  @media only screen and (device-width: ${MOBILE_SCREEN_WIDTH}) {
                    max-width: ${layoutColumns(3.5)} !important;
                  }
                  @media only screen and (device-width: ${TABLET_SCREEN_WIDTH}) {
                    max-width: ${layoutColumns(6.5)} !important;
                    padding-left:var(--spectrum-global-dimension-size-500);
                  }

                `}

              >
                {data['tabViewContent'] ? data['tabViewContent'] : null}
              </TabView>
            )
          })
        : null}
      </div>
    </section>
  )
}


Tabs.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  density: PropTypes.oneOf(["regular", "compact"]),
  isQuiet: PropTypes.boolean,
  className: PropTypes.string,
};

Item.propTypes = {
  isSelected: PropTypes.boolean,
  isDisabled: PropTypes.boolean,
  className: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.object
};

TabItemIcon.propTypes = {
  elementType: PropTypes.string,
  icon: PropTypes.element,
  isSelected: PropTypes.boolean,
  isDisabled: PropTypes.boolean,
  iconSize: PropTypes.string,
  className: PropTypes.string
};

TabView.propTypes = {
  isHidden: PropTypes.boolean,
  className: PropTypes.string
};

TabsBlock.propTypes = {
  theme: PropTypes.oneOf(["light", "dark", "lightest"]),
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  heading: PropTypes.string,
  tabViewContent: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string
};


export { Tabs, Item, TabView, TabItemIcon, Label, TabsIndicator, positionIndicator, animateIndicator, TabsBlock };
