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

const LoadContentByUrl = require('./load-content-by-url');
const fs = require('fs');
const normalizePath = require('normalize-path');
const { createRawRecords, createAlgoliaRecords } = require('./record-utils');

/**
 * Support of "frameSrc" directive:
 * https://github.com/adobe/gatsby-theme-aio#frame
 */
class CreateRecordsForFrame {
  constructor(options = {}) {
    this.loadContentByUrl = new LoadContentByUrl();
  }

  async execute(node, options) {
    const fileContent = /^https?:\/\//i.test(node.frameSrc)
      ? await this.loadContentByUrl.execute(node.frameSrc)
      : this.loadContentFromCache(node, options);
    const htmlRecords = createRawRecords(node, options, fileContent);
    const algoliaRecords = createAlgoliaRecords(node, htmlRecords);

    return algoliaRecords;
  }

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
