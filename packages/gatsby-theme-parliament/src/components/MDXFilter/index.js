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
import Context from '../Context';
import {
  layoutColumns,
  findSelectedPage,
  findSelectedPageSiblings,
  findSelectedPageNextPrev,
  findSelectedTopPage,
  findSelectedPages
} from '../utils';

import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';

import globalTheme from '../../theme';

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from '../Heading';
import { Paragraph } from '../Paragraph';
import { List } from '../List';
import { Code } from '../Code';
import { InlineCode } from '../InlineCode';
import { Link } from '../Link';
import { Image } from '../Image';

import { Footer } from '../Footer';
import { Resources } from '../Resources';
import { Hero } from '../Hero';
import { DiscoverBlock } from '../DiscoverBlock';
import { CodeBlock } from '../CodeBlock';
import { Contributors } from '../Contributors';
import { Feedback } from '../Feedback';
import { InlineAlert } from '../InlineAlert';
import { GitHubActions } from '../GitHubActions';
import { Breadcrumbs } from '../Breadcrumbs';
import { OnThisPage } from '../OnThisPage';
import { NextSteps } from '../NextSteps';
import { NextPrev } from '../NextPrev';
import { OpenAPIBlock } from '../OpenAPIBlock';
import { Variant } from '../Variant';
import { JsDocParameters } from '../JsDocParameters';
import { Table, TBody, Th, Td, THead, Tr } from '@adobe/parliament-ui-components';

const theme = globalTheme.code;

const customComponents = {
  Hero,
  DiscoverBlock,
  Resources,
  InlineAlert,
  CodeBlock,
  Variant
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

// Filters custom MDX components out of the markdown and applies magic rules
const filterChildren = ({ childrenArray, tableOfContents, hasSideNav, isJsDoc, query }) => {
  const filteredChildren = [];

  let heroChild = null;
  let resourcesChild = null;

  let isFirstChild = true;

  while (childrenArray.length) {
    const child = childrenArray[0];
    let ignoredChildrenCount = 0;

    // Magic rule to render a Hero:
    // 1) First child has an image with a filename that starts with "hero"
    // 2) Second child is a heading level 1
    // 3) Third child is a paragraph
    if (isFirstChild) {
      if (child?.props?.children?.[0]?.props?.src) {
        const image = child.props.children[0].props.src.split('/').pop();
        if (
          image.toLowerCase().startsWith('hero') &&
          childrenArray?.[1]?.props?.mdxType === 'h1' &&
          childrenArray?.[2]?.props?.mdxType === 'p'
        ) {
          heroChild = <Hero image={child} heading={childrenArray[1]} text={childrenArray[2]} />;
          ignoredChildrenCount += 3;
        }
      }

      isFirstChild = false;
    }

    // Verify if child is a custom MDX component
    Object.keys(customComponents).forEach((customComponent) => {
      if (child?.props?.mdxType === customComponent) {
        ignoredChildrenCount++;

        let slots = [];
        // Custom MDX components have slots and/or repeat props to identify markdown content
        // It's currently not possible to Interleaving Markdown in JSX with MDX v1 (https://github.com/mdx-js/mdx/issues/628)
        if (child.props.slots || child.props.repeat) {
          const repeat = Math.max(parseInt(child.props.repeat) || 1, 1);

          for (let i = 0; i < repeat; i++) {
            slots = slots.concat(
              // Set default slots to element if repeat is defined
              (child.props.slots || 'element')
                .split(',')
                .map((slot, k) => [`${slot.trim()}${repeat === 1 ? '' : i}`, childrenArray[slots.length + k + 1]])
            );
          }
        }

        if (slots.length) {
          ignoredChildrenCount += slots.length;

          const props = Object.fromEntries(slots);

          if (child.props.mdxType === 'Variant') {
            // Set the query to define if the Variant should show its content
            props.query = query;
          } else if (child.props.mdxType === 'CodeBlock') {
            // Use the global code theme for CodeBlock
            props.theme = props.theme || theme;
          }

          const childClone = React.cloneElement(child, {
            ...props
          });

          if (child.props.mdxType === 'Hero') {
            // Only 1 Hero per page allowed
            heroChild = heroChild || childClone;
          } else if (child.props.mdxType === 'Resources') {
            // Only 1 Resources per page allowed
            resourcesChild = resourcesChild || childClone;
          } else {
            filteredChildren.push(childClone);
          }
        }
      }
    });

    if (ignoredChildrenCount === 0) {
      ignoredChildrenCount++;

      // Use the global code theme for Code
      if (child?.props?.mdxType === 'pre' && child?.props?.children?.props?.mdxType === 'code') {
        const { children: preChild, ...preProps } = child.props;
        filteredChildren.push(
          React.cloneElement(child, {
            children: React.cloneElement(preChild, {
              theme,
              ...preChild.props
            }),
            ...preProps
          })
        );
      } else {
        filteredChildren.push(child);
      }
    }

    childrenArray = childrenArray.splice(ignoredChildrenCount);
  }

  // Insert OnThisPage after heading 1 [+ Paragraph] if not a Hero
  if (!heroChild && (hasSideNav || isJsDoc)) {
    const heading1 = filteredChildren.find((child) => child?.props?.mdxType === 'h1');
    const heading1Index = filteredChildren.indexOf(heading1);
    const heading1Next = filteredChildren[heading1Index + 1];
    if (heading1) {
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
    resourcesChild
  };
};

const jsDocFilter = (childrenArray) => {
  const filteredArray = [];
  let jsDoc = null;
  let jsDocItems = [];
  let headingLevel = -1;

  for (let i = 0; i < childrenArray.length; i++) {
    let type = childrenArray[i]?.props?.mdxType;
    if (!jsDoc && type !== 'JsDocParameters') {
      // We are not in a JS Doc block so return the current element
      filteredArray.push(childrenArray[i]);
    } else if (type === 'JsDocParameters') {
      // We found a JS Doc block so save a pointer to it
      jsDoc = childrenArray[i];
    } else if (jsDoc) {
      // We are inside a JS Doc Block so we need to add children to it.
      if (type.match(/h\d/)) {
        // We found a header, so we need to check it's level (1-6)
        let level = parseInt(type.charAt(1, 10));
        if (level >= headingLevel) {
          // The heading is >= the current level so we are still in a JS Block
          headingLevel = level;
          jsDocItems.push(childrenArray[i]);
        } else {
          // The heading is less than current level so we are out of the JS Doc Block
          // Pop the previous child, the anchor, off the JS Doc block and onto the page
          filteredArray.push(jsDocItems.pop());

          // Finish the JS Doc Block
          filteredArray.push(
            React.cloneElement(jsDoc, {
              items: jsDocItems
            })
          );

          // Reset for the next loop
          jsDoc = null;
          jsDocItems = [];
          headingLevel = -1;

          // Push the header onto the page
          filteredArray.push(childrenArray[i]);
        }
      } else {
        // We are in a JS Doc block and the element is not a header
        // so add it to the JS Doc Block
        jsDocItems.push(childrenArray[i]);
      }
    }
  }

  // If we finished parsing all the elements but there is a
  // open JS Doc Block, finish it off
  if (jsDoc) {
    filteredArray.push(
      React.cloneElement(jsDoc, {
        items: jsDocItems
      })
    );
  }

  return filteredArray;
};

export default ({ children, pageContext, query }) => {
  let childrenArray = React.Children.toArray(children);

  // If we have a query, we are inside transclusion
  if (query) {
    const { filteredChildren } = filterChildren({ childrenArray, query });
    return <MDXProvider>{filteredChildren}</MDXProvider>;
  } else {
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
    selectedSubPages = selectedSubPages.filter((page, index) => !duplicates.includes(index));

    // JSDoc filter
    let isJsDoc = false;
    if (pageContext?.frontmatter?.jsDoc) {
      isJsDoc = true;
      childrenArray = jsDocFilter(childrenArray);
    }

    // Custom MDX components
    const { filteredChildren, heroChild, resourcesChild } = filterChildren({
      childrenArray,
      tableOfContents,
      hasSideNav,
      isJsDoc
    });

    const isGuides = hasSideNav && heroChild === null;
    const isFirstSubPage = selectedPage?.path === selectedPageSiblings?.[0]?.path;

    return (
      <MDXProvider components={mdxComponents}>
        {pageContext?.frontmatter?.openAPISpec ? (
          <OpenAPIBlock specUrl={pageContext.frontmatter.openAPISpec} />
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
                      <Feedback />
                    </View>
                  </Flex>
                </article>
                {resourcesChild && resourcesChild}
              </Flex>
            </section>
            <Footer hasSideNav={hasSideNav} />
          </>
        )}
      </MDXProvider>
    );
  }
};
