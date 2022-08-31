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
const getProductForIndex = require('./helpers/get-product-from-index');

// TODO: Finish implementation
async function createAlgoliaRecord(rawRecord, file) {
  const markdownRecord = {
    objectID: rawRecord.objectID,
    repoName: getRepo(),
    product: getProduct(process.env.REPO_NAME), // same as index name by convention
    contentDigest: rawRecord.contentDigest,
    title: getFileTitle(rawRecord, file), // Get title from headings.depth
    description: getFileDescription(rawRecord, file),
    keywords: getFileKeywords(rawRecord, file),
    headings: getHeadings(rawRecord, file),
    content: getContent(rawRecord, file),
    contentHeading: getContentHeading(rawRecord, file),
    words: getFileWordCount(rawRecord, file),
    size: getFileSize(rawRecord, file),
    lastUpdated: getFileModifiedDate(rawRecord, file),
    anchor: getAnchor(rawRecord, file),
    slug: getFileSlug(rawRecord, file),
    url: getUrl(rawRecord, file),
    spotlight: getSpotlight(rawRecord, file),
  };
  return markdownRecord;

  function getRepo() {
    return process.env.REPO_NAME;
  }

  function getProduct(repoName) {
    const product = getProductForIndex(repoName);
    return product;
  }

  // TODO: Add reporter for title to create frontmatter report for Adobe teams.
  function getFileTitle(rawRecord, file) {
    const title = file.title || file.headings.filter(heading => heading.depth === 1)[0]?.value;
    return title;
  }

  // TODO: Add reporter for description to create frontmatter report for Adobe teams.
  function getFileDescription(rawRecord, file) {
    const description = file.description || file.excerpt || rawRecord.content || '';
    return description;
  }

  // TODO: Replace with paragraph content from record.
  function getContent(rawRecord, file) {
    const content = rawRecord.content || file.description || file.excerpt || '';
    return content;
  }

  // TODO: Add reporter for keywords to create frontmatter report for Adobe teams.
  function getFileKeywords(file) {
    return file.keywords;
  }

  // TODO: Reduce cardinality for use in search customRanking setting
  function getFileWordCount(file) {
    const words = file.words || 0;
    return words;
  }

  // TODO: Reduce cardinality for use in search customRanking setting
  function getFileSize(file) {
    const size = file.size;
    return size;
  }

  function getFileModifiedDate(file) {
    const lastUpdated = file.lastUpdated;
    return lastUpdated;
  }

  // TODO: Either expand this or remove and just use file.slug
  function getFileSlug(file) {
    const slug = file.slug || '';
    return slug;
  }

  // Gets all headings above the rawRecord's content
  function getHeadings(rawRecord, file) {
    let headingsAboveRawRecord = selectAll('heading', file.mdxAST);

    const goodHeadings = headingsAboveRawRecord.filter(
      ({ position }) => position.start.line < rawRecord.positionEndLine
    );

    // Removes jsdoc code tabs
    const betterHeadings = goodHeadings.filter(
      goodHeading =>
        goodHeading.children[0].value !== 'Request' && goodHeading.children[0].value !== 'Response'
    );

    const headings = betterHeadings.map(heading => heading.children[0].value);
    return headings;
  }

  // Gets the closest heading above the rawRecord's content
  function getContentHeading(rawRecord, file) {
    const contentHeading = getHeadings(rawRecord, file).slice(-1)[0];
    return contentHeading;
  }

  // The anchor is just the transformed contentHeading
  function getAnchor(rawRecord, file) {
    const contentHeading = getContentHeading(rawRecord, file);
    if (contentHeading == null) return '';

    // TODO: Handle headings with custom anchors from
    //  the gatsby-remark-autolink-headers plugin
    return `#${contentHeading
      .match(/[a-zA-Z0-9]\w+/g)
      ?.map(s => s.toLowerCase())
      .join('-')}`;
  }

  function getUrl(rawRecord, file) {
    const url = `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${
      file.slug == null ? '' : file.slug
    }${getAnchor(rawRecord, file)}`;
    return url;
  }

  function getSpotlight(rawRecord, file) {
    const spotlight = file.spotlight;
    return spotlight;
  }
}

module.exports = createAlgoliaRecord;
