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

const TitleBlock = ({ heading, text, theme = 'lightest' }) => (
  <section
    className={`spectrum--${theme}`}
    css={css`
      background: var(--spectrum-global-color-gray-100);
      padding: var(--spectrum-global-dimension-size-400) 0;
      text-align: center;
    `}>
    <div
      css={css`
        margin: auto;
        max-width: calc(
          ${layoutColumns(12, [
            'var(--spectrum-global-dimension-size-4600)',
            'var(--spectrum-global-dimension-size-150)'
          ])}
        );
      `}>
      {heading && (
        <h2
          className="spectrum-Heading--L"
          css={css`
            margin-bottom: var(--spectrum-global-dimension-size-200) !important;
          `}>
          {heading.props.children}
        </h2>
      )}

      {text &&
        React.cloneElement(text, {
          className: 'spectrum-Body--L'
        })}
    </div>
  </section>
);

TitleBlock.propTypes = {
  heading: PropTypes.element,
  text: PropTypes.element,
  theme: PropTypes.string
};

export { TitleBlock };
