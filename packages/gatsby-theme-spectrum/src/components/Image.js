import React from 'react';
import {css} from '@emotion/core';

export default ({alt, src}) => (
  <img
    alt={alt}
    src={src}
    css={css`
      max-width: 100%;
      border-radius: 4px;
    `}/>
);