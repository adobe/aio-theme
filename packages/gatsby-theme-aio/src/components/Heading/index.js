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
import { css } from '@emotion/react';
import classNames from 'classnames';
import '@spectrum-css/typography';
import { Divider } from '../Divider';
import { Link } from '../Link';

const headingSizes = ['XL', 'M', 'S', 'XS', 'XXS', 'XXS'];

// Use the Anchor to allow scrolling to heading position minus GlobalNav height
const Anchor = ({ id }) => (
  <div
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
  const isHeading3 = level === 3;
  const isHeading4 = level === 4;
  const isHeading5 = level === 5;
  const isHeading6 = level === 6;
  const marginLink = `
  margin-left: var(--spectrum-global-dimension-size-${isHeading2 ? '100' : '50'});`;
  const animateAnchor = `
    & span a {
      opacity: 0;
      transition: opacity var(--spectrum-global-animation-duration-100) ease-in-out;

      &:focus {
        opacity: 1;
      }
    }

    &:hover span a {
      opacity: 1;
    }
  `;
  const heading1Overrides = `
    & + p {
      font-size: var(--spectrum-global-dimension-size-250);
      color: var(--spectrum-global-color-gray-600);
      margin-bottom: var(--spectrum-global-dimension-size-500);
      line-height: 2rem;
    }
  `;
  const heading2Overrides = `
    margin-top: var(--spectrum-global-dimension-size-500);
  `;
  const heading3Overrides = `
    color: var(--spectrum-global-color-gray-800);
    margin-top: var(--spectrum-global-dimension-size-350);
    margin-bottom: calc(-1 * var(--spectrum-global-dimension-size-50));;

    & + ul,
    & + ol {
      margin-top: var(--spectrum-global-dimension-size-250);
    }
  `;
  const heading456Overrides = `
    margin-top: var(--spectrum-global-dimension-size-400);

    & + ul,
    & + ol {
      margin-top: var(--spectrum-global-dimension-size-200);
    }
  `;

  return (
    <>
      {!isHeading1 && <Anchor id={id} />}
      <HeadingTag
        {...props}
        id={id}
        className={
          className ||
          classNames(
            className,
            `spectrum-Heading spectrum-Heading--size${headingSizes[level - 1]}`,
            {
              'spectrum-Heading--light': isHeading1,
            }
          )
        }
        css={css`
          ${!isHeading1 && animateAnchor}
          ${isHeading1 && heading1Overrides}
          ${isHeading2 && heading2Overrides}
          ${isHeading3 && heading3Overrides}
          ${(isHeading4 || isHeading5 || isHeading6) && heading456Overrides}
          ${styles}
        `}>
        {children}
        {!isHeading1 && (
          <span
            css={css`
              ${marginLink}
            `}>
            <Link isQuiet={true}>
              <a href={`#${id}`}>
                <svg aria-hidden="true" height="18" viewBox="0 0 16 16" width="18">
                  <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                </svg>
              </a>
            </Link>
          </span>
        )}
      </HeadingTag>
      {isHeading2 && (
        <Divider
          size="S"
          css={css`
            margin-bottom: calc(-1 * var(--spectrum-global-dimension-size-75));
          `}
        />
      )}
    </>
  );
};

export const Heading1 = props => createHeading(1, props);
export const Heading2 = props => createHeading(2, props);
export const Heading3 = props => createHeading(3, props);
export const Heading4 = props => createHeading(4, props);
export const Heading5 = props => createHeading(5, props);
export const Heading6 = props => createHeading(6, props);
