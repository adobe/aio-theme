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

const AlgoliaHTMLExtractor = require('algolia-html-extractor');
const htmlExtractor = new AlgoliaHTMLExtractor();
const { selectAll } = require('unist-util-select');
const { v4: uuidv4 } = require('uuid');

const createRawRecordsBasedOnAST = (mdxAST, options) => {
  // https://mdxjs.com/table-of-components
  return selectAll(options.tagsToIndex, mdxAST).filter(
    (record) =>
      record.value.length >= options.minCharsLengthPerTag && record.value.split(' ').length >= options.minWordsCount
  );
};

const createRawRecordsBasedOnHtml = (fileContent, options) => {
  return htmlExtractor
    .run(fileContent, { cssSelector: options.tagsToIndex })
    .filter(
      (record) =>
        record.content.length >= options.minCharsLengthPerTag &&
        record.content.split(' ').length >= options.minWordsCount
    );
};

const createAlgoliaRecords = (node, records) => {
  let { mdxAST, slug, objectID, contentDigest, wordCount, title, description, headings, ...restNodeFields } = node;

  return records.map((record) => {
    const algoliaRecord = {
      objectID: record.objectID ?? uuidv4(record.value.toString()),
      title: getTitle(title, node),
      description: getDescription(description, node, record),
      ...restNodeFields,
      // TODO: Rethink getHeadings() and use node.headings instead
      previousHeadings: record.html ? record.headings : getHeadings(node, record),
      contentHeading: record.html ? record.headings.slice(-1)[0] : getHeadings(node, record).slice(-1)[0],
      content: record.content ?? record.value,
      slug: slug,
      words: wordCount.words,
      anchor: record.html ? getAnchorLink(record.headings) : getAnchorLink(getHeadings(node, record)),
      url: getUrl(slug, node, record),
      absoluteUrl: getAbsoluteUrl(slug, node, record),
      customRanking: record.customRanking ?? '',
      // TODO: model should not have dependencies on env vars (should be wrapped in config object)
      [process.env.REPO_NAME]: contentDigest
    };
    return algoliaRecord;
  });
};

function getTitle(title, node) {
  if (title === null || title === '') {
    title = node.title = node.headings[0]?.value ?? '';
    return title;
  }
  return title;
}

function getDescription(description, node, record) {
  if (description === '') {
    return record.content ?? record.value ?? '';
  }
  if (description == null) {
    description = node.description = record.content ?? record.value ?? '';
    return description;
  }
  return description;
}

function getHeadings({ mdxAST }, record) {
  let filteredHeadings = selectAll('heading text', mdxAST)
    .filter((heading) => heading.position.start.line < record.position.end.line)
    .filter((heading) => heading.value !== 'Request' && heading.value !== 'Response'); // Removes jsdoc code tabs
  return filteredHeadings.map((heading) => heading.value);
}

function getAnchorLink(linkHeadings) {
  return `#${linkHeadings
    .slice(-1)
    .toString()
    ?.match(/[a-zA-Z0-9]\w+/g)
    ?.map((s) => s.toLowerCase())
    .join('-')}`;
}

function getUrl(slug, node, record) {
  let anchor = record.html ? getAnchorLink(record.headings) : getAnchorLink(getHeadings(node, record));
  return `${process.env.PATH_PREFIX}${slug}${anchor}`;
}

function getAbsoluteUrl(slug, node, record) {
  return `${process.env.AIO_FASTLY_PROD_URL}${getUrl(slug, node, record)}`;
}

const removeDuplicateRecords = (records) => {
  let uniqueContents = [];
  records = records.filter((record) => {
    if (uniqueContents.includes(record.content)) {
      return false;
    } else {
      uniqueContents.push(record.content);
      return true;
    }
  });
  return records;
};

module.exports = {
  createAlgoliaRecords,
  createRawRecordsBasedOnAST,
  createRawRecordsBasedOnHtml,
  removeDuplicateRecords
};
