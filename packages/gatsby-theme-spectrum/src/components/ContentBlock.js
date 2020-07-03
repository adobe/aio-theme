import React from 'react';
import {css} from '@emotion/core';
// https://github.com/mdx-js/mdx/issues/628
import MDX from '@mdx-js/runtime';

export default ({children}) => {
  return (
    <div
      css={css`
        display: inline-block;
        max-width: ${3 * 1120 / 12}px;
        & a {
          display: block;
          margin-bottom: 8px;
        }
      `}>
      {children && <MDX>{children}</MDX>}
    </div>
  );
}