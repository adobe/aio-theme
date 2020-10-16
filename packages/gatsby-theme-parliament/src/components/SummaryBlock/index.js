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
import { HeroImage, HeroButtons } from '../Hero';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';

const SummaryBlock = ({
  background = 'var(--spectrum-global-color-gray-100)',
  theme = 'dark',
  heading,
  text,
  image,
  buttons
}) => (
  <section
    className={`spectrum--${theme}`}
    css={css`
      height: calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-225));
      background: ${background};
      position: relative;
    `}>
    <HeroImage image={image} />

    <div
      css={css`
        box-sizing: border-box;
        padding-left: var(--spectrum-global-dimension-size-800);
        width: calc(7 * 100% / 12);
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        text-align: left;
      `}>
      {heading && (
        <h2
          className="spectrum-Heading--L"
          css={css`
            margin-top: 0 !important;
            margin-bottom: var(--spectrum-global-dimension-size-200) !important;
          `}>
          {heading.props.children}
        </h2>
      )}

      {text &&
        React.cloneElement(text, {
          className: 'spectrum-Body--L',
          css: css`
            margin-bottom: var(--spectrum-global-dimension-size-300) !important;
            color: var(--spectrum-global-color-gray-900);
            margin-top: 0;
          `
        })}

      <HeroButtons buttons={buttons} quiets={[false, true]} variants={['overBackground', 'overBackground']} />
    </div>
  </section>
);

SummaryBlock.propTypes = {
  background: PropTypes.string,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element,
  buttons: PropTypes.element,
  variant: PropTypes.string,
  theme: PropTypes.string
};

export { SummaryBlock };
