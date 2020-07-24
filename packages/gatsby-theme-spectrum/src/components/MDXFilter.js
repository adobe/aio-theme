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
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import Context from './Context';
import { layoutColumns, findSelectedPagePrevious, findSelectedPageNext, findSelectedPageSiblings } from './utils';

import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';

import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Heading4 } from './Heading4';
import { Paragraph } from './Paragraph';
import { List } from './List';
import { Code } from './Code';
import { InlineCode } from './InlineCode';
import { Link } from './Link';
import { Image } from './Image';

import { Footer } from './Footer';
import { Resources } from './Resources';
import { Hero } from './Hero';
import { ContentBlock } from './ContentBlock';
import { Contributors } from './Contributors';
import { Feedback } from './Feedback';
import { Alert } from './Alert';
import { GitHubActions } from './GitHubActions';
import { Breadcrumbs } from './Breadcrumbs';

const customComponents = {
  Hero,
  ContentBlock,
  Resources,
  Alert
};

const mdxComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  ul: List,
  code: Code,
  inlineCode: InlineCode,
  a: Link,
  img: Image,
  ...customComponents
};

const filterChildren = (children) => {
  let childrenArray = React.Children.toArray(children);
  const filteredChildren = [];

  let heroChild;
  let resourcesChild;

  while (childrenArray.length) {
    const child = childrenArray[0];

    let ignoredChildrenCount = 0;
    Object.keys(customComponents).forEach((customComponent) => {
      if (child?.props?.mdxType === customComponent) {
        ignoredChildrenCount++;
        let slots = child.props.slots.split(',').map((slot, i) => [slot.trim(), childrenArray[i + 1]]);

        if (slots.length) {
          ignoredChildrenCount += slots.length;

          slots = Object.fromEntries(slots);

          const childClone = React.cloneElement(child, {
            ...slots
          });

          if (child.props.mdxType === 'Hero') {
            heroChild = childClone;
          } else if (child.props.mdxType === 'Resources') {
            resourcesChild = childClone;
          } else {
            filteredChildren.push(childClone);
          }
        }
      }
    });

    if (ignoredChildrenCount === 0) {
      ignoredChildrenCount++;
      filteredChildren.push(child);
    }

    childrenArray = childrenArray.splice(ignoredChildrenCount);
  }

  return {
    filteredChildren,
    heroChild,
    resourcesChild
  };
};

export default ({ children, pageContext }) => {
  const { filteredChildren, heroChild, resourcesChild } = filterChildren(children);
  const { hasSideNav, siteMetadata, allMdx, allSitePage, location } = useContext(Context);

  console.log(findSelectedPagePrevious(location.pathname, siteMetadata.subPages));
  console.log(findSelectedPageNext(location.pathname, siteMetadata.subPages));
  console.log(findSelectedPageSiblings(location.pathname, siteMetadata.subPages));
  console.log(allMdx);
  console.log(allSitePage);

  return (
    <MDXProvider components={mdxComponents}>
      {heroChild && heroChild}
      <section
        css={css`
          max-width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
          margin: 0 var(--spectrum-global-dimension-static-size-800);
        `}>
        <Flex>
          <article
            css={css`
              width: ${layoutColumns(9, [
                'var(--spectrum-global-dimension-static-size-400)',
                'var(--spectrum-global-dimension-static-size-200)',
                'var(--spectrum-global-dimension-static-size-100)'
              ])};
            `}>
            {hasSideNav && typeof heroChild === 'undefined' && (
              <Flex marginTop="size-400" gap="size-400">
                <View>
                  <Breadcrumbs />
                </View>
                <View marginStart="auto">
                  <GitHubActions />
                </View>
              </Flex>
            )}
            {filteredChildren}
            <Flex alignItems="center" justifyContent="space-between" marginTop="size-800" marginBottom="size-400">
              <View>
                {pageContext.frontmatter.contributors && (
                  <Contributors
                    href="#"
                    contributors={pageContext.frontmatter.contributors}
                    date={new Date().toLocaleDateString()}
                  />
                )}
              </View>
              <View>
                <Feedback
                  onYes={() => {
                    alert('thanks');
                  }}
                  onNo={() => {
                    alert('why not ?');
                  }}
                />
              </View>
            </Flex>
          </article>
          {resourcesChild && resourcesChild}
        </Flex>
      </section>
      <Footer />
    </MDXProvider>
  );
};
