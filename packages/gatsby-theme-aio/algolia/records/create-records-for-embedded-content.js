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
 * Support of "import" directive:
 * https://github.com/adobe/gatsby-theme-aio#embedding-markdown-documents-and-filtering-content
 *
 * Parse index records from cache files.
 */
class CreateRecordsForEmbeddedContent {
  constructor(options = {}) {
    this.htmlExtractor = new AlgoliaHTMLExtractor();
  }

  /**
   * @param {Object} node
   * @param {Object} options
   * @return {Array}
   */
  execute(node, options) {
    const { fileAbsolutePath, ...restNodeFields } = node;

    const [siteDirAbsolutePath, sourceFileRelativePath] = normalizePath(fileAbsolutePath).split(options.pagesSourceDir);

    const cacheFileAbsolutePath = `${siteDirAbsolutePath}${options.publicDir}${sourceFileRelativePath}`.replace(
      new RegExp(`\.${options.sourceFileExtension}$`),
      `.${options.cacheFileExtension}`
    );

    if (!fs.existsSync(cacheFileAbsolutePath)) {
      throw Error(`Cache file resolving error: no such file "${cacheFileAbsolutePath}"`);
    }

    const fileContent = fs.readFileSync(cacheFileAbsolutePath, 'utf8');

    const extractedData = this.htmlExtractor
      .run(fileContent, { cssSelector: options.tagsToIndex })
      .filter((htmlTag) => htmlTag.content.length >= options.minCharsLengthPerTag);

    delete restNodeFields.mdxAST;
    delete restNodeFields.fileAbsolutePath;
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
module.exports = CreateRecordsForEmbeddedContent;
