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

// TODO: Finish implementation
async function createRecordFromMarkdown(node) {
  const markdownRecord = {
    objectID: getId(node),
    repoName: getRepoName(),
    contentDigest: node.contentDigest,
    title: getTitle(node), // Get title from headings.depth
    description: getDescription(node),
    keywords: getKeywords(node),
    headings: getHeadings(node),
    content: getContent(node),
    contentHeading: getContentHeading(node),
    words: getWords(node),
    size: getSize(node),
    lastUpdated: getLastUpdated(node),
    anchor: getAnchor(node),
    slug: getSlug(node),
    url: getUrl(node),
    spotlight: getSpotlight(node),
  };
  return markdownRecord;

  function getId(node) {
    const objectID = node.objectID;
    return objectID;
  }

  function getRepoName() {
    return `${process.env.REPO_NAME}`;
  }

  // TODO: Add reporter for title to create frontmatter report for Adobe teams.
  function getTitle(node) {
    const title = node.title || node.headings.filter(heading => heading.depth === 1)[0]?.value;
    return title;
  }

  // TODO: Add reporter for description to create frontmatter report for Adobe teams.
  function getDescription(node) {
    const description = node.description || node.content || '';
    return description;
  }

  // TODO: Replace with paragraph content from record.
  function getContent(node) {
    const content = node.content || node.description || '';
    return content;
  }

  // TODO: Add reporter for keywords to create frontmatter report for Adobe teams.
  function getKeywords(node) {
    return node.keywords;
  }

  // TODO: Reduce cardinality for use in search customRanking setting
  function getWords(node) {
    const words = node.words || 0;
    return words;
  }

  // TODO: Reduce cardinality for use in search customRanking setting
  function getSize(node) {
    const size = node.size;
    return size;
  }

  function getLastUpdated(node) {
    const lastUpdated = node.lastUpdated;
    return lastUpdated;
  }

  // TODO: Either expand this or remove and just use node.slug
  function getSlug(node) {
    const slug = node.slug || '';
    return slug;
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

  // TODO: Add code here to create array of anchors.
  function getHeadings(node) {
    const headings = node.headings;
    return headings;
  }

  // TODO: Get the first heading that is above the record's content
  function getContentHeading(node) {
    const contentHeading = node.headings.slice(-1)[0]?.value || '';
    return contentHeading;
  }

  // TODO: Create heading anchors for all node.headings. See getHeadings.
  function getAnchor(node) {
    if (node.headings.length <= 0) return '';

    return `#${node.headings
      .slice(-1)[0]
      .value.match(/[a-zA-Z0-9]\w+/g)
      ?.map(s => s.toLowerCase())
      .join('-')}`;
  }

  function getUrl(node) {
    const url = `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${
      node.slug == null ? '' : node.slug
    }${getAnchor(node)}`;
    return url;
  }

  function getSpotlight(node) {
    const spotlight = node.spotlight;
    return spotlight;
  }
}

module.exports = createRecordFromMarkdown;
