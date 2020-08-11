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
import classNames from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import '@spectrum-css/typography';
import '@adobe/prism-adobe';

export const Code = ({ children, className = '' }) => {
  const language = className.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => {
        const lines = tokens.slice(0, -1);
        const isMultiLine = lines.length > 1;

        return (
          <pre className={classNames(className, 'spectrum-Code4')}>
            {tokens.slice(0, -1).map((line, i) => {
              const { style: lineStyles, ...lineProps } = getLineProps({ line, key: i });

              return (
                <div
                  key={i}
                  css={css`
                    display: table-row;
                  `}>
                  {isMultiLine && (
                    <span
                      css={css`
                        display: table-cell;
                        color: var(--spectrum-global-color-gray-500);
                        text-align: left;
                        padding-right: var(--spectrum-global-dimension-static-size-200);
                        user-select: none;
                      `}>
                      {i + 1}
                    </span>
                  )}
                  <span {...lineProps}>
                    {line.map((token, key) => {
                      const { style: tokenStyles, ...tokenProps } = getTokenProps({ token, key });
                      return <span key={key} {...tokenProps} />;
                    })}
                  </span>
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
};
