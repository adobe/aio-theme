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
import '@spectrum-css/typography';
import PropTypes from 'prop-types';
import { layoutColumns } from '../utils';

const TitleBlock = ({ heading, text }) => (
  <section
    css={css`
      margin: var(--spectrum-global-dimension-static-size-800) auto;
      text-align: center;
      max-width: calc(
        ${layoutColumns(12, [
          'var(--spectrum-global-dimension-static-size-4600)',
          'var(--spectrum-global-dimension-static-size-150)'
        ])}
      );
    `}>
    {heading && <h2 className="spectrum-HeadingL">{heading?.props?.children}</h2>}

    {text &&
      React.cloneElement(text, {
        className: 'spectrum-Body--L'
      })}
  </section>
);

TitleBlock.propTypes = {
  heading: PropTypes.element,
  text: PropTypes.element
};

export { TitleBlock };
