/*
 * Copyright 2022 Adobe. All rights reserved.
 */
import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import "@spectrum-css/card";
import PropTypes from "prop-types";
import classNames from "classnames";

import { CustomMenuBlock } from '../CustomMenuBlock';
import CustomMenu from '../CustomMenuBlock/customMenu';
import {  DESKTOP_SCREEN_WIDTH,TABLET_SCREEN_WIDTH } from "../../utils";

const MenuWrapperComponent = ({
    theme = 'lightest',
    menuItem = 'subMenuPages',
    className,
    menuClassName,
    contentClassName='use-cases-content',
    content,
    background
  }) => {
  const backgroundColor =background?`background:${background}`:'background: var(--spectrum-global-color-gray-100)';
  const MIN_MOBILE_SCREEN_WIDTH = '375px';
  const MOBILE_SCREEN_WIDTH = '767px';
  const MIN_TABLET_SCREEN_WIDTH = '1023px';
  return (
    <section
      className={classNames(className,`spectrum--${theme}`)}
      css={css`
        ${backgroundColor}
        margin-left: var(--spectrum-global-dimension-size-300);
        margin-top: var(--spectrum-global-dimension-size-550);

        @media screen and (min-width: ${MOBILE_SCREEN_WIDTH}) and (max-width: ${MIN_TABLET_SCREEN_WIDTH}) {
          margin-top:var(--spectrum-global-dimension-size-150);
          width: 84vw;
        }
        @media screen and (max-width: ${TABLET_SCREEN_WIDTH}){
          margin-top: var(--spectrum-global-dimension-size-150) !important;
        }
        @media screen and (min-width: ${TABLET_SCREEN_WIDTH}){
          margin-top: var(--spectrum-global-dimension-size-900);
        }
    `}>
      <div
        id="body-content-wrapper"
        css={css`
          margin-left: var(--spectrum-global-dimension-size-200);

          @media screen and (min-width: ${MOBILE_SCREEN_WIDTH}) {
            margin-left: var(--spectrum-global-dimension-size-160);
          }

          @media screen and (min-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
            margin-left: var(--spectrum-global-dimension-size-0);
          }

           @media screen and (min-width: ${TABLET_SCREEN_WIDTH}){
            display: flex;
           }

          @media only screen and (min-width: ${DESKTOP_SCREEN_WIDTH}) {
            display: flex;
            margin-left: var(--spectrum-global-dimension-size-0);
            margin: var(--spectrum-global-dimension-size-0) auto;
            width:${DESKTOP_SCREEN_WIDTH};
          }
        `}
      >
        <div
          css={css`
            margin-left: var(--spectrum-global-dimension-size-0);
          `}
          className={classNames(menuClassName,`menu-content`)}
        >
          {menuItem === 'subMenuPages' 
          ? <CustomMenuBlock menuItem={menuItem}/>
          : <CustomMenu menuItem={menuItem}/>}
        </div>

        <div
          className={classNames(contentClassName,`page-content`)}
          css={css`
            text-align: initial !important;
            margin-left: var(--spectrum-global-dimension-size-500);

            @media screen and (min-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
              margin: var(--spectrum-global-dimension-size-100) var(--spectrum-global-dimension-size-400) var(--spectrum-global-dimension-size-500);
            }
            @media screen and (min-width: ${MOBILE_SCREEN_WIDTH}) and (max-width: ${MIN_TABLET_SCREEN_WIDTH}) {
              width: 90vw;
            }
          `}>
          {content}
        </div>
      </div>
    </section>
  );
};

MenuWrapperComponent.propTypes = {
  theme: PropTypes.string,
  menuClassName: PropTypes.string,
  menuItem: PropTypes.string,
  contentClassName: PropTypes.string,
  background: PropTypes.string,
  content: PropTypes.object,
};

export { MenuWrapperComponent };
