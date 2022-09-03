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

import React, { forwardRef, useContext } from 'react';
import { Link, withPrefix } from 'gatsby';
import { fixInternalLink, isExternalLink, isInternalLink, trailingSlashFix } from '../../utils';
import PropTypes from 'prop-types';
import Context from '../Context';
import classNames from 'classnames';

const GatsbyLink = forwardRef(({ className, style, variant, to, ...props }, ref) => {
  if (props.role === 'button') {
    className = classNames([className, `spectrum-Button--${variant}`, `spectrum-Button--${style}`]);
  }

  if (isExternalLink(to)) {
    return <a className={classNames(className)} href={to} ref={ref} {...props} />;
  }

  const { location, allSitePage, pathPrefix } = useContext(Context);
  const pages = allSitePage.nodes.map(page => withPrefix(page.path));

  if (isInternalLink(to, location, pages)) {
    return (
      <Link
        className={classNames(className)}
        to={fixInternalLink(to, location, pathPrefix)}
        ref={ref}
        {...props}
      />
    );
  }
  // Support non folder structured links
  const fixedTo = `../${to}`;

  if (isInternalLink(fixedTo, location, pages)) {
    return (
      <Link
        className={classNames(className)}
        to={fixInternalLink(fixedTo, location, pathPrefix)}
        ref={ref}
        {...props}
      />
    );
  }

  // Support external relative links and linked files
  return (
    <a
      className={classNames(className)}
      href={
        to &&
        !new URL(to, 'https://example.com').pathname.split('.')[1] &&
        pathPrefix &&
        to.startsWith(trailingSlashFix(pathPrefix))
          ? to.replace(pathPrefix, '')
          : to
      }
      ref={ref}
      {...props}
    />
  );
});

GatsbyLink.propTypes = {
  variant: PropTypes.oneOf(['accent', 'primary', 'secondary', 'negative']),
  style: PropTypes.oneOf(['fill', 'outline']),
  to: PropTypes.string,
};

export { GatsbyLink };
