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
import '@spectrum-css/typography';
import PropTypes from 'prop-types';
import { TABLET_SCREEN_WIDTH, layoutColumns, MOBILE_SCREEN_WIDTH } from '../../utils';
import classNames from 'classnames';
import loadable from '@loadable/component';

let SwiperBlock;

const Carousel = ({
  className,
  theme = 'dark',
  imageStyle = {},
  speed = 600,
  delay = 2500,
  enableNavigation = false,
  slideTheme,
  bulletActiveClass = 'swiper-pagination-bullet-active',
  bulletClass = 'swiper-pagination-bullet',
  ...props
}) => {
  // Load swiper lib only on demand
  if (!SwiperBlock) {
    SwiperBlock = loadable(() => import('./SwiperBlock'));
  }

  return (
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-200) 0;
      `}>
      <div
        css={css`
          max-width: calc(${layoutColumns(12)});
          margin: auto;
          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
            max-width: calc(${layoutColumns(3)});
          }
          @media screen and (min-width: ${MOBILE_SCREEN_WIDTH}) and (max-width: ${TABLET_SCREEN_WIDTH}) {
            padding-bottom: 0;
            margin-top: 0;
            max-width: calc(${layoutColumns(6)});
          }
        `}>
        {SwiperBlock && (
          <SwiperBlock
            speed={speed}
            delay={delay}
            bulletActiveClass={bulletActiveClass}
            bulletClass={bulletClass}
            imageStyle={imageStyle}
            slideTheme={slideTheme}
            theme={theme}
            enableNavigation={enableNavigation}
            props={props}
          />
        )}
      </div>
    </section>
  );
};

Carousel.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', 'lightest']),
  imageStyle: PropTypes.string,
  speed: PropTypes.number,
  delay: PropTypes.number,
  enableNavigation: PropTypes.bool,
  slideTheme: PropTypes.oneOf(['light', 'dark']),
  bulletActiveClass: PropTypes.string,
  bulletClass: PropTypes.string
};

export { Carousel };
