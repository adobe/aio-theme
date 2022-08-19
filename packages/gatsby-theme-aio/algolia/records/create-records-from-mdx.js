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

const createAlgoliaRecords = require('./create-algolia-records');
const { selectAll } = require('unist-util-select');

// https://mdxjs.com/table-of-components

/**
 * @param {*} node
 * @param {{minCharsLengthPerTag: number, minWordsCount: number, tagsToIndex: string}} options
 */
function createRecordsFromMdx(node, options) {
  const { minWordsCount, minCharsLengthPerTag, tagsToIndex } = options;
  const selectedRecords = selectAll(tagsToIndex, node.mdxAST);

  const mdxRecords = selectedRecords.filter((record) => {
    return record.content
      ? record.content.length >= minCharsLengthPerTag && record.content.split(' ').length >= minWordsCount
      : selectedRecords;
  });

  const algoliaRecords = createAlgoliaRecords(node, mdxRecords);
  return algoliaRecords;
}

module.exports = createRecordsFromMdx;
