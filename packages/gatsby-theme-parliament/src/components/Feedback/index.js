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

import React, { useState } from 'react';
import { css } from '@emotion/core';
import classNames from 'classnames';
import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Button } from '../Button';
import '@spectrum-css/toast';

const onFeedback = (setIsOpen) => {
  setIsOpen(true);
  setTimeout(() => {
    setIsOpen(false);
  }, 3000);
};

export const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Flex alignItems="center">
        <span
          css={css`
            padding-right: var(--spectrum-global-dimension-static-size-200);
          `}>
          Was this helpful ?
        </span>
        <Flex>
          <View marginEnd="size-200">
            <Button
              variant="primary"
              className="feedback-yes"
              onClick={() => {
                onFeedback(setIsOpen);
              }}>
              Yes
            </Button>
          </View>
          <View>
            <Button
              className="feedback-no"
              variant="primary"
              onClick={() => {
                onFeedback(setIsOpen);
              }}>
              No
            </Button>
          </View>
        </Flex>
      </Flex>
      <div
        className={classNames('spectrum-Toast', 'spectrum-Toast--positive', { 'is-open': isOpen })}
        role="alert"
        aria-live="polite"
        css={css`
          pointer-events: none;
          position: fixed;
          left: 50%;
          bottom: var(--spectrum-global-dimension-static-size-200);
          z-index: 10;
          visibility: hidden;
          opacity: 0;
          transform: translate3d(-50%, 0, 0);
          transition: transform var(--spectrum-global-animation-duration-100)
              var(--spectrum-global-animation-ease-in-out),
            opacity var(--spectrum-global-animation-duration-100) var(--spectrum-global-animation-ease-in-out),
            visibility var(--spectrum-global-animation-duration-0) var(--spectrum-global-animation-linear)
              var(--spectrum-global-animation-duration-100);

          &.is-open {
            pointer-events: auto;
            visibility: visible;
            opacity: 1;
            transition-delay: var(--spectrum-global-animation-duration-0);
            transform: translate3d(-50%, calc(-1 * var(--spectrum-global-dimension-static-size-200)), 0);
          }
        `}>
        <div className="spectrum-Toast-body">
          <div className="spectrum-Toast-content">Thank you for your feedback.</div>
        </div>
      </div>
    </>
  );
};
