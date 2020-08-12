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

import React, { useState } from 'react';
import { css } from '@emotion/core';
import { ProgressCircle } from '@react-spectrum/progress';
import { RedocStandalone } from 'redoc';

export const OpenAPIBlock = ({ specUrl }) => {
  const [showProgress, setShowProgress] = useState(true);

  return (
    <div
      css={css`
        height: calc(100% - 64px);
      `}>
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
        <ProgressCircle aria-label="Loading…" isIndeterminate size="L" />
      </div>

      <div
        css={css`
          & {
            * {
              font-smoothing: auto !important;
              -webkit-font-smoothing: auto !important;
            }

            [role='navigation'] {
              padding: var(--spectrum-global-dimension-static-size-400);

              label span[type] {
                text-transform: uppercase;
                border-radius: var(--spectrum-global-dimension-size-50);
                font-size: var(--spectrum-global-dimension-size-100);
                margin-right: var(--spectrum-global-dimension-size-100, var(--spectrum-alias-size-100));
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
                margin-top: var(--spectrum-sidenav-item-gap, var(--spectrum-global-dimension-size-50));
                margin-bottom: var(--spectrum-sidenav-item-gap, var(--spectrum-global-dimension-size-50));
                width: 100%;
                color: var(--spectrum-body-text-color, var(--spectrum-alias-text-color));
                min-height: var(--spectrum-sidenav-item-height, var(--spectrum-alias-single-line-height));
                padding-left: var(--spectrum-sidenav-item-padding-x, var(--spectrum-global-dimension-size-150));
                padding-right: var(--spectrum-sidenav-item-padding-x, var(--spectrum-global-dimension-size-150));
                padding-top: var(--spectrum-global-dimension-size-65);
                padding-bottom: var(--spectrum-global-dimension-size-65);
                border-radius: var(--spectrum-sidenav-item-border-radius, var(--spectrum-alias-border-radius-regular));
                text-transform: capitalize;
                font-size: var(--spectrum-sidenav-item-text-size, var(--spectrum-alias-font-size-default));
                font-family: adobe-clean, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                  Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif;
                font-style: normal;
                text-decoration: none;
                word-break: break-word;
                hyphens: auto;
                cursor: pointer;
                transition: background-color var(--spectrum-global-animation-duration-100, 130ms) ease-out,
                  color var(--spectrum-global-animation-duration-100, 130ms) ease-out;

                &:hover {
                  background-color: var(
                    --spectrum-sidenav-item-background-color-hover,
                    var(--spectrum-alias-highlight-hover)
                  );
                  color: var(--spectrum-sidenav-item-text-color-hover, var(--spectrum-alias-text-color-hover));
                }

                svg {
                  display: none;
                }
              }

              & > li > [role='menuitem'] {
                font-weight: var(
                  --spectrum-sidenav-multilevel-main-item-font-weight,
                  var(--spectrum-global-font-weight-bold)
                );
              }

              & + div {
                display: none;
              }
            }

            .api-info {
              h1 {
                font-weight: var(
                  --spectrum-heading-light-xl-emphasis-text-font-weight,
                  var(--spectrum-global-font-weight-light)
                );
                font-size: var(--spectrum-heading-xl-text-size, var(--spectrum-alias-heading-xl-text-size));
                line-height: var(
                  --spectrum-heading-xl-text-line-height,
                  var(--spectrum-alias-heading-text-line-height)
                );
                font-style: var(--spectrum-heading-xl-text-font-style, var(--spectrum-global-font-style-regular));
                letter-spacing: var(
                  --spectrum-heading-xl-text-letter-spacing,
                  var(--spectrum-global-font-letter-spacing-none)
                );
                text-transform: capitalize;
                color: var(--spectrum-heading-xl-text-color, var(--spectrum-alias-heading-text-color));

                span {
                  font-size: var(--spectrum-body-code-4-text-size, var(--spectrum-alias-font-size-default));
                }
              }

              p {
                font-size: var(--spectrum-body-l-text-size, var(--spectrum-global-dimension-font-size-300));
                font-weight: var(--spectrum-body-l-text-font-weight, var(--spectrum-alias-body-text-font-weight));
                line-height: var(--spectrum-body-l-text-line-height, var(--spectrum-alias-body-text-line-height));
                font-style: var(--spectrum-body-l-text-font-style, var(--spectrum-global-font-style-regular));
                letter-spacing: var(
                  --spectrum-body-l-text-letter-spacing,
                  var(--spectrum-global-font-letter-spacing-none)
                );
                text-transform: var(--spectrum-body-l-text-transform, none);
              }
            }

            .api-content {
              button span[type] {
                text-transform: uppercase;
                border-radius: var(--spectrum-global-dimension-size-50);
                font-size: var(--spectrum-global-dimension-size-125);
                margin-right: var(--spectrum-global-dimension-size-100, var(--spectrum-alias-size-100));
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

              div[data-tabs] ul[role='tablist'] {
                border-bottom-color: var(--spectrum-tabs-rule-color, var(--spectrum-global-color-gray-200));
                align-items: center;
                display: flex;
                position: relative;
                z-index: 0;
                margin: 0;
                padding-top: 0;
                padding-bottom: 0;
                padding-left: var(--spectrum-tabs-focus-ring-padding-x, var(--spectrum-global-dimension-size-100));
                padding-right: var(--spectrum-tabs-focus-ring-padding-x, var(--spectrum-global-dimension-size-100));
                vertical-align: top;
                background-color: rgb(50, 50, 50);
              }

              div[data-tabs] ul[role='tablist'] li[role='tab'] {
                position: relative;
                box-sizing: border-box;
                height: calc(
                  var(--spectrum-tabs-height, var(--spectrum-global-dimension-size-600)) -
                    var(--spectrum-tabs-rule-height, var(--spectrum-alias-border-size-thick))
                );
                line-height: calc(
                  var(--spectrum-tabs-height, var(--spectrum-global-dimension-size-600)) -
                    var(--spectrum-tabs-rule-height, var(--spectrum-alias-border-size-thick))
                );
                z-index: 1;
                text-decoration: none;
                white-space: nowrap;
                transition: color var(--spectrum-global-animation-duration-100, 130ms) ease-out;
                cursor: pointer;
                outline: none;
                color: var(--spectrum-tabs-text-color, var(--spectrum-alias-label-text-color));
                cursor: pointer;
                vertical-align: top;
                display: inline-block;
                font-size: var(--spectrum-tabs-text-size, var(--spectrum-alias-font-size-default));
                font-weight: var(--spectrum-tabs-text-font-weight, var(--spectrum-alias-body-text-font-weight));
                text-decoration: none;
                background-color: inherit;
                border: 0px;
                border-bottom: var(--spectrum-tabs-rule-height, var(--spectrum-alias-border-size-thick)) solid;
                padding-right: 15px;
                padding-left: 15px;
                padding-bottom: 10px;
                margin-right: 0px;
                margin-left: 0px;
                border-radius: 0px;
              }

              div[data-tabs] ul[role='tablist'] li[aria-selected='true'] {
                color: var(--spectrum-tabs-text-color-selected, var(--spectrum-global-color-gray-400));
              }

              h1 {
                font-size: var(--spectrum-heading-l-text-size, var(--spectrum-alias-heading-l-text-size));
                line-height: var(--spectrum-heading-l-text-line-height, var(--spectrum-alias-heading-text-line-height));
                font-style: var(--spectrum-heading-l-text-font-style, var(--spectrum-global-font-style-regular));
                letter-spacing: var(
                  --spectrum-heading-l-text-letter-spacing,
                  var(--spectrum-global-font-letter-spacing-none)
                );
                text-transform: capitalize;
                color: var(--spectrum-heading-l-text-color, var(--spectrum-alias-heading-text-color));
              }

              h2 {
                position: relative;
                font-family: var(--spectrum-alias-body-text-font-family, var(--spectrum-global-font-family-base));
                font-size: var(--spectrum-heading-l-text-size, var(--spectrum-alias-heading-l-text-size));
                font-weight: var(
                  --spectrum-heading-l-text-font-weight,
                  var(--spectrum-alias-heading-text-font-weight-regular)
                );
                line-height: var(--spectrum-heading-l-text-line-height, var(--spectrum-alias-heading-text-line-height));
                font-style: var(--spectrum-heading-l-text-font-style, var(--spectrum-global-font-style-regular));
                letter-spacing: var(
                  --spectrum-heading-l-text-letter-spacing,
                  var(--spectrum-global-font-letter-spacing-none)
                );
                text-transform: capitalize;
                color: var(--spectrum-heading-l-text-color, var(--spectrum-alias-heading-text-color));
                margin-top: var(--spectrum-heading-l-margin-top, var(--spectrum-alias-heading-l-margin-top));
                margin-bottom: var(--spectrum-global-dimension-size-400, var(--spectrum-alias-size-300));

                &:after {
                  content: '';
                  border-radius: var(--spectrum-global-dimension-static-size-25);
                  background-color: var(--spectrum-global-color-gray-800);
                  height: var(--spectrum-global-dimension-static-size-50);
                  width: 100%;
                  position: absolute;
                  left: 0;
                  bottom: calc(-1 * var(--spectrum-global-dimension-static-size-100));
                }

                ~ div {
                  p,
                  ul {
                    font-size: var(--spectrum-body-m-text-size, var(--spectrum-global-dimension-font-size-200));
                    font-weight: var(--spectrum-body-m-text-font-weight, var(--spectrum-alias-body-text-font-weight));
                    line-height: var(--spectrum-body-m-text-line-height, var(--spectrum-alias-body-text-line-height));
                    font-style: var(--spectrum-body-m-text-font-style, var(--spectrum-global-font-style-regular));
                    letter-spacing: var(
                      --spectrum-body-m-text-letter-spacing,
                      var(--spectrum-global-font-letter-spacing-none)
                    );
                    text-transform: var(--spectrum-body-m-text-transform, none);
                  }
                }
              }

              h5 {
                font-size: var(--spectrum-body-m-text-size, var(--spectrum-global-dimension-font-size-200));
                font-weight: var(--spectrum-body-xl-strong-text-font-weight, var(--spectrum-global-font-weight-bold));
                line-height: var(--spectrum-body-m-text-line-height, var(--spectrum-alias-body-text-line-height));
                font-style: var(--spectrum-body-m-text-font-style, var(--spectrum-global-font-style-regular));
                letter-spacing: var(
                  --spectrum-body-m-text-letter-spacing,
                  var(--spectrum-global-font-letter-spacing-none)
                );
                text-transform: var(--spectrum-body-m-text-transform, none);
                margin-top: 0;
                margin-bottom: var(--spectrum-global-dimension-size-200, var(--spectrum-alias-size-200));
                color: var(--spectrum-body-text-color, var(--spectrum-alias-text-color));
                text-transform: capitalize;
                border-bottom: 0px;
              }

              pre {
                border-radius: var(--spectrum-global-dimension-static-size-50);

                code {
                  border-radius: var(--spectrum-global-dimension-static-size-50);
                  font-size: var(--spectrum-body-code-4-text-size, var(--spectrum-alias-font-size-default));
                  font-weight: var(
                    --spectrum-body-code-4-text-font-weight,
                    var(--spectrum-alias-code-text-font-weight-regular)
                  );
                  line-height: var(
                    --spectrum-body-code-4-text-line-height,
                    var(--spectrum-alias-code-text-line-height)
                  );
                  font-style: var(--spectrum-body-code-4-text-font-style, var(--spectrum-global-font-style-regular));
                  letter-spacing: var(
                    --spectrum-body-code-4-text-letter-spacing,
                    var(--spectrum-global-font-letter-spacing-none)
                  );
                  font-family: var(
                    --spectrum-body-code-4-text-font-family,
                    var(--spectrum-alias-code-text-font-family)
                  );
                }
              }

              a[href] {
                color: var(--spectrum-link-text-color, var(--spectrum-global-color-blue-600));

                &:hover {
                  text-decoration: underline;
                }
              }

              a[download] {
                margin: 0;
                border: none;
              }
            }
          }
        `}>
        <RedocStandalone
          specUrl={specUrl}
          options={{
            nativeScrollbars: true,
            disableSearch: true,
            hideLoading: true,
            scrollYOffset: 64,
            menuToggle: true,
            theme: {
              sidebar: {
                width: '256px'
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
          onLoaded={(error) => {
            setShowProgress(false);
          }}
        />
      </div>
    </div>
  );
};
