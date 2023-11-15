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

import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { withPrefix } from 'gatsby';
import { ProgressCircle } from '../ProgressCircle';
import { RedocStandalone } from 'redoc';
import { Footer } from '../Footer';
import { SIDENAV_WIDTH, MOBILE_SCREEN_WIDTH, isExternalLink } from '../../utils';
import PropTypes from 'prop-types';

const RedoclyAPI = ({ src }) => {
  return (
    <>
      <div id="redocly_container"/>
          <script src="https://cdn.redoc.ly/reference-docs/latest/redocly-reference-docs.min.js"></script>
          <script>{
            `RedoclyReferenceDocs.init(
               '${src}',
              {licenseKey: 'eyJ0IjpmYWxzZSwiaSI6MTY5OTY0MjY4MCwiZSI6MTcyNzcyOTQxNywiaCI6WyJyZWRvYy5seSIsImRldmVsb3Blci5hZG9iZS5jb20iLCJkZXZlbG9wZXItc3RhZ2UuYWRvYmUuY29tIl0sInMiOiJwb3J0YWwifQ==.T8gqRqclnJFKZgPU6WhGXNzBUJPNvqfraXqUg9PKNx3PVYS2LfxLgOS3pytNMyPCCSlcNY9l+JBx2rJqSIrXPQ=='},
              document.querySelector('#redocly_container'),
            );`
          }
          </script>
    </>
  );
};

RedoclyAPI.propTypes = {
  src: PropTypes.string
};

export { RedoclyAPI };
