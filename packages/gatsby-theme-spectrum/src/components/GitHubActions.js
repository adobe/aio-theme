import { graphql, useStaticQuery } from 'gatsby';
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
import { withPrefix } from 'gatsby';
import { Flex } from '@react-spectrum/layout';
import { ActionButton, Text } from './ActionButton';
import { Bug, Edit } from './Icons';
import { css } from '@emotion/core';
import Context from './Context';

export const GitHubActions = () => {
  const { siteMetadata, location, allSitePage } = useContext(Context);
  const { repository, branch } = siteMetadata.github;

  const { componentPath } = allSitePage.nodes.find((page) => withPrefix(page.path) === location.pathname);
  const path = componentPath.replace(/.*\/src\/pages\//g, '');

  return (
    <Flex>
      <ActionButton isQuiet href={`https://github.com/${repository}/edit/${branch}/src/pages/${path}`}>
        <Edit />
        <Text>Edit in Github</Text>
      </ActionButton>

      <ActionButton
        href={`https://github.com/${repository}/issues/new?body=Issue%20in%20/src/pages/${path}`}
        isQuiet
        css={css`
          margin-inline-start: var(--spectrum-global-dimension-static-size-100);
        `}>
        <Bug />
        <Text>Log an issue</Text>
      </ActionButton>
    </Flex>
  );
};
