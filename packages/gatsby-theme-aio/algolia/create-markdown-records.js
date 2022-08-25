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

const { selectAll } = require('unist-util-select');

// const markdownObjects = edges.map(({ node: mdxFile }) => {
//   // Creates new markdown data objects from the mdxQuery source data (from the markdown files in src/pages).
//   return {
//     id: mdxFile.id,
//     contentDigest: mdxFile.internal.contentDigest,
//     lastUpdated: mdxFile.modifiedTime,
//     size: mdxFile.size,
//     headings: mdxFile['childMdx'].headings,
//     content: mdxFile['childMdx'].excerpt,
//     words: mdxFile['childMdx'].wordCount.words,
//     fileAbsolutePath: mdxFile['childMdx'].fileAbsolutePath, // Required for additional source data
//     slug: mdxFile['childMdx'].slug,
//     title: mdxFile['childMdx'].frontmatter.title,
//     description: mdxFile['childMdx'].frontmatter.description,
//     keywords: mdxFile['childMdx'].frontmatter.keywords, // Used for search filters
//     openAPISpec: mdxFile['childMdx'].frontmatter.openAPISpec, // Required for OpenAPI sources
//     frameSrc: mdxFile['childMdx'].frontmatter.frameSrc, // Required for iframe sources
//     spotlight: mdxFile['childMdx'].frontmatter.spotlight, // Added to elevate records from file
//     mdxAST: mdxFile['childMdx'].mdxAST,
//   };
// });

// TODO: Finish implementation
async function createMarkdownRecords(mdxObject) {
  return {
    objectID: mdxObject.id,
    contentDigest: mdxObject.contentDigest,
    title: getTitle(mdxObject), // Get title from headings.depth
    description: getDescription(mdxObject),
    keywords: getKeywords(mdxObject),
    headings: getHeadings(mdxObject),
    content: getContent(mdxObject),
    contentHeading: getClosestHeading(mdxObject),
    words: getWords(mdxObject),
    size: getSize(mdxObject),
    lastUpdated: getLastUpdated(mdxObject),
    slug: getSlug(mdxObject),
    headingAnchor: getAnchor(mdxObject),
    url: getUrl(mdxObject),
    spotlight: getSpotlight(mdxObject),
  };

  function getTitle(node) {
    return node.title ?? node.headings.filter(headings.depth === 1);
  }

  function getDescription(node) {
    return node.description ?? node.content ?? null;
  }

  function getContent(node) {
    return node.content ?? node.description ?? null;
  }

  // TODO: Either expand this or remove and just use node.keywords
  function getKeywords(node) {
    return node.keywords ?? null;
  }

  // TODO: Reduce cardinality for use in search customRanking setting
  function getWords(node) {
    return node.words ?? 0;
  }

  // TODO: Reduce cardinality for use in search customRanking setting
  function getSize(node) {
    return node?.size;
  }

  function getLastUpdated(node) {
    return node.lastModified ?? '';
  }

  // TODO: Either expand this or remove and just use node.slug
  function getSlug(node) {
    return node.slug;
  }

  // TODO: Figure out how to get the record position. Use a different method based on mdxAST paragraph returned
  function getPreviousHeadings(node) {
    // const firstLevelParagraphs = selectAll('root > paragraph', node.mdxAST);
    // const selectedParagraphs = selectAll('root > heading ~ paragraph', node.mdxAST);
    //
    // const previousHeadings = selectAll('heading text', node.mdxAST)
    //   .filter(heading => heading.position.start.line < record.position.end.line)
    //   .map(heading => heading.value);
    // return previousHeadings;
  }

  // TODO: Either expand this or remove and just use node.headings
  function getHeadings(node) {
    return node.headings;
  }

  // TODO: Get the first heading that is above the record's content
  function getClosestHeading(node) {
    return node.headings.slice(-1)[0]; // last heading in the array is closest
  }

  // TODO: Create heading anchors for all node.headings, then use the one with the closest proximity to the record's matching paragraph content.
  function getAnchor(node) {
    // const heading = getClosestHeading(node);
    if (node.headings.length <= 0) return '';

    return `#${node.headings
      .slice(-1)
      .toString()
      ?.match(/[a-zA-Z0-9]\w+/g)
      ?.map(s => s.toLowerCase())
      .join('-')}`;
  }

  function getUrl(node) {
    const slug = getSlug(node);
    const anchor = getAnchor(node);
    return `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${slug == null ? '' : slug}${anchor}`;
  }

  // TODO: Add spotlight as a new frontmatter node in gatsby-node.js
  function getSpotlight(node) {
    return node.spotlight ?? '';
  }
}

module.exports = createMarkdownRecords;
