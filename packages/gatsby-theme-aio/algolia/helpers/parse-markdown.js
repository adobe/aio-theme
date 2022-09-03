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
  const selectedNodes = selectAll('root > paragraph', markdownFile.mdxAST);
  const minCharLength = 50;

  if (selectedNodes.length <= 0) return null;
  // const filteredNodes = selectedNodes.filter(node => node.children.map(child => child.text));
  const rawRecords = [];

  for (const node of selectedNodes) {
    const nodeText = node.children.map(child => child.value).join('');
    if (nodeText.length < minCharLength) continue;

    const rawRecord = {
      content: nodeText,
      headings: markdownFile.headings.map(heading => heading.value),
      spotlight: markdownFile.spotlight,
      title: markdownFile.title,
      description: markdownFile.description ?? nodeText,
    };

    rawRecord.objectID = uuid.v4(rawRecord);
    rawRecord.contentDigest = uuid.v4(rawRecord.content);
    rawRecord.words = nodeText.split(' ').length;
    rawRecord.contentHeading = getContentHeading(node, markdownFile.mdxAST);
    rawRecord.anchor = getAnchor(node, markdownFile.mdxAST);

    rawRecords.push(rawRecord);
  }

  return rawRecords;
}

// Get the closest heading above the rawRecord's content
function getContentHeading(node, nodeTree) {
  const contentPositionEndLine = node.children.slice(-1)[0].position.end.line; // nodeText ending position

  const filteredHeadings = selectAll('heading', nodeTree)
    .filter(function (heading) {
      return heading.position.start.line < contentPositionEndLine;
    })
    .filter(
      heading => heading.children[0].value !== 'Request' && heading.children[0].value !== 'Response'
    );

  const headings = filteredHeadings.map(heading => heading.children[0].value);
  return headings.slice(-1)[0]; // closest heading above nodeText
}

// The anchor is just the transformed contentHeading
function getAnchor(node, nodeTree) {
  const contentHeading = getContentHeading(node, nodeTree);
  if (contentHeading == null) return '';

  // TODO: Handle headings with custom anchors from the gatsby-remark-autolink-headers plugin
  return `#${contentHeading
    .match(/[a-zA-Z0-9]+/g)
    ?.map(s => s.toLowerCase())
    .join('-')}`;
}

module.exports = parseMarkdown;
