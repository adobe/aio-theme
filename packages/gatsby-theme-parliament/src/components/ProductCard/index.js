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

import React, { useEffect } from 'react';
import { css } from '@emotion/core';
import { HeroButtons } from '../Hero';
import '@spectrum-css/typography';
import '@spectrum-css/card';
import PropTypes from 'prop-types';

let counter = 0;
const alignMapping = ['flex-start', 'flex-end'];

const ProductCard = ({ theme = 'lightest', width = '100%', icon, heading, text, buttons }) => {
  let columns = 100 / parseFloat(width);

  if (width === '33%') {
    width = `${(100 / 3).toFixed(2)}%`;
    columns = 3;
  }

  if (columns > 1) {
    counter++;
  }

  useEffect(() => {
    return () => {
      if (columns > 1) {
        counter--;
      }
    };
  });

  return (
    <section
      className={`spectrum--${theme}`}
      css={css`
        display: inline-flex;
        flex-direction: column;
        align-items: ${columns === 3 ? alignMapping[counter % 3] || 'center' : 'center'};
        width: ${width};
        padding: var(--spectrum-global-dimension-size-400) 0;
        background: var(--spectrum-global-color-gray-100);
      `}>
      <div
        role="figure"
        tabIndex="0"
        className="spectrum-Card"
        css={css`
          width: var(--spectrum-global-dimension-size-3600);
          height: calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-500));
        `}>
        <div className="spectrum-Card-body">
          <div
            css={css`
              height: var(--spectrum-global-dimension-size-800);
            `}>
            {icon &&
              React.cloneElement(icon, {
                css: css`
                  height: var(--spectrum-global-dimension-size-600);
                  width: var(--spectrum-global-dimension-size-600);

                  img {
                    display: block;
                    height: 100%;
                    object-fit: contain;
                  }
                `
              })}
          </div>
          <div className="spectrum-Card-header">
            <div className="spectrum-Card-title">{heading && <strong>{heading.props.children}</strong>}</div>
          </div>
          <div
            className="spectrum-Card-content"
            css={css`
              text-align: left;
              height: var(--spectrum-global-dimension-size-1700);
              overflow: auto;
            `}>
            {text && text.props.children}
          </div>
        </div>
        <div
          className="spectrum-Card-footer"
          css={css`
            text-align: right;
          `}>
          <HeroButtons buttons={buttons} quiets={[true, false]} variants={['secondary', 'primary']} />
        </div>
      </div>
    </section>
  );
};

ProductCard.propTypes = {
  theme: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.element,
  heading: PropTypes.element,
  text: PropTypes.element,
  buttons: PropTypes.element
};

export { ProductCard };
