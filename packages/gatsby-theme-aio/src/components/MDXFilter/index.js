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

import React, { Children, cloneElement, useContext } from 'react';
import { withPrefix } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/react';
import '@spectrum-css/divider';
import '@spectrum-css/actiongroup';
import Context from '../Context';
import {
  layoutColumns,
  findSelectedPage,
  findSelectedPageSiblings,
  findSelectedPageNextPrev,
  findSelectedTopPage,
  findSelectedTopPageMenu,
  findSelectedPages,
  DESKTOP_SCREEN_WIDTH,
  SIDENAV_WIDTH,
  DEFAULT_HOME,
  rootFix,
  rootFixPages,
  cleanRootFix
} from '../../utils';

import { Footer } from '../Footer';
import { Contributors } from '../Contributors';
import { Feedback } from '../Feedback';
import { GitHubActions } from '../GitHubActions';
import { Breadcrumbs } from '../Breadcrumbs';
import { Attribution } from '../Attribution';
import { Edition } from '../Edition';
import { OnThisPage } from '../OnThisPage';
import { NextSteps } from '../NextSteps';
import { NextPrev } from '../NextPrev';

import { jsDocFilter } from '../JsDocParameters';

import { MDXComponents } from './MDXComponents';
import { MDXBlocks } from './MDXBlocks';

// Filters custom MDX components out of the markdown
const filterChildren = ({ childrenArray, query, hasSideNav }) => {
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

          if (child.props.mdxType === 'Hero' && hasSideNav) {
            props.width = `calc(${DESKTOP_SCREEN_WIDTH} - ${SIDENAV_WIDTH});`;
          }

          const childClone = cloneElement(child, {
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
        } else {
          filteredChildren.push(child);
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

export default ({ children, pageContext, query }) => {
  const { hasSideNav, siteMetadata, location, allSitePage, allMdx, allGithub, allGithubContributors } =
    useContext(Context);
  const isTranscludedContent = typeof pageContext === 'undefined';
  let childrenArray = Children.toArray(children);

  if (isTranscludedContent || pageContext?.frontmatter?.layout === 'none') {
    const { filteredChildren } = filterChildren({ childrenArray: jsDocFilter(childrenArray), query, hasSideNav });
    return isTranscludedContent ? (
      <MDXProvider>{filteredChildren}</MDXProvider>
    ) : (
      <MDXProvider components={{ ...MDXComponents, ...MDXBlocks }}>
        {filteredChildren}
        <Footer hasSideNav={hasSideNav} />
      </MDXProvider>
    );
  } else {
    // PrevNext
    const selectedPage = findSelectedPage(location?.pathname, siteMetadata?.subPages);
    const selectedPageSiblings = findSelectedPageSiblings(location?.pathname, siteMetadata?.subPages);
    const { nextPage, previousPage } = findSelectedPageNextPrev(location?.pathname, siteMetadata?.subPages);

    // Attribution
    const contributorName = pageContext?.frontmatter?.contributor_name;
    const contributorLink = pageContext?.frontmatter?.contributor_link;

    // Edition
    const edition = pageContext?.frontmatter?.edition;

    // OnThisPage
    const componentPathObj = allSitePage?.nodes.find(({ path }) => withPrefix(path) === location?.pathname);
    const componentPath = componentPathObj?.component ?? '';
    const tableOfContentsObj = allMdx?.nodes.find(({ fileAbsolutePath }) => fileAbsolutePath === componentPath);
    const tableOfContents = tableOfContentsObj?.tableOfContents ?? {};

    // Github
    const { repository, default_branch: branch, root } = allGithub?.nodes[0];
    const contributorsObj = allGithubContributors?.nodes.find(
      ({ path: fileAbsolutePath }) => fileAbsolutePath === componentPath
    );
    const contributors = contributorsObj?.contributors ?? [];
    const pagePath = componentPath.replace(/.*\/src\/pages\//g, '');

    // Breadcrumbs
    const hideBreadcrumbNav =
      pageContext?.frontmatter?.hideBreadcrumbNav !== undefined ? pageContext.frontmatter.hideBreadcrumbNav : false;
    if (typeof hideBreadcrumbNav != 'boolean') {
      throw new Error('hideBreadcrumbNav is not a boolean. Correct use hideBreadcrumbNav: true');
    }
    const { home } = siteMetadata;
    const pathWithRootFix = rootFix(location.pathname);
    const pagesWithRootFix = rootFixPages(siteMetadata?.pages);
    const selectedTopPage = findSelectedTopPage(pathWithRootFix, pagesWithRootFix);
    const selectedTopPageMenu = findSelectedTopPageMenu(pathWithRootFix, selectedTopPage);
    const selectedPages = findSelectedPages(location?.pathname, siteMetadata?.subPages);

    // Remove duplicated levels
    let selectedSubPages = [];
    if (selectedPages.length) {
      const levels = selectedPages[selectedPages.length - 1].level + 1;
      for (let level = 0; level < levels; level++) {
        const selectedSubPage = selectedPages.filter((page) => page.level === level);
        if (selectedSubPage.length) {
          // Add the last item corresponding to the current level
          selectedSubPages.push(selectedSubPage.pop());
        }
      }
    }

    // JSDoc filter
    let isJsDoc = false;
    if (pageContext?.frontmatter?.jsDoc) {
      isJsDoc = true;
      childrenArray = jsDocFilter(childrenArray);
    }

    // Custom MDX components
    const { filteredChildren, heroChild, resourcesChild } = filterChildren({ childrenArray, hasSideNav });

    const isDocs = heroChild === null;
    const isDocsOverview = heroChild !== null && (!heroChild.props.variant || heroChild.props.variant === 'default');
    const isDiscovery = heroChild !== null && heroChild.props.variant && heroChild.props.variant !== 'default';

    const tableOfContentsItems = tableOfContents?.items?.[0]?.items;
    const hasOnThisPage =
      !heroChild &&
      (hasSideNav || isJsDoc) &&
      tableOfContentsItems &&
      (tableOfContentsItems.length > 1 ||
        (tableOfContentsItems.length === 1 && tableOfContentsItems[0]?.items?.length > 1) ||
        tableOfContentsItems[0]?.title);
    const isFirstSubPage = selectedPage?.pathname === selectedPageSiblings?.[0]?.pathname;

    const columns = 12;
    const diff = [];
    if (hasOnThisPage) {
      diff.push(`${layoutColumns(2)} - var(--spectrum-global-dimension-size-400)`);
    }
    if (hasSideNav) {
      diff.push(SIDENAV_WIDTH);
    }

    return (
      <MDXProvider components={{ ...MDXComponents, ...MDXBlocks }}>
        <main
          css={css`
            align-items: center;
            justify-content: center;
            display: flex;
            flex-direction: column;
          `}>
          {heroChild && heroChild}
          <div
            css={css`
              ${isDiscovery
                ? 'width: var(--spectrum-global-dimension-static-grid-fluid-width);'
                : `
                max-width: ${DESKTOP_SCREEN_WIDTH};
                margin: 0 var(--spectrum-global-dimension-size-800);
                `}

              ${isDocsOverview &&
              `
                h2:first-of-type {
                  margin-top: 0 !important;
                }
              `}

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                max-width: none;
                margin: 0 var(--spectrum-global-dimension-size-400);
              }
            `}>
            <div
              css={css`
                display: flex;
              `}>
              <div
                css={css`
                  width: ${isDiscovery
                    ? `
                      var(--spectrum-global-dimension-static-grid-fluid-width);
                      text-align: center;
                      `
                    : layoutColumns(columns, diff)};

                  @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                    width: 100%;
                  }
                `}>
                {isDocs && (
                  <div
                    css={css`
                      display: flex;
                      margin-top: var(--spectrum-global-dimension-size-500);
                      margin-bottom: var(--spectrum-global-dimension-size-500);

                      @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                        flex-direction: column;
                      }
                    `}>
                    {!hideBreadcrumbNav && selectedTopPage && (
                      <div
                        css={css`
                          margin-right: var(--spectrum-global-dimension-size-400);
                        `}>
                        {home?.hidden !== true && home?.title && home?.href ? (
                          <Breadcrumbs
                            pages={[
                              DEFAULT_HOME,
                              home,
                              { ...selectedTopPage, href: withPrefix(selectedTopPage.href) },
                              selectedTopPageMenu && {
                                ...selectedTopPageMenu,
                                href: withPrefix(selectedTopPageMenu.href)
                              },
                              ...selectedSubPages.map((page) => ({
                                ...page,
                                href: withPrefix(cleanRootFix(page.href))
                              }))
                            ]}
                          />
                        ) : (
                          <Breadcrumbs
                            pages={[
                              DEFAULT_HOME,
                              { ...siteMetadata?.pages?.[0], href: withPrefix(siteMetadata?.pages?.[0]?.href) },
                              { ...selectedTopPage, href: withPrefix(selectedTopPage.href) },
                              selectedTopPageMenu && {
                                ...selectedTopPageMenu,
                                href: withPrefix(selectedTopPageMenu.href)
                              },
                              ...selectedSubPages.map((page) => ({
                                ...page,
                                href: withPrefix(cleanRootFix(page.href))
                              }))
                            ]}
                          />
                        )}
                      </div>
                    )}
                    <div
                      css={css`
                        margin-left: auto;
                        display: flex;
                        align-items: center;

                        @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                          margin-left: 0;
                          margin-top: var(--spectrum-global-dimension-size-200);
                        }
                      `}>
                      <GitHubActions repository={repository} branch={branch} root={root} pagePath={pagePath} />
                    </div>
                  </div>
                )}
                <div
                  css={css`
                    display: block;
                  `}>
                  {edition && <Edition name={edition} />}
                  {contributorLink && <Attribution name={contributorName} link={contributorLink} />}
                </div>

                {filteredChildren}

                {isDocs && isFirstSubPage && <NextSteps pages={selectedPageSiblings} />}

                {isDocs && <NextPrev nextPage={nextPage} previousPage={previousPage} />}

                {!isDiscovery && (
                  <div
                    css={css`
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;
                      justify-content: space-between;
                      margin-bottom: var(--spectrum-global-dimension-size-200);
                    `}>
                    <div>
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
                    </div>
                    <div
                      css={css`
                        @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                          margin-top: var(--spectrum-global-dimension-size-200);
                        }
                      `}>
                      <Feedback />
                    </div>
                  </div>
                )}
              </div>
              {hasOnThisPage && <OnThisPage tableOfContents={tableOfContents} />}
              {resourcesChild && resourcesChild}
            </div>
          </div>
          <Footer hasSideNav={hasSideNav} />
        </main>
      </MDXProvider>
    );
  }
};
