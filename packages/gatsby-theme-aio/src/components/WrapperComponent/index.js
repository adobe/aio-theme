/*
 * Copyright 2022 Adobe. All rights reserved.
 */
import React from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "@spectrum-css/typography";
import "@spectrum-css/card";

import {  DESKTOP_SCREEN_WIDTH } from "../../utils";

const WrapperComponent = ({ 
  theme = 'lightest',
  className,
  content,
  background,
  enableMaxHeight=false,
  enableMaxWidth=false,
  maxWidth 
}) => {
// Set the default or custom background-color and max-height, max-width of the content wrapper.
const backgroundColor =background?`background:${background}`:'background: var(--spectrum-global-color-gray-100)'
const maxheight = enableMaxHeight?`height:625px !important;`:''
const customWidth = enableMaxWidth ?  `${maxWidth}`: `${DESKTOP_SCREEN_WIDTH}`

  return (
    <section
      className={classNames(className,`spectrum--${theme}`)}
      css={css`
        ${backgroundColor}
        `}>
          <div
          css={css`
            overflow-x:hidden !important;
            @media only screen and (min-width: ${DESKTOP_SCREEN_WIDTH}) {
              ${maxheight}
              margin:auto;
              width: ${customWidth}
            }`
          }>
        {content}
      </div>
    </section>
  );
};

WrapperComponent.propTypes = {
  theme: PropTypes.string,
  content: PropTypes.object,
  background: PropTypes.string,
  enableMaxHeight:PropTypes.bool,
};

export { WrapperComponent };
