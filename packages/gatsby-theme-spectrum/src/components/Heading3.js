import React from 'react';
import {css} from '@emotion/core';
import '@spectrum-css/typography/dist/index-vars.css';
import {Link} from '@react-spectrum/link';

export default ({children, ...props}) => (
  <>
    <h3
      {...props}
      className="spectrum-Heading--M"
      css={css`
        & a {
          visibility: hidden;
        }
        
        &:hover a {
          visibility: visible;
        }
      `}>
      {children}
      <Link marginStart="size-50">
        <a href={`#${props.id}`}>#</a>
      </Link>
    </h3>
  </>
);