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
const LoadContentByUrl = require('./load-content-by-url');
const fs = require('fs');
const normalizePath = require('normalize-path');

/**
 * Support of "frameSrc" directive:
 * https://github.com/adobe/gatsby-theme-aio#frame
 */
class CreateRecordsForFrame {
  constructor(options = {}) {
    this.loadContentByUrl = new LoadContentByUrl();
    this.htmlExtractor = new AlgoliaHTMLExtractor();
  }

  /**
   * @param {Object} node
   * @param {Object} options
   * @return {Array}
   */
  async execute(node, options) {
    const { objectID, title, slug, headings, ...restNodeFields } = node;

    const fileContent = /^https?:\/\//i.test(node.frameSrc)
      ? await this.loadContentByUrl.execute(node.frameSrc)
      : this.loadContentFromCache(node, options);

    const extractedData = this.htmlExtractor
      .run(fileContent, { cssSelector: options.tagsToIndex })
      .filter((htmlTag) => htmlTag.content.length >= options.minCharsLengthPerTag);

    return extractedData.map((htmlTag) => ({
      objectID: htmlTag.objectID,
      title: title === '' || title == null ? htmlTag.headings[0]?.value : title,
      ...restNodeFields,
      previousHeadings: htmlTag.headings,
      contentHeading: htmlTag.headings.slice(-1)[0],
      content: htmlTag.content,
      slug: slug,
      anchor: `#${htmlTag.headings
        .slice(-1)
        .toString()
        ?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map((s) => s.toLowerCase())
        .join('-')}`,
      customRanking: htmlTag.customRanking,
      pageID: objectID
    }));
  }

  /**
   * @param {Object} node
   * @param {Object} options
   * @return {String}
   */
  loadContentFromCache(node, options) {
    const { fileAbsolutePath } = node;
    const [siteDirAbsolutePath] = normalizePath(fileAbsolutePath).split(options.pagesSourceDir);
    const staticFileAbsolutePath = `${siteDirAbsolutePath}${options.staticSourceDir}${node.frameSrc}`;

    if (!fs.existsSync(staticFileAbsolutePath)) {
      throw Error(`Static file resolving error: no such file "${staticFileAbsolutePath}"`);
    }

    return fs.readFileSync(staticFileAbsolutePath, 'utf8');
  }
}
module.exports = CreateRecordsForFrame;
