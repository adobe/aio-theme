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

import React from 'react';
import { css } from '@emotion/core';
import '@spectrum-css/typography';
import { Button, View } from '@adobe/react-spectrum';
import PropTypes from 'prop-types';

const AnnouncementBlock = ({ heading, text, button, theme = 'light' }) => {
  const link = button?.props?.children;

  return (
    <section
      className={`spectrum--${theme}`}
      css={css`
        display: flex;
        background: var(--spectrum-global-color-gray-100);
        box-sizing: border-box;
        padding: var(--spectrum-global-dimension-static-size-400) 0;
        text-align: center;
        height: calc(var(--spectrum-global-dimension-size-2000) + var(--spectrum-global-dimension-size-125));
      `}>
      <div
        css={css`
          margin: auto;
        `}>
        {heading && (
          <h3
            className="spectrum-Heading--M"
            css={css`
              margin-top: 0 !important;
              margin-bottom: var(--spectrum-global-dimension-static-size-100) !important;
            `}>
            {heading.props.children}
          </h3>
        )}

        {text &&
          React.cloneElement(text, {
            className: 'spectrum-Body--M'
          })}

        {link && (
          <View marginTop="size-200">
            <Button elementType="a" href={link.props.href} variant="primary">
              {link.props.children}
            </Button>
          </View>
        )}
      </div>
    </section>
  );
};

AnnouncementBlock.propTypes = {
  heading: PropTypes.element,
  text: PropTypes.element,
  button: PropTypes.element,
  theme: PropTypes.string
};

export { AnnouncementBlock };
