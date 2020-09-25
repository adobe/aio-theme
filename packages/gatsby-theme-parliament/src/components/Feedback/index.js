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
import { Flex } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';
import { Button } from '@adobe/react-spectrum';
import { DialogTrigger } from '@adobe/react-spectrum';
import { AlertDialog } from '@adobe/react-spectrum';

const FeedbackButton = ({ variant }) => (
  <DialogTrigger>
    <Button UNSAFE_className={`feedback-${variant.toLowerCase()}`} variant="primary">
      {variant}
    </Button>
    <AlertDialog title="Thank you for your feedback" primaryActionLabel="Close">
      Thank you for helping improve Adobe's documentation.
    </AlertDialog>
  </DialogTrigger>
);

export const Feedback = () => (
  <Flex alignItems="center">
    <span
      css={css`
        padding-right: var(--spectrum-global-dimension-size-200);
      `}>
      Was this helpful ?
    </span>
    <Flex>
      <View marginEnd="size-200">
        <FeedbackButton variant="Yes" />
      </View>
      <View>
        <FeedbackButton variant="No" />
      </View>
    </Flex>
  </Flex>
);
