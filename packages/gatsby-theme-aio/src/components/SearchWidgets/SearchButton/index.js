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

import { GatsbyLink } from '../../GatsbyLink';
import '@spectrum-css/actionbutton';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Magnify } from '../../Icons';
import { css } from '@emotion/react';

const SearchButton = ({ href, ...props }) => {
  return (
    <div
      css={css`
        padding: 0 10px 0 10px;
      `}>
      <GatsbyLink
        role="button"
        className={classNames(
          'spectrum-ActionButton',
          'spectrum-ActionButton--sizeM',
          `spectrum-ActionButton--quiet`,
          'spectrum-Button--quiet'
        )}
        to={href}
        {...props}>
        <Magnify />
      </GatsbyLink>
    </div>
  );
};

SearchButton.propTypes = {
  href: PropTypes.string,
  github: PropTypes.object
};

export { SearchButton };
