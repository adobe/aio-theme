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
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import Context from './Context';
import {
  layoutColumns,
  findSelectedPage,
  findSelectedPageSiblings,
  findSelectedPageNextPrev,
  findSelectedTopPage,
  findSelectedPages
} from './utils';

import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from './Heading';
import { Paragraph } from './Paragraph';
import { List } from './List';
import { Code } from './Code';
import { InlineCode } from './InlineCode';
import { Link } from './Link';
import { Image } from './Image';

import { Footer } from './Footer';
import { Resources } from './Resources';
import { Hero } from './Hero';
import { DiscoverBlock } from './DiscoverBlock';
import { CodeBlock } from './CodeBlock';
import { Contributors } from './Contributors';
import { Feedback } from './Feedback';
import { Alert } from './Alert';
import { GitHubActions } from './GitHubActions';
import { Breadcrumbs } from './Breadcrumbs';
import { OnThisPage } from './OnThisPage';
import { NextSteps } from './NextSteps';
import { NextPrev } from './NextPrev';
import { OpenAPIBlock } from './OpenAPIBlock';
import { JsDocParameters } from './JsDocParameters';

import { Table, TBody, Th, Td, THead, Tr } from '@adobe/parliament-ui-components';

const customComponents = {
  Hero,
  DiscoverBlock,
  Resources,
  Alert,
  CodeBlock,
  OpenAPIBlock
};

const mdxComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  p: Paragraph,
  ul: List,
  code: Code,
  inlineCode: InlineCode,
  a: Link,
  img: Image,
  table: Table,
  tbody: TBody,
  th: Th,
  td: Td,
  thead: THead,
  tr: Tr,
  JsDocParameters,
  ...customComponents
};

const filterChildren = (childrenArray, tableOfContents) => {
  const filteredChildren = [];

  let heroChild;
  let resourcesChild;
  let openAPIChild;

  while (childrenArray.length) {
    const child = childrenArray[0];

    let ignoredChildrenCount = 0;
    Object.keys(customComponents).forEach((customComponent) => {
      if (child?.props?.mdxType === customComponent) {
        ignoredChildrenCount++;

        let slots = [];
        if (child.props.slots) {
          const repeat = Math.max(parseInt(child.props.repeat) || 1, 1);

          for (let i = 0; i < repeat; i++) {
            slots = slots.concat(
              child.props.slots
                .split(',')
                .map((slot, k) => [`${slot.trim()}${repeat === 1 ? '' : i}`, childrenArray[slots.length + k + 1]])
            );
          }
        }

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
        } else if (child.props.mdxType === 'OpenAPIBlock') {
          openAPIChild = child;
        }
      }
    });

    if (ignoredChildrenCount === 0) {
      ignoredChildrenCount++;
      filteredChildren.push(child);
    }

    childrenArray = childrenArray.splice(ignoredChildrenCount);
  }

  if (!heroChild) {
    const heading1 = filteredChildren.find((child) => child?.props?.mdxType === 'h1');
    const heading1Index = filteredChildren.indexOf(heading1);
    const heading1Next = filteredChildren[heading1Index + 1];
    if (heading1) {
      // TODO
      filteredChildren.splice(
        heading1Index + (heading1Next?.props?.mdxType === 'p' ? 2 : 1),
        0,
        <OnThisPage key="-1" tableOfContents={tableOfContents} />
      );
    }
  }

  return {
    filteredChildren,
    heroChild,
    resourcesChild,
    openAPIChild
  };
};

const jsDocFilter = (children) => {
  let childrenArray = React.Children.toArray(children);
  const filteredArray = [];
  let jsDoc = null;
  let jsDocItems = [];
  let headingLevel = -1;

  for (let i = 0; i < childrenArray.length; i++) {
    let type = childrenArray[i]?.props?.mdxType;
    if (!jsDoc && type !== 'JsDocParameters') {
      filteredArray.push(childrenArray[i]);
    } else if (type === 'JsDocParameters') {
      jsDoc = childrenArray[i];
    } else if (jsDoc) {
      if (type.match(/h\d/)) {
        // found a header
        let level = parseInt(type.charAt(1, 10));
        if (level >= headingLevel) {
          headingLevel = level;
          jsDocItems.push(childrenArray[i]);
        } else {
          // the anchor gets gobbled
          filteredArray.push(jsDocItems.pop());

          // break out of loop
          const jsDocClone = React.cloneElement(jsDoc, {
            items: jsDocItems
          });
          filteredArray.push(jsDocClone);
          jsDoc = null;
          jsDocItems = [];
          headingLevel = -1;

          filteredArray.push(childrenArray[i]);
        }
      } else {
        jsDocItems.push(childrenArray[i]);
      }
    }
  }
  if (jsDoc) {
    const jsDocClone = React.cloneElement(jsDoc, {
      items: jsDocItems
    });
    filteredArray.push(jsDocClone);
  }

  return filteredArray;
};

export default ({ children, pageContext }) => {
  const { hasSideNav, siteMetadata, location, allSitePage, allMdx, allGithub, allGithubContributors } = useContext(
    Context
  );

  // PrevNext
  const selectedPage = findSelectedPage(location.pathname, siteMetadata.subPages);
  const selectedPageSiblings = findSelectedPageSiblings(location.pathname, siteMetadata.subPages);
  const { nextPage, previousPage } = findSelectedPageNextPrev(location.pathname, siteMetadata.subPages);

  // OnThisPage
  const { componentPath } = allSitePage.nodes.find(({ path }) => withPrefix(path) === location.pathname);
  const { tableOfContents } = allMdx.nodes.find(({ fileAbsolutePath }) => fileAbsolutePath === componentPath);

  // Github
  const { repository, branch, root } = allGithub.nodes[0];
  const { contributors } = allGithubContributors.nodes.find(
    ({ path: fileAbsolutePath }) => fileAbsolutePath === componentPath
  );
  const pagePath = componentPath.replace(/.*\/src\/pages\//g, '');

  // Breadcrumbs
  const selectedTopPage = findSelectedTopPage(location.pathname, siteMetadata.pages);
  let selectedSubPages = findSelectedPages(location.pathname, siteMetadata.subPages);
  const duplicates = [];
  if (selectedSubPages.length > 2 && selectedSubPages[0].path === selectedSubPages[1]?.path) {
    duplicates.push(1);
  }
  if (selectedSubPages.length > 4 && selectedSubPages[2].path === selectedSubPages[3]?.path) {
    duplicates.push(3);
  }
  selectedSubPages = selectedSubPages.filter((page, index) => duplicates.indexOf(index) === -1);

  // Custom MDX components
  const processedChildren = jsDocFilter(children);
  const { filteredChildren, heroChild, resourcesChild, openAPIChild } = filterChildren(
    processedChildren,
    tableOfContents
  );

  const isGuides = hasSideNav && typeof heroChild === 'undefined';
  const isFirstSubPage = selectedPage?.path === selectedPageSiblings?.[0]?.path;

  return (
    <MDXProvider components={mdxComponents}>
      {openAPIChild ? (
        openAPIChild
      ) : (
        <>
          {heroChild && heroChild}
          <section
            css={css`
              max-width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
              margin: 0 var(--spectrum-global-dimension-static-size-800);
            `}>
            <Flex>
              <article
                css={css`
                  width: ${layoutColumns(isGuides ? 7 : 9, [
                    'var(--spectrum-global-dimension-static-size-400)',
                    'var(--spectrum-global-dimension-static-size-200)',
                    'var(--spectrum-global-dimension-static-size-100)'
                  ])};
                `}>
                {isGuides && (
                  <Flex marginTop="size-400">
                    <View marginEnd="size-400">
                      <Breadcrumbs selectedTopPage={selectedTopPage} selectedSubPages={selectedSubPages} />
                    </View>
                    <View marginStart="auto">
                      <GitHubActions repository={repository} branch={branch} root={root} pagePath={pagePath} />
                    </View>
                  </Flex>
                )}
                {filteredChildren}
                {isGuides && isFirstSubPage && <NextSteps pages={selectedPageSiblings} />}
                {isGuides && <NextPrev nextPage={nextPage} previousPage={previousPage} />}
                <Flex alignItems="center" justifyContent="space-between" marginTop="size-800" marginBottom="size-400">
                  <View>
                    <Contributors
                      repository={repository}
                      branch={branch}
                      root={root}
                      pagePath={pagePath}
                      contributors={contributors}
                      externalContributors={pageContext?.frontmatter?.contributors}
                      date={
                        contributors[0]
                          ? new Date(contributors[0].date).toLocaleDateString()
                          : new Date().toLocaleDateString()
                      }
                    />
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
        </>
      )}
    </MDXProvider>
  );
};
