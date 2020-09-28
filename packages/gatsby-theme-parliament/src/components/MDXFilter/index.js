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
  findSelectedPages,
  getElementChild
} from '../utils';

import { Flex } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';

import { Footer } from '../Footer';
import { Hero } from '../Hero';
import { Contributors } from '../Contributors';
import { Feedback } from '../Feedback';
import { GitHubActions } from '../GitHubActions';
import { Breadcrumbs } from '../Breadcrumbs';
import { OnThisPage } from '../OnThisPage';
import { NextSteps } from '../NextSteps';
import { NextPrev } from '../NextPrev';
import { OpenAPIBlock } from '@adobe/parliament-ui-components';

import { MDXComponents } from './MDXComponents';
import { MDXBlocks } from './MDXBlocks';

// Filters custom MDX components out of the markdown and applies magic rules
const filterChildren = ({ childrenArray, query }) => {
  const filteredChildren = [];

  let heroChild = null;
  let resourcesChild = null;

  while (childrenArray.length) {
    const child = childrenArray[0];
    let ignoredChildrenCount = 0;

    // Verify if child is a custom MDX component
    Object.keys(MDXBlocks).forEach((customComponent) => {
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
  if (query || typeof pageContext === 'undefined') {
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
    const { filteredChildren, heroChild, resourcesChild } = filterChildren({ childrenArray });

    const isDocs = hasSideNav && heroChild === null;
    const isDiscovery = heroChild !== null && heroChild.props.variant && heroChild.props.variant !== 'default';
    const isFirstSubPage = selectedPage?.path === selectedPageSiblings?.[0]?.path;

    return (
      <MDXProvider components={{ ...MDXComponents, ...MDXBlocks }}>
        {pageContext?.frontmatter?.openAPISpec ? (
          <OpenAPIBlock specUrl={pageContext.frontmatter.openAPISpec} />
        ) : (
          <>
            {heroChild && heroChild}
            <section
              css={css`
                ${isDiscovery
                  ? 'width: var(--spectrum-global-dimension-static-grid-fluid-width);'
                  : `
                max-width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
                margin: 0 var(--spectrum-global-dimension-size-800);
                `}
              `}>
              <Flex>
                <article
                  css={css`
                    width: ${isDiscovery
                      ? `
                      var(--spectrum-global-dimension-static-grid-fluid-width);
                      text-align: center;
                      `
                      : layoutColumns(isDocs ? 7 : 9)};
                  `}>
                  {isDocs && (
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

                  {isDocs && isFirstSubPage && <NextSteps pages={selectedPageSiblings} />}

                  {isDocs && <NextPrev nextPage={nextPage} previousPage={previousPage} />}

                  {!isDiscovery && (
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      marginTop="size-800"
                      marginBottom="size-400">
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
                  )}
                </article>

                {resourcesChild && resourcesChild}
              </Flex>
            </section>
            {!heroChild && (hasSideNav || isJsDoc) && <OnThisPage tableOfContents={tableOfContents} />}
            <Footer hasSideNav={hasSideNav} isCentered={isDiscovery} />
          </>
        )}
      </MDXProvider>
    );
  }
};
