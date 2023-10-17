
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

import React, { useEffect } from 'react';
import { css } from "@emotion/react";
import * as Icons from '../Icons';
import '@spectrum-css/inlinealert';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Info = () => {
  return (
    <div css={css` & > svg { fill: var(--spectrum-inlinealert-info-border-color, var(--spectrum-semantic-informative-border-color)); } `}>
      <Icons.InfoMedium />
    </div>
  )
}

const Warning = () => {
  return (
    <div css={css` & > svg { fill: var(--spectrum-inlinealert-negative-border-color, var(--spectrum-semantic-notice-border-color)); } `}>
      <Icons.WarningMedium />
    </div>
  )
}

const cssForContent = css`
  font-size: 1rem;
  line-height: 1.3rem;
  text-align:left;
`;

const cssForTitle = css`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.3rem;
  font-weight: bold;
  text-align:left;
`

const Content = ({ styles, textValue }) => {

  useEffect(() => {
    const textContainers = document.getElementsByClassName('textContainer');

    for (let i = 0; i < textContainers.length; i++) {
      const anchorTags = textContainers[i].getElementsByTagName('a');

      for (let j = 0; j < anchorTags.length; j++) {
        const anchorTag = anchorTags[j];
        if (!anchorTag.hasAttribute('target')) {
          anchorTag.setAttribute('target', '_blank');
        }
      }
    }
  }, []);

  return (
    <p className="textContainer" css={css`

    & > a {
      text-decoration: none;
      color: var(--spectrum-link-m-primary-text-color, var(--spectrum-alias-link-primary-text-color-default));
    }

    & > a:hover {
      text-decoration: underline;
    }

    ${styles}`} dangerouslySetInnerHTML={{ __html: textValue }} />
  )
}

const AnnouncementBanner = ({ notice }) => {

  const { title, type, text } = notice;
  const variant = type === "info" ? "info" : type === "warning" ? "negative" : "netural";

  return (
    <div
      css={css`
        display : flex;
        justify-content:center;
        width:100%;
        margin: auto;
      `}>
      <div
        role="alert"
        className={classNames('spectrum-InLineAlert', `spectrum-InLineAlert--${variant}`)}
        css={css` 
          min-width: 100%;
          border-color : ${type === "notice" && "transparent"} !important;
          background-color : ${type === "notice" && "#fffaba"} !important;
        `}>
        <div class="spectrum-InLineAlert-header"
          css={css`
              display : flex;
              justify-content: space-between;
          `}>
          {title && <Content styles={cssForTitle} textValue={title} />}
          {type === "info" ? <Info /> : type === "warning" ? <Warning /> : null}
        </div>
        {text && <Content styles={cssForContent} textValue={text} />}
      </div>
    </div>
  )
}

AnnouncementBanner.propTypes = {
  heading: PropTypes.object,
};

export { AnnouncementBanner }