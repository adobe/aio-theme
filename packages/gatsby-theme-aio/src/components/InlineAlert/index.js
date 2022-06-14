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

import React, { cloneElement } from 'react';
import { css } from '@emotion/react';
import * as Icons from '../Icons';
import PropTypes from 'prop-types';
import '@spectrum-css/inlinealert';
import './index.css';

const getIconName = (variant) => {
  let icon = variant;

  if (variant === 'error' || variant === 'negative' || variant === 'warning') {
    icon = 'alert';
  }

  return `${icon.charAt(0).toUpperCase()}${icon.slice(1)}Medium`;
};

const InlineAlert = ({ variant = 'info', header, text }) => {
  const Icon = Icons[getIconName(variant)] ? Icons[getIconName(variant)] : Icons.NeutralMedium;
  variant = variant === 'warning' ? 'negative' : variant;

  return (
    <div role="alert" className={`spectrum-InLineAlert spectrum-InLineAlert--${variant}`}>
      <Icon className="spectrum-Icon spectrum-Icon--sizeM spectrum-InLineAlert-icon" />
      <div>
        {header && (cloneElement(header, { className: 'spectrum-InLineAlert-header', css: css` margin-top: 0; font-size: 1rem; line-height: 1.3rem` }))}
      </div>
      {cloneElement(text, { className: 'spectrum-InLineAlert-content', css: css` margin-top: 0; font-size: 1rem; line-height: 1.3rem` })}
    </div>
  );
};

InlineAlert.propTypes = {
  variant: PropTypes.string,
  header: PropTypes.element,
  text: PropTypes.element
};

export { InlineAlert };
