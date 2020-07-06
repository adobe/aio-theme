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
// https://github.com/mdx-js/mdx/issues/628
import MDX from '@mdx-js/runtime';

import {layoutColumns} from './utils';

export default ({children}) => {
  return (
    <div
      css={css`
        display: inline-block;
        max-width: ${layoutColumns(3)};
        & a {
          display: block;
          margin-bottom: var(--spectrum-global-dimension-static-size-100);
        }
      `}>
      {children && <MDX>{children}</MDX>}
    </div>
  );
}