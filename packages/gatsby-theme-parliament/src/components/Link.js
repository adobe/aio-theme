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
import PropTypes from 'prop-types';
import '@spectrum-css/link';
import classNames from 'classnames';

const Link = ({ children, className, variant = 'primary', isQuiet = true, href, ...props }) => (
  <a
    {...props}
    href={href}
    className={classNames(className, `spectrum-Link spectrum-Link--${variant}`, { 'spectrum-Link--quiet': isQuiet })}>
    {children}
  </a>
);

Link.propTypes = {
  variant: PropTypes.string,
  isQuiet: PropTypes.bool,
  href: PropTypes.string
};

export { Link };
