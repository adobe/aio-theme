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
const request = require('request');
const LoadContentByUrl = require('./load-content-by-url');

/**
 * Support of "openAPISpec" directive:
 * https://github.com/adobe/gatsby-theme-aio#openapi
 */
class CreateRecordsForOpenApi {
  constructor() {
    this.loadContentByUrl = new LoadContentByUrl();
  }

  /**
   * @param {Object} node
   * @param {Object} options
   * @return {Array}
   */
  async execute(node, options) {
    const content = await this.loadContentByUrl.execute(node.openAPISpec);
    return [];
    // const object = JSON5.parse(text);

    const { mdxAST, objectID, slug, title, headings, ...restNodeFields } = node;

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
module.exports = CreateRecordsForOpenApi;
