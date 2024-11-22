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
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// TODO: Revisit usage of keywords when/if it is replaced with category.
const SEO = ({ title, description, keywords }) => (
  <Helmet>
    <html lang="en" />
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords.join(', ')} />}
    <meta property="og:image" content="https://developer.adobe.com/shared/images/adobe-social-share.png" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
    <link rel="icon" href="https://www.adobe.com/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="https://www.adobe.com/favicon.ico" type="image/x-icon" />
    {process.env.GATSBY_ADOBE_ANALYTICS_ENV && (
      <script type="text/javascript">{`

        window.alloy_all = window.alloy_all || {};
        window.alloy_all.data = window.alloy_all.data || {};
        window.alloy_all.data._adobe_corpnew = window.alloy_all.data._adobe_corpnew || {};
        window.alloy_all.data._adobe_corpnew.digitalData = window.alloy_all.data._adobe_corpnew.digitalData || {};
        window.alloy_all.data._adobe_corpnew.digitalData.page = window.alloy_all.data._adobe_corpnew.digitalData.page || {};
        window.alloy_all.data._adobe_corpnew.digitalData.page.pageInfo = window.alloy_all.data._adobe_corpnew.digitalData.page.pageInfo || {};
        window.alloy_all.data._adobe_corpnew.digitalData.page.pageInfo.language = 'fr-FR';

        // Update Launch and EdgeConfig based your site
        var launchURL = 'https://assets.adobedtm.com/d4d114c60e50/a0e989131fd5/launch-5dd5dd2177e6.min.js';
        var edgeConfigId = '8d2805dd-85bf-4748-82eb-f99fdad117a6'; 
        // TODO: replace these with env keys setting to stage for now
      
        // modify this as necessary to target dev/qa/stage sites so that the data
        // flows into a different bucket for your dev sites
        var isDev = false;
        if (isDev) {
          edgeConfigId = '8d2805dd-85bf-4748-82eb-f99fdad117a6';
          // TODO: replace these with env keys setting to stage for now
          launchURL = 'https://assets.adobedtm.com/d4d114c60e50/a0e989131fd5/launch-2c94beadc94f-development.min.js';
        }
      
        window.marketingtech = {
          adobe: {
            launch: {
              url: launchURL,
              controlPageLoad: true,
            },
            alloy: {
              edgeConfigId: edgeConfigId,
            },
            target: true,
            audienceManager: true,
          }
        };
      `}</script>
    )}
    {process.env.GATSBY_ADOBE_ANALYTICS_ENV && (
      <script src="https://www.adobe.com/marketingtech/main.standard.min.js" async></script>
    )}

<script> 
  {`function sampleRUM(checkpoint, data = {}) {
    sampleRUM.defer = sampleRUM.defer || [];
    const defer = (fnname) => {
      sampleRUM[fnname] = sampleRUM[fnname]
        || ((...args) => sampleRUM.defer.push({ fnname, args }));
    };
    sampleRUM.drain = sampleRUM.drain
      || ((dfnname, fn) => {
        sampleRUM[dfnname] = fn;
        sampleRUM.defer
          .filter(({ fnname }) => dfnname === fnname)
          .forEach(({ fnname, args }) => sampleRUM[fnname](...args));
      });
    sampleRUM.on = (chkpnt, fn) => { sampleRUM.cases[chkpnt] = fn; };
    defer('observe');
    defer('cwv');
    try {
      window.hlx = window.hlx || {};
      if (!window.hlx.rum) {
        const usp = new URLSearchParams(window.location.search);
        const weight = (usp.get('rum') === 'on') ? 1 : 100; // with parameter, weight is 1. Defaults to 100.
        // eslint-disable-next-line no-bitwise
        const hashCode = (s) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
        const id = \`${hashCode(window.location.href)}-${new Date().getTime()}-${Math.random().toString(16).substr(2, 14)}\`;
        const random = Math.random();
        const isSelected = (random * weight < 1);
        // eslint-disable-next-line object-curly-newline
        window.hlx.rum = { weight, id, random, isSelected, sampleRUM };
      }
      const { weight, id } = window.hlx.rum;
      if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
        const sendPing = (pdata = data) => {
          // eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
          const body = JSON.stringify({ weight, id, referer: window.location.href, generation: window.hlx.RUM_GENERATION, checkpoint, ...data });
          const url = \`https://rum.hlx.page/.rum/${weight}\`;
          // eslint-disable-next-line no-unused-expressions
          navigator.sendBeacon(url, body);
          // eslint-disable-next-line no-console
          console.debug(\`ping:${checkpoint}\`, pdata);
        };
        sampleRUM.cases = sampleRUM.cases || {
          cwv: () => sampleRUM.cwv(data) || true,
          lazy: () => {
            // use classic script to avoid CORS issues
            const script = document.createElement('script');
            script.src = 'https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js';
            document.head.appendChild(script);
            sendPing(data);
            return true;
          },
        };
        sendPing(data);
        if (sampleRUM.cases[checkpoint]) { sampleRUM.cases[checkpoint](); }
      }
    } catch (error) {
      // something went wrong
    }
  }
  console.log("hello")
  `}
  </script>
  

  </Helmet>

);

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array
};

export { SEO };
