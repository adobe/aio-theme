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
import { css } from '@emotion/core'
import classNames from 'classnames'
import '@spectrum-css/typography'
import { Divider } from '@react-spectrum/divider'
import { Link } from './Link'

export const Heading1 = ({ children, id, className, css: styles, ...props }) => (
  <>
    <span
      aria-hidden="true"
      id={id}
      css={css`
        position: relative;
        top: calc(-1 * var(--spectrum-global-dimension-static-size-800));
      `}></span>
    <h1
      {...props}
      className={className ?? 'spectrum-Heading--XL spectrum-Heading--light'}
      css={css`
        ${styles}
        & + p {
          margin-top: var(--spectrum-global-dimension-static-size-300) !important;
          font-size: var(--spectrum-global-dimension-static-size-225);
        }
      `}>
      {children}
    </h1>
  </>
);

export const Heading2 = ({ children, className, id, ...props }) => (
  <>
    <span
      aria-hidden="true"
      id={id}
      css={css`
        position: relative;
        top: calc(-1 * var(--spectrum-global-dimension-static-size-800));
      `}></span>
    <h2
      {...props}
      className={classNames(className, 'spectrum-Heading--L')}
      css={css`
        & a {
          opacity: 0;
          transition: opacity var(--spectrum-global-animation-duration-100) ease-in-out;
        }

        &:hover a {
          opacity: 1;
        }
      `}>
      {children}
      <Link
        href={`#${id}`}
        css={css`
          margin-inline-start: var(--spectrum-global-dimension-static-size-100);
        `}>
        #
      </Link>
    </h2>
    <Divider marginBottom="size-300" />
  </>
);

export const Heading3 = ({ children, className, id, ...props }) => (
  <>
    <span
      aria-hidden="true"
      id={id}
      css={css`
        position: relative;
        top: calc(-1 * var(--spectrum-global-dimension-static-size-800));
      `}></span>
    <h3
      {...props}
      className={classNames(className, 'spectrum-Heading--M')}
      css={css`
        & a {
          opacity: 0;
          transition: opacity var(--spectrum-global-animation-duration-100) ease-in-out;
        }

        &:hover a {
          opacity: 1;
        }
      `}>
      {children}
      <Link
        css={css`
          margin-inline-start: var(--spectrum-global-dimension-static-size-50);
        `}
        href={`#${id}`}>
        #
      </Link>
    </h3>
  </>
);

export const Heading4 = ({ children, className, ...props }) => (
  <h4 {...props} className={className ?? 'spectrum-Heading--S'}>
    {children}
  </h4>
);

export const Heading5 = ({ children, className, ...props }) => (
  <h5 {...props} className={className ?? 'spectrum-Heading--XS'}>
    {children}
  </h5>
);

export const Heading6 = ({ children, className, ...props }) => (
  <h4 {...props} className={className ?? 'spectrum-Heading--XXS'}>
    {children}
  </h4>
);
