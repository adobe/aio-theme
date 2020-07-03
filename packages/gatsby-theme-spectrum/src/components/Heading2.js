import React from 'react';
import {css} from '@emotion/core';
import '@spectrum-css/typography/dist/index-vars.css';
import {Divider} from '@react-spectrum/divider';
import {Link} from '@react-spectrum/link';

export default ({children, ...props}) => (
  <>
    <h2
      {...props}
      className="spectrum-Heading--L"
      css={css`
        & a {
          visibility: hidden;
        }
        
        &:hover a {
          visibility: visible;
        }
      `}>
      {children}
      <Link marginStart="size-100">
        <a href={`#${props.id}`}>#</a>
      </Link>
    </h2>
    <Divider marginBottom="size-300"/>
  </>
);