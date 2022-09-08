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

function parseMdx(markdownFile) {
  // See: https://github.com/syntax-tree/mdast for node type info.
  const mdastNodes = selectAll(
    'root > paragraph, listItem > paragraph, blockquote > paragraph, code',
    markdownFile.mdxAST
  );

  if (mdastNodes.length <= 0) return null;

  const rawRecords = [];
  const minCharLength = 5;

  for (const mdastNode of mdastNodes) {
    let nodeValue = '';
    nodeValue =
      mdastNode.type === 'code'
        ? mdastNode.value
        : mdastNode.children.map(child => child.value).join('');

    if (nodeValue.length < minCharLength) continue;

    const rawRecord = {
      objectID: uuid.v4(nodeValue),
      contentDigest: uuid.v4(nodeValue),
      content: nodeValue,
      headings: markdownFile.headings.map(heading => heading.value),
      contentHeading: getContentHeading(mdastNode, markdownFile),
      anchor: getAnchor(mdastNode, markdownFile),
      featured: markdownFile.featured,
      title: markdownFile.title === '' ? markdownFile.headings[0].value : markdownFile.title,
      description:
        markdownFile.description === '' ? markdownFile.excerpt : markdownFile.description,
      words: nodeValue.split(' ').length,
    };

    rawRecords.push(rawRecord);
  }
  return rawRecords;
}

// Get the closest heading above the rawRecord's content
function getContentHeading(mdastNode, markdownFile, minCharLength) {
  let contentPositionEndLine = 0;
  contentPositionEndLine =
    mdastNode.type === 'code'
      ? mdastNode.position.end.line
      : mdastNode.children.slice(-1)[0].position.end.line;

  const allHeadings = selectAll('heading', markdownFile.mdxAST);
  if (allHeadings.length <= 0) return '';

  const filteredHeadings = allHeadings
    .filter(heading => heading.position.start.line < contentPositionEndLine)
    .filter(
      heading => heading.children[0].value !== 'Request' && heading.children[0].value !== 'Response'
    );

  const headingsAboveContent = [];
  for (const heading of filteredHeadings) {
    const headingValue = heading.children.map(child => child.value).join('');
    if (headingValue.length < minCharLength) continue;

    headingsAboveContent.push(headingValue);
  }
  return headingsAboveContent.slice(-1)[0]; // closest heading above the nodeValue
}

// The anchor is just the transformed contentHeading
function getAnchor(mdastNode, markdownFile) {
  const contentHeading = getContentHeading(mdastNode, markdownFile);
  if (contentHeading == null) return '';

  // TODO: Handle headings with custom anchors from the gatsby-remark-autolink-headers plugin
  return `#${contentHeading
    .match(/[a-zA-Z0-9]+/g)
    ?.map(s => s.toLowerCase())
    .join('-')}`;
}

module.exports = parseMdx;
