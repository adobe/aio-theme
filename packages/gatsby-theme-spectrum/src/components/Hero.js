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
import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';

const Hero = ({
  background = '#1D7DEE',
  textColor = 'var(--spectrum-global-color-gray-200)',
  heading,
  text,
  image
}) => {
  return (
    <section
      css={css`
        height: var(--spectrum-global-dimension-static-size-3400);
        margin-bottom: var(--spectrum-global-dimension-static-size-400);
        background-color: ${background};
      `}>
      <Flex height="100%" alignItems="center">
        <View marginStart="size-800">
          {React.cloneElement(heading, {
            className: 'spectrum-Heading--XL',
            css: css`
              margin-bottom: var(--spectrum-global-dimension-static-size-200);
              color: ${textColor};
            `
          })}

          {React.cloneElement(text, {
            className: 'spectrum-Body--L',
            css: css`
              margin-bottom: var(--spectrum-global-dimension-static-size-200);
              color: ${textColor};
            `
          })}
        </View>
        {image && (
          <View>
            {React.cloneElement(image, {
              className: '',
              css: css`
                margin: 0;
                & img {
                  min-width: 750px;
                  max-height: 210px;
                  object-fit: contain;
                }
              `
            })}
          </View>
        )}
      </Flex>
    </section>
  );
};

Hero.propTypes = {
  background: PropTypes.string,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element
};

export { Hero };
