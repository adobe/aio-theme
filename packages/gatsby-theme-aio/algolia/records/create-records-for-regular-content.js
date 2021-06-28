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
const { v4: uuidv4 } = require('uuid');

/**
 * Parse records from mdxAST
 */
class CreateRecordsForRegularContent {
  /**
   * @param {Object} node
   * @param {Object} options
   * @return {Array}
   */
  execute(node, options) {
    const { mdxAST, objectID, slug, title, headings, ...restNodeFields } = node;

    // https://mdxjs.com/table-of-components
    const parsedData = selectAll(options.tagsToIndex, mdxAST).filter((record) => {
      return record.value.length >= options.minCharsLengthPerTag;
    });

    delete restNodeFields.mdxAST;
    delete restNodeFields.fileAbsolutePath;
    return parsedData.map((record) => {
      return {
        objectID: uuidv4(record.value.toString()),
        title: title === '' ? headings[0]?.value : title,
        ...restNodeFields,
        headings: headings.map((heading) => heading.value),
        content: record.value,
        slug: slug,
        pageID: objectID
      };
    });
  }
}
module.exports = CreateRecordsForRegularContent;
