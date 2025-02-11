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
  </Helmet>
);

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array
};

export { SEO };