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

const { rmSync } = require('fs');
const { selectAll } = require('unist-util-select');
const createRecordsForEmbeddedContent = require('./records/create-records-for-embedded-content');
const createRecordsForFrame = require('./records/create-records-for-frame');
const createRecordsForOpenApi = require('./records/create-records-for-open-api');
const createRecordsFromMdx = require('./records/create-records-from-mdx');

async function createFileRecords(node) {
  const embeddedContent = selectAll('import', node.mdxAST);

  let records = [];
  if (embeddedContent.length > 0) {
    const options = {
      publicDir: 'public',
      pagesSourceDir: 'src/pages',
      publicFileExtension: 'html',
      sourceFileExtension: 'md',
      tagsToIndex: 'p',
      minCharsLengthPerTag: 10,
      minWordsCount: 3
    };
    records = createRecordsForEmbeddedContent(node, options);
  } else if (node.frameSrc) {
    const options = {
      pagesSourceDir: 'src/pages',
      staticSourceDir: 'static',
      tagsToIndex: 'p',
      minCharsLengthPerTag: 10,
      minWordsCount: 3
    };
    records = await createRecordsForFrame(node, options);
  } else if (node.openAPISpec) {
    const tempDir = './public/redoc';
    const options = {
      tempDir,
      tagsToIndex: 'p',
      minCharsLengthPerTag: 10,
      minWordsCount: 3
    };
    records = await createRecordsForOpenApi(node, options);

    // Clean up
    rmSync(tempDir, { recursive: true, force: true });
  } else {
    const options = {
      tagsToIndex: 'paragraph text',
      minCharsLengthPerTag: 10,
      minWordsCount: 3
    };
    records = createRecordsFromMdx(node, options);
  }

  records = records.map(({ mdxAST, fileAbsolutePath, frameSrc, openAPISpec, ...keepAttrs }) => {
    return keepAttrs;
  });
  console.log(`${records.length} records for "${node?.title === '' ? node.slug : node?.title}"`);

  return records;
}

module.exports = createFileRecords;