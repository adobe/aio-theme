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
import '@spectrum-css/button';

const links = [
  {
    title: 'Discover',
    path: '/apis'
  },
  {
    title: 'Open Source',
    path: '/open'
  },
  {
    title: 'Blog',
    path: 'https://medium.com/adobetech'
  },
  {
    title: 'Console',
    path: 'https://console.adobe.io/',
    variant: 'button'
  }
];

export const GlobalHeaderTemp = () => (
  <header
    css={css`
      height: 100%;
      background-color: white;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `}>
    <nav
      css={css`
        height: 100%;
      `}>
      <a
        href="/"
        css={css`
          display: flex;
          position: absolute;
          left: 0;
          height: 100%;
          padding: 0 20px;
          text-decoration: none;
          z-index: 1;
          outline: none;

          &:hover,
          &:focus {
            text-decoration: underline;
          }
        `}>
        <span
          css={css`
            color: black;
            font-size: 16px;
            font-weight: 700;
            margin: auto;
          `}>
          Adobe I/O
        </span>
      </a>
      <div
        css={css`
          display: flex;
          justify-content: center;
          height: 100%;
        `}>
        <ul
          css={css`
            display: flex;
            margin: 0;
            list-style: none;
          `}>
          {links.map(({ title, path, variant }, i) => {
            const isButton = variant === 'button';

            return (
              <li
                key={i}
                css={css`
                  display: flex;
                  align-items: center;

                  ${isButton
                    ? 'padding: 0 20px;'
                    : `
                    &:hover {
                      background-color: hsla(0, 0%, 89%, .8);
                      cursor: pointer;
                    }
                  `}
                `}>
                {isButton ? (
                  <a className="spectrum-Button spectrum-Button--cta" href={path}>
                    {title}
                  </a>
                ) : (
                  <a
                    href={path}
                    css={css`
                      display: flex;
                      height: 100%;
                      align-items: center;
                      padding: 0 20px;
                      font-size: 14px;
                      font-weight: 700;
                      color: black;
                      text-decoration: none;
                    `}>
                    {title}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  </header>
);
