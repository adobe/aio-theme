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
import { getElementChild } from '../../utils';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { YouTube } from 'mdx-embed';

const getYouTubeId = (url) => {
  if (url.hostname.startsWith('youtube.com') || url.hostname.startsWith('www.youtube.com')) {
    const queryParams = new URLSearchParams(url.search);
    return queryParams.get('v');
  } else if (url.hostname.startsWith('youtu.be')) {
    return url.pathname.slice(1);
  }
};

const Media = ({ video, ...props }) => {
  if (!video) {
    return null;
  }

  const link = getElementChild(video);
  const videos = ["mp4", "3gp", "ogg"];
  const url = new URL(link.props.href);
  const extension = url.pathname.split(".")?.at(-1);
  const youTubeId = getYouTubeId(new URL(link.props.href));
  if (youTubeId) {
    return (
      <div
        css={css`
          margin: var(--spectrum-global-dimension-size-400) auto;
        `}
        {...props}>
        <YouTube youTubeId={youTubeId} />
      </div>
    );
  }

  return extension && videos.includes(extension) ?
    ( <video
      controls
      src={link.props.href}
      css={css`
        display: block;
        width: 100%;
        margin: var(--spectrum-global-dimension-size-400) auto;
      `}
      {...props}
    />
  ) : (
      <iframe src={link.props.href}  css={css`
        display: block;
        margin: var(--spectrum-global-dimension-size-400) auto;
      `} {...props}/>
    )
    ;
};

Media.propTypes = {
  video: PropTypes.element
};

export { Media };
