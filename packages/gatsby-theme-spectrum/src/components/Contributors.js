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
import {css} from '@emotion/core';
import PropTypes from 'prop-types';
import {Flex} from '@react-spectrum/layout';

const Contributors = ({href = '#', contributors = [], date}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer nofollow'
    css={css`
      text-decoration: none;
      color: inherit;
    `}>
    <Flex alignItems="center">
      <div css={css`
        display: inline-flex;
        padding-left: 16px;
      `}>
        {contributors.slice(0, 5).map((contributor, index) => (
          <span
            key={index}
            css={css`
              margin-left: -16px;
              position: relative;
              border: 3px solid white;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: white;
            `}>
          <img
            alt={contributor}
            src={`https://github.com/${contributor}.png`}
            css={css`
              width: 32px;
              height: 32px;
              border-radius: 50%;
            `}
          />
        </span>
        ))}
      </div>
      <span
        css={css`
          padding-left: 16px;
        `}>
      {date && `Last updated ${date}`}
    </span>
    </Flex>
  </a>
);

Contributors.propTypes = {
  href: '',
  contributors: PropTypes.array,
  date: PropTypes.string
};

export default Contributors;