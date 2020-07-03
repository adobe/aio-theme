import React from 'react';
import {css} from '@emotion/core';
import '@spectrum-css/typography/dist/index-vars.css';
import '@spectrum-css/well/dist/index-vars.css';

export default ({children, ...props}) => (
  <code {...props}
        className="spectrum-Code4 spectrum-Well"
        css={css`
          padding:0 4px; display: inline-block; min-width: auto;
        `}>
    {children}
  </code>
)