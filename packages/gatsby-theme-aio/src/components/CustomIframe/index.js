/*
 * Copyright 2022 Adobe. All rights reserved.
*/
import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '@spectrum-css/typography';
import { TABLET_SCREEN_WIDTH } from '../../utils';

const CustomIframeBlock = ({
  className,
  theme = 'lightest',
  source=""
}) => (
  <section
    className={classNames(className, `spectrum--${theme}`)}
    css={css`
      background-color:var(--spectrum-global-color-gray-100);
      padding :var(--spectrum-global-dimension-size-400);
      `
  }>
    <div 
      css={css`  
        max-width:calc(( var(--spectrum-global-dimension-size-6000) + var(--spectrum-global-dimension-size-5000) - var(--spectrum-global-dimension-size-500) ));
        text-align: center;
        margin: 0 auto;

        @media screen (max-width:${TABLET_SCREEN_WIDTH}){
          max-width:calc(( var(--spectrum-global-dimension-size-5000) + var(--spectrum-global-dimension-size-3400) ));
        }
    `}>
      <div 
        css={css`
          overflow: hidden;
          padding-top: 56.25%;
          position: relative;
      `}>
        <iframe
          title="Adobe-tv"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen="true"
          src={source}
          css={css` 
          position: absolute;
          border: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;`}
        />
      </div>
    </div>
  </section>
);

CustomIframeBlock.propTypes = {
  theme: PropTypes.string,
  source:PropTypes.string,
};

export { CustomIframeBlock };

