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

const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const createRecordsFromHtml = require('./create-records-from-html');
const createAlgoliaRecords = require('./create-algolia-records');
const exec = require('await-exec');

/**
 * Support of "openAPISpec" directive:
 * https://github.com/adobe/aio-theme#openapi
 */

async function createRecordsForOpenApi(node, options) {
  const redoc = require.resolve('redoc-cli');
  const { openAPISpec } = node;
  const spec = openAPISpec.startsWith('/') ? join('static', openAPISpec) : openAPISpec;
  const htmlFile = join(options.tempDir, 'index.html');

  try {
    await exec(`${redoc} bundle -o ${htmlFile} ${spec}`);
  } catch (e) {
    console.error(e);
  }

  if (!existsSync(htmlFile)) {
    throw Error(`Redoc file resolving error: no such file "${htmlFile}"`);
  }

  const htmlContent = readFileSync(htmlFile, 'utf8');
  const htmlRecords = createRecordsFromHtml(htmlContent, options);

  return createAlgoliaRecords(node, htmlRecords);
}

module.exports = createRecordsForOpenApi;
