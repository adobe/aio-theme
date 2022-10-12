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

import React, { cloneElement } from "react";
import { css } from "@emotion/react";
import { HeroButtons } from '../Hero';
import {
  layoutColumns,
  TABLET_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH
} from '../../utils';
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import classNames from "classnames";

import {  DESKTOP_SCREEN_WIDTH } from "../../utils";


const DCSummaryBlock = ({
  className,
  background = "var(--spectrum-global-color-gray-100)",
  theme = "dark",
  heading,
  text,
  buttons,
  buttonPositionRight = false,
  primaryOutline = false,
  isBtnVariant = false,
  btnVariant = "overBackground",
}) => (
  <section
    className={classNames(className, `spectrum--${theme}`)}
    css={css`
      background-color: ${background};
      padding: var(--spectrum-global-dimension-size-400);
      justify-content: center;
    `}
  >
    <div
      css={css`
        box-sizing: border-box;
        max-width: ${DESKTOP_SCREEN_WIDTH};
        height: 100%;
        padding-left: var(--spectrum-global-dimension-size-200);
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: left;
        justify-content: space-between;
        text-align: left;
        @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
          flex-direction: column;
        }
        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          padding-left: var(--spectrum-global-dimension-size-0); !important;
        }
      `}
    >
      <div
        css={css`
          align-items: left;
          text-align: left;

          @media screen and (min-width: ${DESKTOP_SCREEN_WIDTH}) {
            max-width: auto !important;
            max-width: ${layoutColumns(7)};
          }

          @media screen and (min-width: ${MOBILE_SCREEN_WIDTH}) and (max-width: ${TABLET_SCREEN_WIDTH}) {
            max-width: auto !important;
          }

          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
            max-width: auto !important;
          }
        `}
      >
        {heading && (
          <h2
            className="spectrum-Heading spectrum-Heading--sizeL"
            css={css`
              margin-top: 0 !important;
              margin-bottom: var(
                --spectrum-global-dimension-size-200
              ) !important;
            `}
          >
            {heading.props.children}
          </h2>
        )}

        {text &&
          cloneElement(text, {
            className: "spectrum-Body spectrum-Body--sizeL",
            css: css`
              margin-bottom: var(
                --spectrum-global-dimension-size-300
              ) !important;
              color: var(--spectrum-global-color-gray-900);
              margin-top: 0;
            `,
          })}
        {!buttonPositionRight && (
          <HeroButtons buttons={buttons} styles={[isBtnVariant, !primaryOutline]} />
        )}
      </div>
      {buttonPositionRight && (
        <div
          css={css`
            align-self: flex-end;
            margin-right: 5%;
            padding-bottom:var(--spectrum-global-dimension-size-300)

            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              align-self: flex-start;
            }
          `}
        >
          <HeroButtons
            buttons={buttons}
            styles={[isBtnVariant, primaryOutline]}
            variants={[btnVariant, btnVariant]}
          />
        </div>
      )}
    </div>
  </section>
);

DCSummaryBlock.propTypes = {
  background: PropTypes.string,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element,
  buttons: PropTypes.element,
  variant: PropTypes.string,
  theme: PropTypes.string,
  buttonPositionRight: PropTypes.bool,
  isBtnVariant: PropTypes.bool,
  btnVariant: PropTypes.string,
  primaryOutline: PropTypes.bool,
};

export { DCSummaryBlock };
