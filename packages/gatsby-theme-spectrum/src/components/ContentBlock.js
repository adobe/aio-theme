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

import React from 'react';
import { css } from '@emotion/core';
import { layoutColumns } from './utils';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';

const imageWidth = '100px';

const ContentBlock = ({ width, heading, link, text, image }) => (
  <div
    className={width === '100%' ? 'is-block' : ''}
    css={css`
      ${image
        ? `
      position: relative;
      margin-left: calc(${imageWidth} + var(--spectrum-global-dimension-static-size-400));
      `
        : ''}
      display: inline-flex;
      flex-direction: column;
      margin-right: var(--spectrum-global-dimension-static-size-200);
      width: ${width
        ? width
        : layoutColumns(3, [
            'var(--spectrum-global-dimension-static-size-400)',
            'var(--spectrum-global-dimension-static-size-400)'
          ])};

      &:not(.is-block) {
        height: 176px;
        vertical-align: bottom;
      }
    `}>
    {image &&
      React.cloneElement(image, {
        css: css`
          position: absolute;
          top: var(--spectrum-heading-m-margin-top, var(--spectrum-alias-heading-m-margin-top));
          left: calc(-${imageWidth} - var(--spectrum-global-dimension-static-size-400));
          display: flex;
          align-items: flex-start;
          height: 100%;
          width: ${imageWidth};
        `
      })}
    {heading ?? (
      <div className="spectrum-Heading--M" aria-hidden="true">
        &nbsp;
      </div>
    )}
    {link}
    {text}
  </div>
);

ContentBlock.propTypes = {
  width: PropTypes.string,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element,
  link: PropTypes.element
};

export { ContentBlock };
