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
import '@spectrum-css/typography/dist/index-vars.css';

export default ({heading, text, illustration, background}) => (
  <section css={css`
    height:270px;
    margin-bottom: 32px;
    background-color: ${background};
  `}>
    <Flex height="100%" alignItems="center">
      <View marginStart="size-800">
        <h1
          className="spectrum-Heading--XL"
          css={css`
          margin-bottom:16px;
          color: var(--spectrum-global-color-gray-200);
          `}>
          {heading}
        </h1>
        <p
          className="spectrum-Body--L"
          css={css`
          color: var(--spectrum-global-color-gray-200);
          `}>
          {text}
        </p>
      </View>
      <View>
        <img
          alt=""
          src={illustration}
          css={css`
            min-width: 750px;
            max-height: 210px;
            object-fit: contain;
          `}/>
      </View>
    </Flex>
  </section>
);