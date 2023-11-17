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

const licenseKey = process.env.GATSBY_REDOCLY_KEY;

const OpenAPIBlock = ({ src }) => {
  const [showProgress, setShowProgress] = useState(true);

  let input = {};
  if (isExternalLink(src)) {
    input.specUrl = src;
  } else {
    input.spec = withPrefix(src);
  }

  useEffect(() => {
    if (!showProgress) {
      setShowProgress(true);
    }
  }, [src]);

  return (
    <>
      <div id="redocly_container"/>

      <script>{
        `RedoclyReferenceDocs.init(
               '${src}',
              {licenseKey: '${licenseKey}'},
              document.querySelector('#redocly_container'),
            );`
      }
      </script>

      <Footer />
    </>
  );
};

OpenAPIBlock.propTypes = {
  src: PropTypes.string
};

export {OpenAPIBlock};