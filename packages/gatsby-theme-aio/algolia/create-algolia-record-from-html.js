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

async function createAlgoliaRecordFromHtml(rawRecord, file) {
  const htmlRecord = {
    objectID: getId(rawRecord, file),
    contentDigest: getContentDigest(rawRecord, file),
    node: getNode(rawRecord, file),
    title: getTitle(rawRecord, file),
    description: getDescription(rawRecord, file),
    keywords: getKeywords(rawRecord, file),
    headings: getHeadings(rawRecord, file),
    content: getContent(rawRecord, file),
    contentHeading: getContentHeading(rawRecord, file),
    words: getWordCount(rawRecord, file),
    size: getSize(rawRecord),
    lastUpdated: getLastUpdated(rawRecord, file),
    anchor: getAnchor(rawRecord, file),
    slug: getSlug(rawRecord, file),
    url: getUrl(rawRecord, file),
    spotlight: getSpotlight(rawRecord, file),
  };
  return htmlRecord;
}

function getId(rawRecord, file) {
  return rawRecord.objectID;
}

function getContentDigest(rawRecord, file) {
  return rawRecord.contentDigest;
}

function getNode(rawRecord, file) {
  return rawRecord.node;
}

function getTitle(rawRecord, file) {
  const title = file.title || file.headings.filter(heading => heading.depth === 1)[0]?.value;
  return title;
}

function getDescription(rawRecord, file) {
  return rawRecord.description;
}

function getContent(rawRecord, file) {
  return rawRecord.content;
}

function getKeywords(rawRecord, file) {
  return file.keywords;
}

function getHeadings(rawRecord, file) {
  return rawRecord.headings;
}

function getContentHeading(rawRecord, file) {
  return rawRecord.headings[0];
}

function getAnchor(rawRecord, file) {
  if (rawRecord.headings.length <= 0) return '';

  return `#${rawRecord.headings
    .slice(-1)[0]
    .match(/[a-zA-Z0-9]\w+/g)
    ?.map(s => s.toLowerCase())
    .join('-')}`;
}

function getSlug(rawRecord, file) {
  return file?.parent?.slug;
}

function getUrl(rawRecord, file) {
  const slug = getSlug(file);
  const anchor = getAnchor(rawRecord);
  return `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${
    slug == null ? '' : slug
  }${anchor}`;
}

function getLastUpdated(rawRecord, file) {
  return file.lastModified ?? '';
}

function getSpotlight(rawRecord, file) {
  return file.spotlight; //fragment.customRanking;
}

function getWordCount(rawRecord, file) {
  return rawRecord.words ?? 0;
}

// TODO: Get size of HtmlObject
function getSize(rawRecord, file) {
  return rawRecord.words;
}

module.exports = createAlgoliaRecordFromHtml;
