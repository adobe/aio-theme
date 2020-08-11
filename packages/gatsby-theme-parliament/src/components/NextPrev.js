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
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import '@spectrum-css/typography';
import { View } from '@react-spectrum/view';
import { Flex } from '@react-spectrum/layout';
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';

const centered = css`
  display: flex;
  align-items: center;
  gap: var(--spectrum-global-dimension-static-size-100);
`;

const NextPrev = ({ nextPage, previousPage }) =>
  nextPage || previousPage ? (
    <div className="spectrum-Body--M">
      <Flex marginBottom="size-800" marginTop="size-800">
        <View>
          {previousPage && (
            <GatsbyLink className="spectrum-Link spectrum-Link--quiet" to={previousPage.path} rel="prev">
              <div
                css={css`
                  ${centered}
                `}>
                <ChevronLeft size="S" />
                {previousPage.title}
              </div>
            </GatsbyLink>
          )}
        </View>
        <View marginStart="auto">
          {nextPage && (
            <GatsbyLink className="spectrum-Link spectrum-Link--quiet" to={nextPage.path} rel="next">
              <div
                css={css`
                  ${centered}
                `}>
                {nextPage.title}
                <ChevronRight size="S" />
              </div>
            </GatsbyLink>
          )}
        </View>
      </Flex>
    </div>
  ) : null;

NextPrev.propTypes = {
  nextPage: PropTypes.object,
  previousPage: PropTypes.object
};

export { NextPrev };
