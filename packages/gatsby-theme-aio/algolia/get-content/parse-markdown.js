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

const { selectAll } = require('unist-util-select');
const uuid = require('uuid');

function parseMarkdown(markdownFile) {
  const paragraphNodes = selectAll('paragraph', markdownFile.mdxAST);

  if (paragraphNodes.length <= 0) return null;

  let rawRecords = [];

  for (const node of paragraphNodes) {
    const paragraph = node.children.map(child => child.value).join('');
    const positionEndLine = node.children.slice(-1)[0].position.end.line;

    const record = {
      content: paragraph,
      positionEndLine,
    };
    record.objectID = uuid.v4(record);
    record.contentDigest = uuid.v4(record.content);

    const rawRecord = Object.assign(record, markdownFile);
    rawRecords.push(rawRecord);
  }

  rawRecords = rawRecords.filter(
    record => record.content.length >= 20 && record.content.split(' ').length >= 5
  );
  return rawRecords;
}

module.exports = parseMarkdown;
