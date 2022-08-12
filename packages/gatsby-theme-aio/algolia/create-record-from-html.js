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

// TODO: Finish implementation based on createMarkdownRecords()
async function createRecordFromHtml(htmlObject, node) {
  const htmlRecord = {
    objectID: getId(htmlObject, node),
    contentDigest: getContentDigest(htmlObject, node),
    node: getNode(htmlObject, node),
    title: getTitle(htmlObject, node),
    description: getDescription(htmlObject, node),
    keywords: getKeywords(htmlObject, node),
    headings: getHeadings(htmlObject, node),
    content: getContent(htmlObject, node),
    contentHeading: getContentHeading(htmlObject, node),
    words: getWordCount(htmlObject, node),
    size: getSize(htmlObject),
    lastUpdated: getLastUpdated(htmlObject, node),
    anchor: getAnchor(htmlObject, node),
    slug: getSlug(htmlObject, node),
    url: getUrl(htmlObject, node),
    spotlight: getSpotlight(htmlObject, node),
  };
  return htmlRecord;
}

function getId(htmlObject) {
  return htmlObject.objectID;
}

function getContentDigest(htmlObject) {
  return htmlObject.contentDigest;
}

function getNode(htmlObject) {
  return htmlObject.node;
}

function getTitle(htmlObject, node) {
  const title = node.title || node.headings.filter(heading => heading.depth === 1)[0]?.value;
  return title;
}

function getDescription(htmlObject) {
  return htmlObject.description;
}

function getContent(htmlObject) {
  return htmlObject.content;
}

// TODO: Keywords should really come from the htmlObject, but not sure how to do that.
function getKeywords(node) {
  return node.keywords;
}

function getHeadings(htmlObject) {
  return htmlObject.headings;
}

function getContentHeading(htmlObject) {
  return htmlObject.headings[0];
}

function getAnchor(htmlObject) {
  if (htmlObject.headings.length <= 0) return '';

  return `#${htmlObject.headings
    .slice(-1)[0]
    .match(/[a-zA-Z0-9]\w+/g)
    ?.map(s => s.toLowerCase())
    .join('-')}`;
}

function getSlug(htmlObject, node) {
  return node?.slug;
}

function getUrl(htmlObject, node) {
  const slug = getSlug(node);
  const anchor = getAnchor(htmlObject);
  return `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${slug == null ? '' : slug}${anchor}`;
}

// TODO: Get lastUpdated from htmlObject, not the markdown file that hosts/references it.
function getLastUpdated(htmlObject, node) {
  return node.lastModified ?? '';
}

// TODO: Get customRanking from the htmlObject, not the markdown file that hosts/references it. Convert to boolean.
function getSpotlight(htmlObject, node) {
  return node.spotlight; //htmlObject.customRanking;
}

function getWordCount(htmlObject) {
  return htmlObject.words ?? 0;
}

// TODO: Get size of HtmlObject
function getSize(htmlObject) {
  return htmlObject.words;
}

module.exports = createRecordFromHtml;
