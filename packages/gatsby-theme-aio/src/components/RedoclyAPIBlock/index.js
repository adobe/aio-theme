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
const all = 'all';

// Redocly API Block that will render the OpenAPI yaml files with Redocly TryIt feature.
const RedoclyAPIBlock = ({
  src, width = '500px',
  typography = 'fontFamily: `adobe-clean, "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Trebuchet MS", "Lucida Grande", sans-serif`',
  codeBlock = "tokens: { punctuation: { color: 'white' }}",
  disableSidebar = false,
  disableSearch = false,
  hideTryItPanel = false,
  jsonSampleExpandLevel = 2,
  generateCodeSamples = 'languages: [], skipOptionalParameters: false,',
  requestInterceptor = '',
}) => {
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
          <div id="redocly_container" />

          <script>{
            `RedoclyReferenceDocs.init(
               '${src}',
              {licenseKey: '${licenseKey}',
               disableSidebar: ${disableSidebar}, 
               disableSearch: ${disableSearch},
               hideTryItPanel: ${hideTryItPanel},
               jsonSampleExpandLevel: ${jsonSampleExpandLevel === all ? `'${jsonSampleExpandLevel}'` : jsonSampleExpandLevel},
               ${generateCodeSamples ? "generateCodeSamples: { " + generateCodeSamples + "}," : ''}
               ${requestInterceptor ? "requestInterceptor: " + requestInterceptor + "," : ''}
               hideLoading: true,
               theme: {
                ${typography ? "typography: { " + typography + "}," : ''}
                rightPanel: {
                  width: '${width}',
                  },
                  ${codeBlock ? "codeBlock: { " + codeBlock + "}," : ''}
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
  src: PropTypes.string,
  width: PropTypes.string,
  typography: PropTypes.string,
  codeBlock: PropTypes.string,
  disableSidebar: PropTypes.bool,
  disableSearch: PropTypes.bool,
  hideTryItPanel: PropTypes.bool,
  jsonSampleExpandLevel: PropTypes.oneOfType([
    PropTypes.oneOf([all]), 
    PropTypes.number,
  ]),
  generateCodeSamples: PropTypes.string,
  requestInterceptor: PropTypes.string,
};

export { RedoclyAPIBlock };