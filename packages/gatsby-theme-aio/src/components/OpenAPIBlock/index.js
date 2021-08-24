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

import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { withPrefix } from 'gatsby';
import { ProgressCircle } from '../ProgressCircle';
import { RedocStandalone } from 'redoc';
import { Footer } from '../Footer';
import { SIDENAV_WIDTH, MOBILE_SCREEN_WIDTH, isExternalLink } from '../../utils';
import PropTypes from 'prop-types';

const OpenAPIBlock = ({ src }) => {
  const [showProgress, setShowProgress] = useState(true);

  let input = {};
  if (isExternalLink(src)) {
    input.specUrl = src;
  } else {
    input.spec = withPrefix(src);
  }

  useEffect(() => {
    if (!showProgress) {
      setShowProgress(true);
    }
  }, [src]);

  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: ${showProgress ? 'grid' : 'none'};
          place-items: center center;
        `}>
        <ProgressCircle size="L" />
      </div>

      <div
        hidden={showProgress}
        css={css`
          height: calc(100% - var(--spectrum-global-dimension-size-800));
        `}>
        <div
          css={css`
            & {
              [role='navigation'] {
                padding: var(--spectrum-global-dimension-static-size-400);

                label span[type] {
                  text-transform: uppercase;
                  border-radius: var(--spectrum-global-dimension-size-50);
                  font-size: var(--spectrum-global-dimension-size-100);
                  margin-right: var(--spectrum-global-dimension-size-100);
                  padding: var(--spectrum-global-dimension-size-50) var(--spectrum-global-dimension-size-125);
                  background-color: inherit;
                  width: var(--spectrum-global-dimension-size-700);
                  height: var(--spectrum-global-dimension-size-1);
                }

                label span[type='get'] {
                  border: 2px solid var(--spectrum-global-color-blue-400);
                  color: var(--spectrum-global-color-blue-400);
                }

                label span[type='patch'] {
                  border: 2px solid var(--spectrum-global-color-seafoam-400);
                  color: var(--spectrum-global-color-seafoam-400);
                }

                label span[type='post'] {
                  border: 2px solid var(--spectrum-global-color-green-400);
                  color: var(--spectrum-global-color-green-400);
                }

                label span[type='put'] {
                  border: 2px solid var(--spectrum-global-color-orange-400);
                  color: var(--spectrum-global-color-orange-400);
                }

                label span[type='head'] {
                  border: 2px solid var(--spectrum-global-color-fuchsia-400);
                  color: var(--spectrum-global-color-fuchsia-400);
                }

                label span[type='delete'] {
                  border: 2px solid var(--spectrum-global-color-red-400);
                  color: var(--spectrum-global-color-red-400);
                }

                [role='menuitem'] {
                  position: relative;
                  display: inline-flex;
                  align-items: center;
                  justify-content: left;
                  box-sizing: border-box;
                  margin-top: var(--spectrum-global-dimension-size-50);
                  margin-bottom: var(--spectrum-global-dimension-size-50);
                  width: 100%;
                  color: var(--spectrum-alias-text-color);
                  min-height: var(--spectrum-alias-single-line-height);
                  padding-left: var(--spectrum-global-dimension-size-150);
                  padding-right: var(--spectrum-global-dimension-size-150);
                  padding-top: var(--spectrum-global-dimension-size-65);
                  padding-bottom: var(--spectrum-global-dimension-size-65);
                  border-radius: var(--spectrum-alias-border-radius-regular);
                  font-size: var(--spectrum-alias-font-size-default);
                  font-family: adobe-clean, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                    Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif;
                  font-style: normal;
                  text-decoration: none;
                  word-break: break-word;
                  hyphens: auto;
                  cursor: pointer;
                  transition: background-color var(--spectrum-global-animation-duration-100) ease-out,
                    color var(--spectrum-global-animation-duration-100) ease-out;

                  &:hover {
                    background-color: var(--spectrum-alias-highlight-hover);
                    color: var(--spectrum-alias-text-color-hover);
                  }

                  svg {
                    display: none;
                  }
                }

                & > li > [role='menuitem'] {
                  font-weight: var(--spectrum-global-font-weight-bold);
                }

                & + div {
                  display: none;
                }
              }

              .menu-content + div {
                display: none;
              }

              .api-info {
                h1 {
                  font-weight: var(--spectrum-global-font-weight-light) !important;
                  font-size: var(--spectrum-alias-heading-xl-text-size) !important;
                  line-height: var(--spectrum-alias-heading-text-line-height) !important;
                  font-style: var(--spectrum-global-font-style-regular) !important;
                  letter-spacing: var(--spectrum-global-font-letter-spacing-none) !important;
                  color: var(--spectrum-alias-heading-text-color) !important;
                  margin-bottom: var(--spectrum-global-dimension-size-350) !important;

                  span {
                    font-size: var(--spectrum-alias-font-size-default) !important;
                  }
                }

                h1 span {
                  float: right;
                  line-height: 36px;
                }

                p,
                ul,
                a,
                span {
                  font-size: var(--spectrum-global-dimension-font-size-300);
                  font-weight: var(--spectrum-alias-body-text-font-weight);
                  line-height: var(--spectrum-alias-body-text-line-height);
                  font-style: var(--spectrum-global-font-style-regular);
                  letter-spacing: var(--spectrum-global-font-letter-spacing-none);
                  text-transform: var(--spectrum-body-l-text-transform, none);
                }
              }

              .api-content {
                width: calc(100vw - ${SIDENAV_WIDTH});

                @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  width: 100vw;
                }

                & > div[data-section-id] {
                  padding: var(--spectrum-global-dimension-size-300) 0;

                  &:after {
                    display: none;
                  }

                  & > div > div + div {
                    margin-top: 24px;
                  }
                }

                h1 {
                  font-size: var(--spectrum-alias-heading-xl-text-size);
                  font-weight: var(--spectrum-alias-heading-text-font-weight-regular);
                  line-height: var(--spectrum-alias-heading-text-line-height);
                  font-style: var(--spectrum-global-font-style-regular);
                  letter-spacing: var(--spectrum-global-font-letter-spacing-none);
                  text-transform: none;
                  color: var(--spectrum-alias-heading-text-color);
                }

                .redoc-markdown {
                  font-size: var(--spectrum-global-dimension-size-225);
                }

                h2 {
                  position: relative;
                  font-family: var(--spectrum-global-font-family-base);
                  font-size: var(--spectrum-alias-heading-l-text-size);
                  font-weight: var(--spectrum-alias-heading-text-font-weight-regular);
                  line-height: var(--spectrum-alias-heading-text-line-height);
                  font-style: var(--spectrum-global-font-style-regular);
                  letter-spacing: var(--spectrum-global-font-letter-spacing-none);
                  color: var(--spectrum-alias-heading-text-color);
                  margin-top: var(--spectrum-alias-heading-l-margin-top);
                  margin-bottom: var(--spectrum-global-dimension-size-400);

                  &:after {
                    content: '';
                    border-radius: var(--spectrum-global-dimension-static-size-25);
                    background-color: var(--spectrum-alias-heading-text-color);
                    height: var(--spectrum-global-dimension-static-size-50);
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: calc(-1 * var(--spectrum-global-dimension-static-size-100));
                  }

                  ~ div {
                    p,
                    ul {
                      font-size: var(--spectrum-global-dimension-font-size-200);
                      font-weight: var(--spectrum-alias-body-text-font-weight);
                      line-height: var(--spectrum-alias-body-text-line-height);
                      font-style: var(--spectrum-global-font-style-regular);
                      letter-spacing: var(--spectrum-global-font-letter-spacing-none);
                      text-transform: none;
                    }
                  }
                }

                h3,
                h5 {
                  font-size: var(--spectrum-global-dimension-font-size-200);
                  font-weight: var(--spectrum-global-font-weight-bold);
                  line-height: var(--spectrum-alias-body-text-line-height);
                  font-style: var(--spectrum-global-font-style-regular);
                  letter-spacing: var(--spectrum-global-font-letter-spacing-none);
                  text-transform: none;
                  border-bottom: 0px;
                }

                h5 {
                  color: var(--spectrum-alias-text-color);
                }

                a[href] {
                  color: var(--spectrum-global-color-blue-600);

                  &:hover {
                    text-decoration: underline;
                  }
                }

                td {
                  color: var(--spectrum-alias-text-color);
                  background-color: var(--spectrum-alias-background-color-transparent);
                  font-size: var(--spectrum-alias-font-size-default);
                  font-weight: var(--spectrum-global-font-weight-regular);
                  border-color: var(--spectrum-global-color-gray-300);

                  * {
                    color: var(--spectrum-alias-text-color) !important;
                  }

                  .HIPAN {
                    background: var(--spectrum-global-color-static-white);
                  }
                }

                td[kind='field'] span {
                  &::before,
                  &::after {
                    background: var(--spectrum-global-color-gray-300);
                  }
                }

                tr:first-child td[kind='field'] {
                  background-image: linear-gradient(
                    to bottom,
                    transparent 0%,
                    transparent 22px,
                    var(--spectrum-global-color-gray-300) 22px,
                    var(--spectrum-global-color-gray-300) 100%
                  );
                }

                tr.last td[kind='field'] {
                  background-image: linear-gradient(
                    to bottom,
                    var(--spectrum-global-color-gray-300) 0%,
                    var(--spectrum-global-color-gray-300) 22px,
                    transparent 22px,
                    transparent 100%
                  );
                }

                tr.last:first-child td[kind='field'] {
                  background: none;
                }
              }

              span > span {
                border-radius: 2px;
                background-color: rgba(51, 51, 51, 0.05);
                color: rgba(51, 51, 51, 0.9);
              }

              a[href^='#'] {
                text-decoration: none;

                &:before {
                  content: '#';
                  background: none;
                  height: auto;
                  width: auto;
                  opacity: 1;
                  transition: opacity var(--spectrum-global-animation-duration-100) ease-in-out;
                }

                &:hover {
                  text-decoration: underline;

                  &:before {
                    opacity: 1;
                  }
                }
              }

              [role='button'].dropdown {
                .dropdown-selector-value {
                  color: var(--spectrum-alias-text-color) !important;
                }

                .dropdown-arrow {
                  border-color: var(--spectrum-alias-text-color) transparent transparent !important;
                }
              }

              pre {
                border-radius: var(--spectrum-global-dimension-static-size-50) !important;
              }

              .redoc-json code {
                border-radius: var(--spectrum-global-dimension-static-size-50) !important;
                font-size: var(--spectrum-alias-font-size-default) !important;
                font-weight: var(--spectrum-alias-code-text-font-weight-regular) !important;
                line-height: var(--spectrum-alias-code-text-line-height) !important;
                font-style: var(--spectrum-global-font-style-regular) !important;
                letter-spacing: var(--spectrum-global-font-letter-spacing-none) !important;
                font-family: var(--spectrum-alias-code-text-font-family) !important;
              }

              code[class*='language-'],
              pre[class*='language-'] {
                color: rgb(227, 227, 227);
                background: none;
                font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
                font-size: 1em !important;
                text-align: left !important;
                text-shadow: none !important;
                white-space: pre !important;
                word-spacing: normal !important;
                word-break: normal !important;
                word-wrap: normal !important;
                line-height: 1.5 !important;
                border-radius: 4px;
                tab-size: 4 !important;
                hyphens: none !important;
              }

              /* Code blocks */
              pre[class*='language-'] {
                padding: 1em !important;
                margin: 0.5em 0 !important;
                overflow: auto !important;
              }

              :not(pre) > code[class*='language-'],
              pre[class*='language-'] {
                /* --hljs-background: rgb(47, 47, 47); */
                background: rgb(47, 47, 47) !important;
              }

              /* Inline code */
              :not(pre) > code[class*='language-'] {
                color: rgb(227, 227, 227) !important;
                font-size: 14px !important;
                background-color: rgb(50, 50, 50) !important;
                border-radius: 4px !important;
                border-color: rgb(62, 62, 62) !important;
                padding: 4px !important;
                white-space: pre-wrap !important;
              }

              .token.comment,
              .token.block-comment,
              .token.prolog,
              .token.doctype,
              .token.cdata {
                /* --hljs-comment-color: rgb(185, 185, 185); */
                color: rgb(185, 185, 185) !important;
              }

              .token.punctuation {
                color: rgb(227, 227, 227) !important;
              }

              .token.tag,
              .token.namespace,
              .token.deleted {
                color: rgb(245, 107, 183) !important;
              }

              .token.boolean,
              .token.number,
              .token.attr-name,
              .token.function,
              .token.function-name {
                /* --hljs-function-color: rgb(75, 156, 245); */
                color: rgb(75, 156, 245) !important;
              }

              .token.attr-name {
                /* --hljs-attribute-color: rgb(144, 144, 250); */
                color: rgb(144, 144, 250) !important;
              }

              .token.property,
              .token.property.string,
              .token.class-name,
              .token.constant,
              .token.symbol {
                /* --hljs-literal-color: rgb(180, 131, 240); */
                color: rgb(180, 131, 240) !important;
              }

              .token.class-name {
                /* --hljs-class-color: rgb(35, 178, 184);
               */
                color: rgb(35, 178, 184) !important;
              }

              .token.selector,
              .token.important,
              .token.atrule,
              .token.keyword,
              .token.builtin {
                color: rgb(227, 102, 239) !important;
              }

              .token.string,
              .token.char,
              .token.attr-value,
              .token.regex {
                /* --hljs-string-color: rgb(57, 185, 144); */
                color: rgb(57, 185, 144) !important;
              }

              .token.variable {
                /* --hljs-variable-color: rgb(236, 90, 170); */
                color: rgb(236, 90, 170) !important;
              }

              .token.operator,
              .token.entity,
              .token.url {
                color: rgb(75, 156, 245) !important;
              }

              .token.important,
              .token.bold {
                font-weight: bold !important;
              }
              .token.italic {
                font-style: italic !important;
              }

              .token.entity {
                cursor: help !important;
              }

              .token.inserted {
                color: rgb(57, 185, 144) !important;
              }

              button span[type] {
                text-transform: uppercase;
                border-radius: var(--spectrum-global-dimension-size-50);
                font-size: var(--spectrum-global-dimension-size-125);
                margin-right: var(--spectrum-alias-size-100);
                padding: var(--spectrum-global-dimension-size-50) var(--spectrum-global-dimension-size-125);
                background-color: inherit;
              }

              button span[type='get'] {
                border: 2px solid var(--spectrum-global-color-blue-400);
                color: var(--spectrum-global-color-blue-400);
              }

              button span[type='patch'] {
                border: 2px solid var(--spectrum-global-color-seafoam-400);
                color: var(--spectrum-global-color-seafoam-400);
              }

              button span[type='post'] {
                border: 2px solid var(--spectrum-global-color-green-400);
                color: var(--spectrum-global-color-green-400);
              }

              button span[type='put'] {
                border: 2px solid var(--spectrum-global-color-orange-400);
                color: var(--spectrum-global-color-orange-400);
              }

              button span[type='head'] {
                border: 2px solid var(--spectrum-global-color-fuchsia-400);
                color: var(--spectrum-global-color-fuchsia-400);
              }

              button span[type='delete'] {
                border: 2px solid var(--spectrum-global-color-red-400);
                color: var(--spectrum-global-color-red-400);
              }

              h3 ~ div > button {
                border-radius: 0px;
                z-index: inherit;
                position: relative;
                display: list-item;
                margin: 0;
                border-bottom: var(--spectrum-alias-border-size-thin) solid var(--spectrum-global-color-gray-300);
                color: var(--spectrum-alias-text-color);
                background-color: inherit;

                &:disabled:hover {
                  background-color: inherit;
                  color: var(--spectrum-alias-text-color);
                }

                &:before {
                  margin-top: 3px;
                }

                &:hover {
                  color: var(--spectrum-global-color-gray-900);
                  background-color: var(--spectrum-global-color-gray-200);
                }

                &:focus {
                  outline-color: transparent;
                }

                &[aria-expanded='true'] {
                  border-bottom: var(--spectrum-alias-border-size-thin) solid transparent;
                }

                svg {
                  filter: brightness(0) saturate(100%) invert(61%) sepia(6%) saturate(11%) hue-rotate(13deg)
                    brightness(91%) contrast(86%);
                  margin-top: 3px;
                }

                strong {
                  display: inline-block;
                  margin-top: 4px;
                  margin-right: 8px;
                }
              }

              div[data-tabs] {
                ul[role='tablist'] {
                  overflow: auto;
                  border-bottom-color: rgb(62, 62, 62);
                  align-items: center;
                  display: flex;
                  position: relative;
                  z-index: 0;
                  margin: 0;
                  padding-top: 0;
                  padding-bottom: 0;
                  padding-left: var(--spectrum-global-dimension-size-100);
                  padding-right: var(--spectrum-global-dimension-size-100);
                  vertical-align: top;
                  background-color: rgb(50, 50, 50);

                  li[role='tab'] {
                    position: relative;
                    box-sizing: border-box;
                    height: calc(var(--spectrum-global-dimension-size-600) - var(--spectrum-alias-border-size-thick));
                    line-height: calc(
                      var(--spectrum-global-dimension-size-600) - var(--spectrum-alias-border-size-thick)
                    );
                    z-index: 1;
                    text-decoration: none;
                    white-space: nowrap;
                    transition: color var(--spectrum-global-animation-duration-100) ease-out;
                    cursor: pointer;
                    outline: none;
                    color: var(--spectrum-alias-label-text-color);
                    cursor: pointer;
                    vertical-align: top;
                    display: inline-block;
                    font-size: var(--spectrum-alias-font-size-default);
                    font-weight: var(--spectrum-alias-body-text-font-weight);
                    text-decoration: none;
                    background-color: inherit;
                    border: 0px;
                    border-bottom: var(--spectrum-alias-border-size-thick) solid;
                    padding-right: 15px;
                    padding-left: 15px;
                    padding-bottom: 10px;
                    margin-right: 0px;
                    margin-left: 0px;
                    border-radius: 0px;
                  }

                  li[aria-selected='true'] {
                    color: var(--spectrum-global-color-gray-400);
                  }
                }

                div[role='tabpanel'] button {
                  border-radius: var(--spectrum-global-dimension-size-50);
                  outline: 0;
                }
              }

              button + div[aria-hidden] {
                transition: none !important;

                div {
                  color: rgb(227, 227, 227);
                  background-color: rgb(50, 50, 50);

                  div[role='button'] div {
                    border-color: rgb(90, 90, 90);
                    background-color: rgb(37, 37, 37);

                    span {
                      color: rgb(227, 227, 227);
                    }
                  }
                }
              }
            }
          `}>
          <RedocStandalone
            {...input}
            options={{
              nativeScrollbars: true,
              disableSearch: true,
              hideLoading: true,
              scrollYOffset: 64,
              menuToggle: true,
              hideDownloadButton: true,
              theme: {
                sidebar: {
                  width: SIDENAV_WIDTH
                },
                rightPanel: {
                  backgroundColor: 'rgb(37, 37, 37)'
                },
                codeBlock: {
                  backgroundColor: 'rgb(50, 50, 50)'
                },
                typography: {
                  fontFamily: `adobe-clean, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif`
                }
              }
            }}
            onLoaded={() => {
              setShowProgress(false);
            }}
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

OpenAPIBlock.propTypes = {
  src: PropTypes.string
};

export default OpenAPIBlock;
