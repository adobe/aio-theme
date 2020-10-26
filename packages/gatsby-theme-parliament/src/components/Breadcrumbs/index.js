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
import { css } from '@emotion/core';
import { Link as GatsbyLink } from 'gatsby';
import '@spectrum-css/breadcrumb';

const Breadcrumbs = ({ selectedTopPage, selectedSubPages }) => (
  <nav aria-label="Breadcrumb" role="navigation">
    <ul
      className="spectrum-Breadcrumbs spectrum-Breadcrumbs--compact"
      css={css`
        display: block;
      `}>
      <li className="spectrum-Breadcrumbs-item">
        <GatsbyLink className="spectrum-Breadcrumbs-itemLink" to={selectedTopPage.path}>
          {selectedTopPage.title}
        </GatsbyLink>
        <svg
          className="spectrum-Icon spectrum-UIIcon-ChevronRightSmall spectrum-Breadcrumbs-itemSeparator"
          focusable="false"
          role="img"
          aria-hidden="true">
          <path
            d="M7 5a.747.747 0 00-.22-.53L2.54.23a.75.75 0 10-1.06 1.06L5.19 5 1.48 8.71a.75.75 0 101.06 1.06l4.24-4.24A.747.747 0 007 5z"
            className="spectrum-UIIcon--large"></path>
          <path
            d="M5.5 4a.747.747 0 00-.22-.53C4.703 2.862 3.242 1.5 2.04.23A.75.75 0 10.98 1.29L3.69 4 .98 6.71a.75.75 0 101.06 1.06l3.24-3.24A.747.747 0 005.5 4z"
            className="spectrum-UIIcon--medium"></path>
        </svg>
      </li>
      {selectedSubPages.map((page, index) => (
        <li className="spectrum-Breadcrumbs-item" key={index}>
          <GatsbyLink className="spectrum-Breadcrumbs-itemLink" to={page.path}>
            {page.title}
          </GatsbyLink>
          <svg
            className="spectrum-Icon spectrum-UIIcon-ChevronRightSmall spectrum-Breadcrumbs-itemSeparator"
            focusable="false"
            role="img"
            aria-hidden="true">
            <path
              d="M7 5a.747.747 0 00-.22-.53L2.54.23a.75.75 0 10-1.06 1.06L5.19 5 1.48 8.71a.75.75 0 101.06 1.06l4.24-4.24A.747.747 0 007 5z"
              className="spectrum-UIIcon--large"></path>
            <path
              d="M5.5 4a.747.747 0 00-.22-.53C4.703 2.862 3.242 1.5 2.04.23A.75.75 0 10.98 1.29L3.69 4 .98 6.71a.75.75 0 101.06 1.06l3.24-3.24A.747.747 0 005.5 4z"
              className="spectrum-UIIcon--medium"></path>
          </svg>
        </li>
      ))}
    </ul>
  </nav>
);

Breadcrumbs.propTypes = {
  selectedTopPage: PropTypes.object,
  selectedSubPages: PropTypes.array
};

export { Breadcrumbs };
