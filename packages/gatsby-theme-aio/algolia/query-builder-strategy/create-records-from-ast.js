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
const fs = require('fs');
const normalizePath = require('normalize-path');

/**
 * Parse index records from mdxAST
 */
class CreateRecordsFromAst {
  constructor(options = {}) {
    this.htmlExtractor = new AlgoliaHTMLExtractor();
  }

  /**
   * @param {Object} node
   * @return {Array}
   */
  execute(node) {
    const options = {
      pagesSourceDir: 'src/pages'
    };

    const { mdxAST, ...restNodeFields } = node;

    // https://mdxjs.com/table-of-components
    const parsedData = selectAll(options.tagsToIndex, mdxAST).filter((record) => {
      return record.value.length >= options.minCharsLengthPerTag;
    });

    delete restNodeFields.mdxAST;
    delete restNodeFields.fileAbsolutePath;
    return parsedData.map((record) => {
      return {
        ...restNodeFields,
        objectID: uuidv4(record.value),
        content: record.value,
        internalObjectID: node.objectID
      };
    });
  }
}
module.exports = CreateRecordsFromAst;
