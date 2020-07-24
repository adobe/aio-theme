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
import classNames from 'classnames';
import '@spectrum-css/icon';

const commonProps = {
  focusable: false,
  'aria-hidden': true,
  role: 'img'
};

export const Adobe = (props) => (
  <svg {...props} {...commonProps} viewBox="0 0 30 26" fill="#E1251B" aria-label="Adobe">
    <polygon points="19,0 30,0 30,26"></polygon>
    <polygon points="11.1,0 0,0 0,26"></polygon>
    <polygon points="15,9.6 22.1,26 17.5,26 15.4,20.8 10.2,20.8"></polygon>
  </svg>
);

export const ChevronDown = ({ className, ...props }) => (
  <svg
    {...props}
    {...commonProps}
    className={classNames(className, 'spectrum-Icon', 'spectrum-UIIcon-ChevronDownMedium')}>
    <path
      d="M11.99 1.51a1 1 0 00-1.707-.707L6 5.086 1.717.803A1 1 0 10.303 2.217l4.99 4.99a1 1 0 001.414 0l4.99-4.99a.997.997 0 00.293-.707z"
      className="spectrum-UIIcon--large"></path>
    <path
      d="M9.99 1.01A1 1 0 008.283.303L5 3.586 1.717.303A1 1 0 10.303 1.717l3.99 3.98a1 1 0 001.414 0l3.99-3.98a.997.997 0 00.293-.707z"
      className="spectrum-UIIcon--medium"></path>
  </svg>
);

export const Edit = ({ ...props }) => (
  <svg {...props} {...commonProps} viewBox="0 0 36 36" className="spectrum-Icon spectrum-Icon--sizeS">
    <path d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"></path>
  </svg>
);

export const Bug = ({ ...props }) => (
  <svg {...props} {...commonProps} viewBox="0 0 36 36" className="spectrum-Icon spectrum-Icon--sizeS">
    <path d="M26.194 7.242A9.8 9.8 0 0 0 18 3a9.8 9.8 0 0 0-8.194 4.242A11.943 11.943 0 0 0 18 10.5a11.943 11.943 0 0 0 8.194-3.258zm-20.978-.85L2.548 7.726a18.1 18.1 0 0 0 4.581 5.114A27.459 27.459 0 0 0 6.118 18H0v3h6.045a13.6 13.6 0 0 0 2.5 6.363 15.078 15.078 0 0 0-4.5 6.16l2.7 1.35a12.052 12.052 0 0 1 3.774-5.2 11.571 11.571 0 0 0 5.981 3.185V13.5A14.982 14.982 0 0 1 5.216 6.392zM36 21v-3h-6.118a27.459 27.459 0 0 0-1.011-5.16 18.1 18.1 0 0 0 4.581-5.114l-2.668-1.334A14.982 14.982 0 0 1 19.5 13.5v19.358a11.571 11.571 0 0 0 5.979-3.185 12.052 12.052 0 0 1 3.774 5.2l2.7-1.35a15.078 15.078 0 0 0-4.5-6.16A13.6 13.6 0 0 0 29.955 21z"></path>
  </svg>
);
