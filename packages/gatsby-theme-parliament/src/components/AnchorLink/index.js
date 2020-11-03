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
import { Link as GatsbyLink } from 'gatsby';
import { getExternalLinkProps, isExternalLink, fixPathPrefix } from '../../utils';
import { Link } from '@adobe/react-spectrum';
import PropTypes from 'prop-types';

const AnchorLink = ({ href, ...props }) => {
  if (isExternalLink(href)) {
    return (
      <Link isQuiet={true}>
        <a href={href} {...getExternalLinkProps(href)} {...props} />
      </Link>
    );
  }

  return (
    <Link isQuiet={true}>
      <GatsbyLink to={fixPathPrefix(href)} {...props} />
    </Link>
  );
};

AnchorLink.propTypes = {
  href: PropTypes.string
};

export { AnchorLink };
