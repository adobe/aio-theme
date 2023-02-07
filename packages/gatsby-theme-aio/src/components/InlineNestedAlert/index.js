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
import classNames from 'classnames';

const commonCss = css`
  font-size: 1rem;
  line-height: 1.3rem;
  padding-right: 30px;
`;

const getIconName = (variant) => {
  let icon = variant;

  if (variant === 'error' || variant === 'negative' || variant === 'warning') {
    icon = 'alert';
  }

  return `${icon.charAt(0).toUpperCase()}${icon.slice(1)}Medium`;
};

const InlineNestedAlertTexts = ({ texts }) => {
  let alertElement = [];
  Array.isArray(texts) ? texts.forEach(text => {
    alertElement.push(cloneElement(text, {
          className: 'spectrum-InLineAlert-content',
          css: css`
                margin-top: var(--spectrum-global-dimension-size-150);
                ${commonCss};
              `
        }));
  }) : alertElement.push(cloneElement(texts, {
    className: 'spectrum-InLineAlert-content',
    css: css`
                margin-top: var(--spectrum-global-dimension-size-150);
                ${commonCss};
              `
  }));
  return alertElement;
};

const InlineNestedAlert = ({ variant = 'info', header, iconPosition, ...props }) => {
  const Icon = Icons[getIconName(variant)] ? Icons[getIconName(variant)] : Icons.NeutralMedium;
  variant = variant === 'warning' ? 'negative' : variant;
  let textArr = [];
  if (Array.isArray(props.children) && header == "true") {
    textArr = props.children.slice(1)
  } else {
    textArr = props.children;
  }
  const alertCss = iconPosition === 'left' ? css`width: 98%;
            padding-left: 40px;
            margin-top: var(--spectrum-global-dimension-size-300);
            svg {
                left: 0;
                margin-left: var(--spectrum-global-dimension-size-175) !important;
            }` : css`min-width: 100%; margin-top: var(--spectrum-global-dimension-size-300)`;
  return (
    <div
      role="alert"
      className={classNames('spectrum-InLineAlert', `spectrum-InLineAlert--${variant}`)}
      css={alertCss}
      >
      <Icon className="spectrum-Icon spectrum-Icon--sizeM spectrum-InLineAlert-icon" />
      <div>
        {header === "true" &&
          cloneElement(props.children[0], {
            className: 'spectrum-InLineAlert-header',
            css: css`
              margin-top: 0;
              margin-bottom: 0.5rem;
              font-size: 1rem;
              line-height: 1.3rem;
            `
          })}
      </div>
      <InlineNestedAlertTexts texts={textArr} />
    </div>
  );
};

InlineNestedAlert.propTypes = {
  variant: PropTypes.string,
  header: PropTypes.element,
  text: PropTypes.element
};

export { InlineNestedAlert };
