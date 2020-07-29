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
import * as Icons from './Icons';
import PropTypes from 'prop-types';

import '@spectrum-css/alert';

const Alert = ({ variant = 'info', text }) => {
  const Icon = Icons[`${variant.charAt(0).toUpperCase()}${variant.slice(1)}Medium`];

  return (
    <div
      role="alert"
      variant={variant}
      className={`spectrum-Alert spectrum-Alert--${variant}`}
      css={css`
        width: 100%;
      `}>
      <Icon className="spectrum-Alert-icon" />
      <div
        className="spectrum-Alert-content"
        css={css`
          margin-top: 0;
          margin-right: var(--spectrum-global-dimension-static-size-400);
        `}>
        {React.cloneElement(text, {
          className: ' ',
          css: css`
            margin: 0 !important;
          `
        })}
      </div>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.element
};

export { Alert };
