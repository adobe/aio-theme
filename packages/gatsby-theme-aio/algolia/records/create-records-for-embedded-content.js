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

const fs = require('fs');
const normalizePath = require('normalize-path');
const { createRawRecords, createAlgoliaRecords } = require('./record-utils');

/**
 * Support of "import" directive:
 * https://github.com/adobe/gatsby-theme-aio#embedding-markdown-documents-and-filtering-content
 *
 * Parse index records from cache files.
 */
class CreateRecordsForEmbeddedContent {
  constructor(options = {}) {}

  execute(node, options) {
    const { fileAbsolutePath } = node;
    const [siteDirAbsolutePath, sourceFileRelativePath] = normalizePath(fileAbsolutePath).split(options.pagesSourceDir);

    const publicSourceFilePath = `${siteDirAbsolutePath}${options.publicDir}${sourceFileRelativePath}`;
    const sourceFileExtension = new RegExp(`\.${options.sourceFileExtension}$`);
    const publicFileExtension = `.${options.publicFileExtension}`;

    let cacheFileAbsolutePath;
    const isIndexFile = sourceFileRelativePath.split('/').pop() === 'index.md';

    if (isIndexFile) {
      cacheFileAbsolutePath = publicSourceFilePath.replace(sourceFileExtension, publicFileExtension);
    } else {
      cacheFileAbsolutePath = publicSourceFilePath.replace(sourceFileExtension, '/') + 'index.html';
    }

    if (!fs.existsSync(cacheFileAbsolutePath)) {
      throw Error(`Cache file resolving error: no such file "${cacheFileAbsolutePath}"`);
    }

    const fileContent = fs.readFileSync(cacheFileAbsolutePath, 'utf8');
    const htmlRecords = createRawRecords(node, options, fileContent);
    const algoliaRecords = createAlgoliaRecords(node, htmlRecords);

    return algoliaRecords;
  }
}

module.exports = CreateRecordsForEmbeddedContent;
