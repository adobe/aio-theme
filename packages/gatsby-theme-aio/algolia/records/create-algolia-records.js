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

const uuid = require('uuid');
const { selectAll } = require('unist-util-select');

function createAlgoliaRecords(node, records) {
  return records.map((record) => {
    const algoliaRecord = {
      objectID: getId(node, record),
      contentDigest: getContentDigest(node, record),
      customRanking: getCustomRanking(node, record),
      title: getTitle(node, record),
      description: getDescription(node, record),
      content: getContent(node, record),
      lastUpdated: getLastUpdated(node, record),
      contentHeading: getContentHeading(node, record),
      headingAnchor: getHeadingAnchor(node, record),
      slug: getSlug(node, record),
      url: getUrl(node, record),
      previousHeadings: getPreviousHeadings(node, record),
      keywords: getKeywords(node, record),
      edition: getEdition(node, record),
      contributorName: getContributorName(node, record),
      words: getWordCount(node, record),
      size: getSize(node)
    };
    return algoliaRecord;
  });
}

function getId(node, record) {
  const customId = uuid.v4(getContent(record));
  return customId;
}

function getContentDigest(node, record) {
  const customContentDigest = uuid.v4(getContent(record));
  return customContentDigest;
}

function getTitle(node, record) {
  const title =
    node.title == null || node.title === '' ? node.headings[0]?.value ?? record.value ?? 'No title' : node.title;
  return title;
}

function getDescription(node, record) {
  const description =
    node.description == null || node.description === ''
      ? record?.content ?? record?.value ?? 'No description'
      : node.description;
  return description;
}

function getHeadings(node, record) {
  const filteredHeadings = selectAll('heading text', node.mdxAST);
  const allHeadings = filteredHeadings.filter((heading) => heading.position.start.line < record.position.end.line);
  const cleanedHeadings = allHeadings.map((heading) => heading.value);
  return cleanedHeadings;
}

function getContent(node, record) {
  const content = node?.content ?? record?.value ?? record?.content ?? 'No content';
  return content;
}

function getKeywords(node, record) {
  const keywords = node.keywords;
  return keywords;
}

function getEdition(node, record) {
  const edition = node.edition ?? '';
  return edition;
}

function getContributorName(node, record) {
  const contributorName = node.contributor_name ?? '';
  return contributorName;
}

function getAnchorLink(linkHeadings) {
  const anchorLink = `#${linkHeadings
    .slice(-1)
    .toString()
    ?.match(/[a-zA-Z0-9]\w+/g)
    ?.map((s) => s.toLowerCase())
    .join('-')}
    `;
  return anchorLink;
}

function getContentHeading(node, record) {
  const contentHeading = record?.html ? record?.headings.slice(-1)[0] : getHeadings(node, record).slice(-1)[0];
  return contentHeading;
}

function getPreviousHeadings(node, record) {
  const previousHeadings = record?.html ? record?.headings : getHeadings(node, record);
  return previousHeadings;
}

function getHeadingAnchor(node, record) {
  const headingAnchor = record?.html ? getAnchorLink(record?.headings) : getAnchorLink(getHeadings(node, record));
  return headingAnchor;
}

function getSlug(node, record) {
  const slug = node?.slug ?? record?.slug;
  return slug;
}

function getUrl(node, record) {
  const slug = getSlug(node, record);
  const anchor = record?.html ? getAnchorLink(record?.headings) : getAnchorLink(getHeadings(node, record));
  const recordUrl = `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${
    slug == null ? '' : slug
  }${anchor}`;
  return recordUrl;
}

function getLastUpdated(node, record) {
  const lastUpdated = node.lastModified ?? 'Unknown';
  return lastUpdated;
}

function getCustomRanking(node, record) {
  const customRanking = record?.customRanking ?? '';
  return customRanking;
}

function getWordCount(node, record) {
  const wordCount = node.words ?? record?.value.split(' ').length;
  return wordCount;
}

function getSize(node) {
  const size = node.size;
  return size;
}

module.exports = createAlgoliaRecords;
