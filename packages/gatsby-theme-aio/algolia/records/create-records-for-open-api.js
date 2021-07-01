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

const { v4: uuidv4 } = require('uuid');
const LoadContentByUrl = require('./load-content-by-url');
const { Bootprint } = require('bootprint');
const bootprintOpenApi = require('bootprint-openapi');
const AlgoliaHTMLExtractor = require('algolia-html-extractor');
const fs = require('fs');

/**
 * Support of "openAPISpec" directive:
 * https://github.com/adobe/gatsby-theme-aio#openapi
 */
class CreateRecordsForOpenApi {
  constructor() {
    this.loadContentByUrl = new LoadContentByUrl();
    this.htmlExtractor = new AlgoliaHTMLExtractor();
  }

  /**
   * @param {Object} node
   * @param {Object} options
   * @return {Array}
   */
  async execute(node, options) {
    const bootprint = new Bootprint(bootprintOpenApi);
    await bootprint.run(node.openAPISpec, options.tempDir);

    const staticFileAbsolutePath = options.tempDir + '/index.html';
    if (!fs.existsSync(staticFileAbsolutePath)) {
      throw Error(`Bootprint file resolving error: no such file "${staticFileAbsolutePath}"`);
    }

    const fileContent = fs.readFileSync(staticFileAbsolutePath, 'utf8');

    const extractedData = this.htmlExtractor
      .run(fileContent, { cssSelector: options.tagsToIndex })
      .filter((htmlTag) => htmlTag.content.length >= options.minCharsLengthPerTag);

    const { ...restNodeFields } = node;

    return extractedData.map((htmlTag) => ({
      ...restNodeFields,
      objectID: htmlTag.objectID,
      content: htmlTag.content,
      headings: htmlTag.headings,
      customRanking: htmlTag.customRanking,
      internalObjectID: node.objectID
    }));
  }
}
module.exports = CreateRecordsForOpenApi;
