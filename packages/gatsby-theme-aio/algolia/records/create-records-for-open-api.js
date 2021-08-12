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
const { Bootprint } = require('bootprint');
const bootprintOpenApi = require('bootprint-openapi');
const fs = require('fs');
const { createRawRecordsBasedOnHtml, createAlgoliaRecords } = require('./record-utils');

/**
 * Support of "openAPISpec" directive:
 * https://github.com/adobe/aio-theme#openapi
 */
class CreateRecordsForOpenApi {
  constructor() {
    this.loadContentByUrl = new LoadContentByUrl();
  }

  async execute(node, options) {
    const bootprint = new Bootprint(bootprintOpenApi);
    await bootprint.run(node.openAPISpec, options.tempDir);

    const staticFileAbsolutePath = options.tempDir + '/index.html';
    if (!fs.existsSync(staticFileAbsolutePath)) {
      throw Error(`Bootprint file resolving error: no such file "${staticFileAbsolutePath}"`);
    }

    const fileContent = fs.readFileSync(staticFileAbsolutePath, 'utf8');
    const htmlRecords = createRawRecordsBasedOnHtml(fileContent, options);
    const algoliaRecords = createAlgoliaRecords(node, htmlRecords);

    return algoliaRecords;
  }
}

module.exports = CreateRecordsForOpenApi;
