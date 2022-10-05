/*
 * Copyright 2021 Adobe. All rights reserved.
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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '@spectrum-css/typography';

import { AnchorButton } from '../AnchorButton';


const AnchorButtonGroup = ({className, theme = 'light'}) => {
  return (
    <>
      <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-200) 0;
      `}>
        <div>
          <AnchorButton href="https://google.com" style="fill" variant="accent">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>

          <AnchorButton href="https://google.com" style="outline" variant="accent">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
        </div>
        <div>
          <AnchorButton href="https://google.com" style="fill" variant="primary">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
          <AnchorButton href="https://google.com" style="outline" variant="primary">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
        </div>
        <div>
          <AnchorButton href="https://google.com" style="fill" variant="secondary">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
          <AnchorButton href="https://google.com" style="outline" variant="secondary">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
        </div>
        <div>
          <AnchorButton href="https://google.com" style="fill" variant="negative">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
          <AnchorButton href="https://google.com" style="outline" variant="negative">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
        </div>
        <div>
          <AnchorButton href="https://google.com" style="fill" variant="staticWhite">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
          <AnchorButton href="https://google.com" style="outline" variant="staticWhite">
            <span class="spectrum-Button-label">Button</span>
          </AnchorButton>
        </div>
      </section>
    </>
  );
}

AnchorButtonGroup.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', 'lightest'])
};

export { AnchorButtonGroup };
