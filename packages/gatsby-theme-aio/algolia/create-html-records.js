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

// async function createMarkdownRecords(mdxObject) {
//   return {
//     objectID: mdxObject.id,
//     contentDigest: mdxObject.contentDigest,
//     title: getTitle(mdxObject), // Get title from headings.depth
//     description: getDescription(mdxObject),
//     keywords: getKeywords(mdxObject),
//     headings: getHeadings(mdxObject),
//     content: getContent(mdxObject),
//     contentHeading: getClosestHeading(mdxObject),
//     words: getWords(mdxObject),
//     size: getSize(mdxObject),
//     lastUpdated: getLastUpdated(mdxObject),
//     slug: getSlug(mdxObject),
//     headingAnchor: getAnchor(mdxObject),
//     url: getUrl(mdxObject),
//     spotlight: getSpotlight(mdxObject),
//   };

// TODO: Finish implementation based on createMarkdownRecords()
async function createHtmlRecords(node, htmlObject) {
  return htmlObject.map(htmlRecord => {
    return {
      objectID: getId(node, htmlRecord),
      contentDigest: getContentDigest(node, htmlRecord),
      title: getTitle(node, htmlRecord),
      description: getDescription(node, htmlRecord),
      keywords: getKeywords(node, htmlRecord),
      content: getContent(node, htmlRecord),
      contentHeading: getContentHeading(node, htmlRecord),
      words: getWordCount(node, htmlRecord),
      size: getSize(node),
      lastUpdated: getLastUpdated(node, htmlRecord),
      slug: getSlug(node, htmlRecord),
      headingAnchor: getAnchor(node, htmlRecord),
      url: getUrl(node, htmlRecord),
      spotlight: getSpotlight(node, htmlRecord),
    };
  });
}

function getId(node, htmlRecord) {
  return htmlRecord?.objectID ?? node?.objectID;
}

function getContentDigest(node, htmlRecord) {
  return node?.contentDigest ?? htmlRecord?.contentDigest;
}

function getTitle(node, htmlRecord) {
  return htmlRecord?.headings[0] ?? node.title ?? '';
}

function getDescription(node, htmlRecord) {
  return htmlRecord?.content ?? node.description ?? '';
}

function getContent(node, htmlRecord) {
  return htmlRecord?.content ?? node?.description ?? '';
}

function getKeywords(node) {
  return node.keywords ?? [];
}

// TODO: Fix so that it works with custom anchor headings provided by gatsby-remark-autolink-headers plugin.
function getHtmlAnchor(heading) {
  if (heading == null) return '';

  heading =
    typeof heading === 'object'
      ? Object.values(heading)[0]
          .toString()
          .match(/[a-zA-Z0-9]\w+/g)
          ?.map(s => s.toLowerCase())
          .join('-')
      : heading
          .match(/[a-zA-Z0-9]\w+/g)
          ?.map(s => s.toLowerCase())
          .join('-');

  return heading;
}

function getNodeAnchor(headings) {
  if (headings.length <= 0) return '';

  return `#${headings
    .slice(-1)
    .toString()
    ?.match(/[a-zA-Z0-9]\w+/g)
    ?.map(s => s.toLowerCase())
    .join('-')}`;
}

function getNodeHeadings({ mdxAST }, htmlRecord) {
  const filteredHeadings = selectAll('heading text', mdxAST)
    .filter(heading => heading.position.start.line < htmlRecord.position.end.line)
    .filter(heading => heading.value !== 'Request' && heading.value !== 'Response'); // Removes jsdoc code tabs

  return filteredHeadings.map(heading => heading.value);
}

function getContentHeading(node, htmlRecord) {
  return htmlRecord?.headings[0] ?? getNodeHeadings(node, htmlRecord).slice(-1)[0];
}

function getAnchor(node, htmlRecord) {
  return getHtmlAnchor(htmlRecord?.headings[0]) ?? getNodeAnchor(getContentHeading(node, htmlRecord));
}

function getSlug(node) {
  return node?.slug;
}

function getUrl(node, htmlRecord) {
  const slug = getSlug(node);
  const anchor = getAnchor(node, htmlRecord);
  return `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${slug == null ? '' : slug}${anchor}`;
}

function getLastUpdated(node) {
  return node.lastModified ?? '';
}

function getSpotlight(node, htmlRecord) {
  return node.spotlight ?? htmlRecord?.customRanking ?? '';
}

function getWordCount(node, htmlRecord) {
  return htmlRecord?.words ?? node?.words ?? 0;
}

function getSize(node) {
  return node?.size;
}

module.exports = createHtmlRecords;
