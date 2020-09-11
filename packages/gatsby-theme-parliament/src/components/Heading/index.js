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
import classNames from 'classnames';
import '@spectrum-css/typography';
import { Divider } from '@adobe/react-spectrum';
import { Link } from '@adobe/react-spectrum';

const headingSizes = ['XL', 'L', 'M', 'S', 'XS', 'XXS'];

// Use the Anchor to allow scrolling to heading position minus GlobalNav height
const Anchor = ({ id }) => (
  <span
    aria-hidden="true"
    id={id}
    css={css`
      position: relative;
      top: calc(-1 * var(--spectrum-global-dimension-size-800));
    `}
  />
);

const createHeading = (level, { id, children, className, css: styles, ...props }) => {
  const HeadingTag = `h${level}`;
  const isHeading1 = level === 1;
  const isHeading2 = level === 2;
  const marginLink = `margin-left: var(--spectrum-global-dimension-size-${isHeading2 ? '100' : '50'});`;

  return (
    <>
      {!isHeading1 && <Anchor id={id} />}
      <HeadingTag
        {...props}
        className={
          className ||
          classNames(className, `spectrum-Heading--${headingSizes[level - 1]}`, {
            'spectrum-Heading--light': isHeading1
          })
        }
        css={css`
          ${isHeading1
            ? `& + p {
          margin-top: var(--spectrum-global-dimension-size-300) !important;
          font-size: var(--spectrum-global-dimension-size-225);
        }`
            : `& a {
          opacity: 0;
          transition: opacity var(--spectrum-global-animation-duration-100) ease-in-out;
        }

        &:hover a {
          opacity: 1;
        }`}

          ${styles}
        `}>
        {children}
        {!isHeading1 && (
          <span
            css={css`
              ${marginLink}
            `}>
            <Link isQuiet={true}>
              <a href={`#${id}`}>#</a>
            </Link>
          </span>
        )}
      </HeadingTag>
      {isHeading2 && <Divider marginBottom="size-300" />}
    </>
  );
};

export const Heading1 = (props) => createHeading(1, props);
export const Heading2 = (props) => createHeading(2, props);
export const Heading3 = (props) => createHeading(3, props);
export const Heading4 = (props) => createHeading(4, props);
export const Heading5 = (props) => createHeading(5, props);
export const Heading6 = (props) => createHeading(6, props);
