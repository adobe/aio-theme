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
import { withPrefix } from 'gatsby';
import { SIDENAV_WIDTH, MOBILE_SCREEN_WIDTH, isExternalLink } from '../../utils';
import PropTypes from 'prop-types';

const licenseKey = process.env.GATSBY_REDOCLY_KEY;

// Redocly API Block that will render the OpenAPI yaml files with Redocly TryIt feature.
const RedoclyAPIBlock = ({ src }) => {
  const [isRedoclyLoading, setIsRedoclyLoading] = useState(true);

  let input = {};
  if (isExternalLink(src)) {
    input.specUrl = src;
  } else {
    input.spec = withPrefix(src);
  }

  useEffect(() => {
    let script = document.createElement('script')
    script.setAttribute('src', 'https://cdn.redoc.ly/reference-docs/latest/redocly-reference-docs.min.js');
    script.async = true;
    document.head.appendChild(script);
    let console = document.createElement('script');
    console.src = 'https://cdn.redoc.ly/reference-docs/latest/console.redocly-reference-docs.min.js';
    console.async = true;
    document.head.appendChild(console);


    script.addEventListener('load', () => {
      setIsRedoclyLoading(false);
    })
  }, [isRedoclyLoading]);

  return (
    <>
      {!isRedoclyLoading && (
        <>
          <div id="redocly_container"/>

          <script>{
            `RedoclyReferenceDocs.init(
               '${src}',
              {licenseKey: '${licenseKey}',
               theme: {
                rightPanel: {
                  width: '500px',
                  },
                },
              },
              document.querySelector('#redocly_container'),
            );`
          }
          </script>
        </>)}
    </>
  );
};

RedoclyAPIBlock.propTypes = {
  src: PropTypes.string
};

export { RedoclyAPIBlock };