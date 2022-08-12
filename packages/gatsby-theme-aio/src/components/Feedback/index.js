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

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button } from '../Button';
import loadable from '@loadable/component';

let AlertDialog;

const FeedbackButton = ({ variant, setIsOpen }) => (
  <Button
    className={`feedback-${variant.toLowerCase()}`}
    variant="primary"
    style="outline"
    onClick={() => {
      setIsOpen(true);
    }}
    daa-ll={`Feedback-${variant}`}
    >
    {variant}
  </Button>
);

export const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !AlertDialog) {
      AlertDialog = loadable(() => import('../AlertDialog'));
      AlertDialog.load().then(() => {
        // Enable fade in animation by delaying opening after rendering is done
        setIsOpen(false);
        setIsLoaded(true);
        setTimeout(() => {
          setIsOpen(true);
        }, 100);
      });
    }
  }, [isOpen, setIsLoaded]);

  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}>
        <span
          css={css`
            padding-right: var(--spectrum-global-dimension-size-200);
          `}>
          Was this helpful?
        </span>
        <div
          css={css`
            display: flex;
          `}>
          <div
            css={css`
              margin-right: var(--spectrum-global-dimension-size-100);
            `}>
            <FeedbackButton variant="Yes" setIsOpen={setIsOpen} />
          </div>
          <div>
            <FeedbackButton variant="No" setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
      {isLoaded && (
        <AlertDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Thank you for your feedback">
          Thank you for helping improve Adobe's documentation.
        </AlertDialog>
      )}
    </>
  );
};
