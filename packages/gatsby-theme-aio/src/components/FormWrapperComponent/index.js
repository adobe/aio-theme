/*
 * Copyright 2022 Adobe. All rights reserved.
*/

import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import "@spectrum-css/card";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MOBILE_SCREEN_WIDTH } from "../../utils";

const FormWrapperComponent = ({
  theme = "lightest",
  className,
  content0,
  content1,
}) => {
  return (
    <section className={classNames(className, `spectrum--${theme}`)}>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
            overflow-x: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            margin-top: var(--spectrum-global-dimension-size-200);
          }
        `}
      >
        <div
          css={css`
            width: 60%;
            margin-top: var(--spectrum-global-dimension-size-400);
            
            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              width: 100% !important;
              background: red !important;
              margin-bottom: var(--spectrum-global-dimension-size-400);
            }
          `}
        >
          {content0}
        </div>
        <div
          css={css`
            width: 40%;
            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              width: 100% !important;
            }
          `}
        >
          {content1}
        </div>
      </div>
    </section>
  );
};

FormWrapperComponent.propTypes = {
  theme: PropTypes.string,
};

export { FormWrapperComponent };
