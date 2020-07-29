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

import React, { useContext } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import '@spectrum-css/typography';
import { View } from '@react-spectrum/view';
import { Flex } from '@react-spectrum/layout';
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import { findSelectedPageNextPrev } from './utils';
import Context from './Context';

export const NextPrev = () => {
  const { location, siteMetadata } = useContext(Context);
  const { next, prev } = findSelectedPageNextPrev(location.pathname, siteMetadata.subPages);

  return next || prev ? (
    <div className="spectrum-Body--M">
      <Flex marginBottom="size-800" marginTop="size-800">
        <View>
          {prev && (
            <GatsbyLink className="spectrum-Link spectrum-Link--quiet" to={prev.path} rel="prev">
              <Flex alignItems="center" gap="size-100">
                <ChevronLeft size="S" />
                {prev.title}
              </Flex>
            </GatsbyLink>
          )}
        </View>
        <View marginStart="auto">
          {next && (
            <GatsbyLink className="spectrum-Link spectrum-Link--quiet" to={next.path} rel="next">
              <Flex alignItems="center" gap="size-100">
                {next.title}
                <ChevronRight size="S" />
              </Flex>
            </GatsbyLink>
          )}
        </View>
      </Flex>
    </div>
  ) : null;
};
