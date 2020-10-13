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

import React, { useEffect } from 'react';
import { css } from '@emotion/core';
import { getElementChild, getExternalLinkProps, layoutColumns } from '../utils';
import '@spectrum-css/typography';
import '@spectrum-css/card';
import PropTypes from 'prop-types';

let horizontalCounter = 0;
let verticalCounter = 0;

const ResourceCard = ({ theme = 'lightest', width = '100%', variant = 'horizontal', link, heading, text, image }) => {
  const href = getElementChild(link).props.href;
  const externalProps = getExternalLinkProps(href);
  let columns = 100 / parseFloat(width);

  if (width === '33%') {
    width = `${(100 / 3).toFixed(2)}%`;
    columns = 3;
  }

  const is2Columns = columns === 2;
  if (is2Columns) {
    if (variant === 'horizontal') {
      horizontalCounter++;
    } else {
      verticalCounter++;
    }
  }

  useEffect(() => {
    return () => {
      if (is2Columns) {
        if (variant === 'horizontal') {
          horizontalCounter--;
        } else {
          verticalCounter--;
        }
      }
    };
  });

  if (variant === 'horizontal') {
    let extraMargin = '';
    let position = '';
    let alignment = 'align-items: center;';

    if (is2Columns) {
      if (horizontalCounter % 3 === 0 || horizontalCounter % 4 === 0) {
        position = 'position: absolute; left: 0;';
        alignment = 'align-items: flex-end;';
      } else {
        position = 'position: absolute; right: 0;';
        alignment = 'align-items: flex-start;';
      }

      if (horizontalCounter % 2 === 0) {
        extraMargin =
          'margin-top: calc(var(--spectrum-global-dimension-size-2400) + var(--spectrum-global-dimension-size-150));';
      } else {
        extraMargin = '';
      }
    }

    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          ${position}
          display: inline-flex;
          flex-direction: column;
          ${alignment}
          width: ${width};
          box-sizing: border-box;
          padding: var(--spectrum-global-dimension-size-300);
          ${extraMargin}
          background: var(--spectrum-global-color-gray-100);
        `}>
        <a
          className={`spectrum-Card spectrum-Card--${variant}`}
          href={href}
          {...externalProps}
          css={css`
            width: ${layoutColumns(6)};
            height: calc(var(--spectrum-global-dimension-size-2000) - var(--spectrum-global-dimension-size-50));
          `}>
          <div
            className="spectrum-Card-preview"
            css={css`
              width: calc(var(--spectrum-global-dimension-size-2000) + var(--spectrum-global-dimension-size-125));
              padding: 0 !important;
            `}>
            {image &&
              React.cloneElement(image, {
                css: css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  margin-bottom: 0 !important;

                  & > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0;
                  }
                `
              })}
          </div>
          <div
            className="spectrum-Card-body"
            css={css`
              flex: 1;
              padding: var(--spectrum-global-dimension-size-300) !important;
              justify-content: flex-start !important;
              overflow: hidden;
            `}>
            <div
              className="spectrum-Card-header"
              css={css`
                width: 100%;
              `}>
              <div
                className="spectrum-Card-title"
                css={css`
                  white-space: normal;
                  text-align: left;
                `}>
                <h3
                  className="spectrum-Heading--M"
                  css={css`
                    margin-top: 0 !important;
                    margin-bottom: var(--spectrum-global-dimension-size-200) !important;
                  `}>
                  {heading && heading.props.children}
                </h3>
              </div>
            </div>
            <div className="spectrum-Card-content">
              <div className="spectrum-Card-subtitle">
                <p
                  className="spectrum-Detail spectrum-Detail--L"
                  css={css`
                    text-align: left;
                  `}>
                  <strong>{text && text.props.children}</strong>
                </p>
              </div>
            </div>
          </div>
        </a>
      </section>
    );
  } else {
    let alignment = 'align-items: center;';
    let extraPadding = '';
    if (is2Columns) {
      if (verticalCounter % 2 === 0) {
        extraPadding = 'padding-left: calc(50% + var(--spectrum-global-dimension-size-300));';
        alignment = 'align-items: flex-start;';
      } else {
        extraPadding = 'padding-right: calc(50% + var(--spectrum-global-dimension-size-300));';
        alignment = 'align-items: flex-end;';
      }
    }

    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          display: inline-flex;
          flex-direction: column;
          ${alignment}
          width: ${is2Columns ? '100%' : width};
          box-sizing: border-box;
          padding: var(--spectrum-global-dimension-size-300);
          ${extraPadding}
          background: var(--spectrum-global-color-gray-100);
        `}>
        <a
          className={`spectrum-Card spectrum-Card--${variant}`}
          href={href}
          css={css`
            width: ${layoutColumns(6)};
            height: calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-100));
          `}>
          <div
            className="spectrum-Card-preview"
            css={css`
              height: var(--spectrum-global-dimension-size-3000);
              width: 100%;
              padding: 0 !important;
            `}>
            {image &&
              React.cloneElement(image, {
                css: css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  margin-bottom: 0 !important;

                  & > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0;
                  }
                `
              })}
          </div>
          <div
            className="spectrum-Card-body"
            css={css`
              flex: 1;
              padding: var(--spectrum-global-dimension-size-300) !important;
              justify-content: flex-start !important;
              overflow: hidden;
            `}>
            <div
              className="spectrum-Card-header"
              css={css`
                height: auto;
                width: 100%;
              `}>
              <div
                className="spectrum-Card-title"
                css={css`
                  white-space: normal;
                  text-align: left;
                `}>
                <h3
                  className="spectrum-Heading--M"
                  css={css`
                    margin-top: 0 !important;
                    margin-bottom: 0 !important;
                  `}>
                  {heading && heading.props.children}
                </h3>
              </div>
            </div>
            <div className="spectrum-Card-content">
              <div className="spectrum-Card-subtitle">
                <p
                  className="spectrum-Detail spectrum-Detail--L"
                  css={css`
                    text-align: left;
                  `}>
                  <strong>{text && text.props.children}</strong>
                </p>
              </div>
            </div>
          </div>
        </a>
      </section>
    );
  }
};

ResourceCard.propTypes = {
  theme: PropTypes.string,
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
  width: PropTypes.oneOf(['100%', '50%']),
  link: PropTypes.element,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element
};

export { ResourceCard };
