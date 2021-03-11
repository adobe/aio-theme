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
import '@spectrum-css/progresscircle';

export const ProgressCircle = () => (
  <div
    aria-label="Loading"
    className="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--large">
    <div className="spectrum-ProgressCircle-track"></div>
    <div className="spectrum-ProgressCircle-fills">
      <div className="spectrum-ProgressCircle-fillMask1">
        <div className="spectrum-ProgressCircle-fillSubMask1">
          <div className="spectrum-ProgressCircle-fill"></div>
        </div>
      </div>
      <div className="spectrum-ProgressCircle-fillMask2">
        <div className="spectrum-ProgressCircle-fillSubMask2">
          <div className="spectrum-ProgressCircle-fill"></div>
        </div>
      </div>
    </div>
  </div>
);
