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
const path = require('path');
const { createRawRecordsBasedOnHtml, createAlgoliaRecords } = require('./record-builder');
const exec = require('await-exec');

/**
 * Support of "openAPISpec" directive:
 * https://github.com/adobe/aio-theme#openapi
 */
class CreateRecordsForOpenApi {
  async execute(node, options) {
    const redoc = require.resolve('redoc-cli');
    const spec = node.openAPISpec.startsWith('/') ? path.join('static', node.openAPISpec) : node.openAPISpec;
    const target = path.join(options.tempDir, 'index.html');

    try {
      await exec(`${redoc} bundle -o ${target} ${spec}`);
    } catch (e) {
      console.error(e);
    }

    if (!fs.existsSync(target)) {
      throw Error(`Redoc file resolving error: no such file "${target}"`);
    }

    const fileContent = fs.readFileSync(target, 'utf8');
    const htmlRecords = createRawRecordsBasedOnHtml(fileContent, options);

    return createAlgoliaRecords(node, htmlRecords);
  }
}

module.exports = CreateRecordsForOpenApi;
