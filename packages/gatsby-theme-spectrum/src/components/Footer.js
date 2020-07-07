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
import {Flex} from '@react-spectrum/layout';
import {View} from '@react-spectrum/view';
import {Divider} from '@react-spectrum/divider';
import '@spectrum-css/typography/dist/index-vars.css';

export const Footer = () => (
  <footer
    className="spectrum-Body--XS"
    css={css`
      margin: 0 var(--spectrum-global-dimension-static-size-400);
    `}>
    <Divider size="M"/>
    <Flex justifyContent="space-between" alignItems="center">
      <View>
        <ul
          css={css`
            display: inline-flex;
            list-style: none;
            padding: 0;
            & > li {
              margin-right: var(--spectrum-global-dimension-static-size-400);
            }
          `}>
          <li>Terms of use</li>
          <li>Privacy policy</li>
          <li>Cookies</li>
          <li>Language: <u>English</u></li>
        </ul>
      </View>
      <View>
        <span>Copyright © {new Date().getFullYear()} Adobe. All rights reserved.</span>
      </View>
    </Flex>
  </footer>
);