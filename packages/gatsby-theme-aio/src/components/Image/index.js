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

import React, {useContext} from 'react';
import { css } from '@emotion/react';
import { DESKTOP_SCREEN_WIDTH } from '../../utils';
import {TableContext} from "../Context";

export const Image = (props) => {
  const {isTable} = useContext(TableContext);
  // Check if gatsby-remark-images-remote processing was skipped
  if (!props.src || props.src.default || props.src.endsWith('.svg') || props.src.endsWith('.gif') || !props.loading) {
    // Defaults to same as gatsby-remark-images-remote loading config
    props.loading = props.loading || 'lazy';

    if (props.src.default) {
      props.src = props.src.default;
    }

    // Recreate gatsby-remark-images-remote styles and classes
    return (
      <span
        className="gatsby-resp-image-wrapper"
        css={css`
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: ${DESKTOP_SCREEN_WIDTH};
        `}>
        <span className="gatsby-resp-image-background-image" />
        <img
          {...props}
          alt={props.alt}
          className="gatsby-resp-image-image"
          css={css`
             max-width: ${isTable ? '100%' : ''};
            width: ${isTable ? '' : '100%'};
            opacity: 1;
            transition: opacity 0.5s;
          `}
        />
      </span>
    );
  }

  return <img {...props} alt={props.alt} />;
};
