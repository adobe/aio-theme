/*
 * Copyright 2021 Adobe. All rights reserved.
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
import '@spectrum-css/badge';
import '@spectrum-css/link';
import { Star } from '../Icons';
import { css } from '@emotion/react';
import classNames from 'classnames';

const Attribution = ({ ...props }) => {
  return (
    <div>
      <span
        className={classNames('spectrum-Badge', 'spectrum-Badge--sizeS', 'spectrum-Badge--neutral')}
        css={css`
          display: inline-flex;
          align-items: center;
        `}>
        <Star />
        <a
          href={`${props.link}`}
          className={classNames('spectrum-Link', 'spectrum-Link--overBackground', 'spectrum-Link--quiet')}
          target="_blank">{`Thanks to ${props.name} for contributing this topic!`}</a>
      </span>
    </div>
  );
};

Attribution.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string
};

export { Attribution };
