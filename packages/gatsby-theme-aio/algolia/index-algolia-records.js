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

const getImportedContent = require('./get-content/get-imported-content');
const getFrameContent = require('./get-content/get-frame-content');
const getOpenApiContent = require('./get-content/get-openapi-content');
const mdxQuery = require('./mdx-query');
const createRecordFromHtml = require('./create-record-from-html');
const createRecordFromMarkdown = require('./create-record-from-markdown');
const createObjectsFromHtml = require('./get-content/create-objects-from-html');

function indexAlgoliaRecords() {
  return [
    {
      query: mdxQuery,
      transformer: async function ({
        data: {
          allFile: { edges },
        },
      }) {
        const markdownNodes = edges.map(({ node }) => {
          // Creates new markdown data objects from the mdxQuery source data (from the markdown files in src/pages).
          return {
            objectID: node.id,
            contentDigest: node.internal.contentDigest,
            lastUpdated: node.modifiedTime,
            size: node.size,
            headings: node['childMdx'].headings,
            content: node['childMdx'].excerpt,
            words: node['childMdx'].wordCount.words,
            fileAbsolutePath: node['childMdx'].fileAbsolutePath, // Required for additional source data
            slug: node['childMdx'].slug,
            title: node['childMdx'].frontmatter.title,
            description: node['childMdx'].frontmatter.description,
            keywords: node['childMdx'].frontmatter.keywords, // Used for search filters
            openAPISpec: node['childMdx'].frontmatter.openAPISpec, // Required for OpenAPI sources
            frameSrc: node['childMdx'].frontmatter.frameSrc, // Required for iframe sources
            spotlight: node['childMdx'].frontmatter.spotlight, // Added to elevate records from file
            mdxAST: node['childMdx'].mdxAST,
          };
        });

        let algoliaRecords = [];

        for (const node of markdownNodes) {
          const htmlContent =
            (await getImportedContent(node)) ?? (await getFrameContent(node)) ?? (await getOpenApiContent(node));

          if (htmlContent != null) {
            const htmlObjects = createObjectsFromHtml(htmlContent.content, htmlContent.options);
            for (const htmlObject of htmlObjects) {
              const htmlRecord = await createRecordFromHtml(htmlObject, node);
              algoliaRecords.push(htmlRecord);
            }
          } else {
            const markdownRecord = await createRecordFromMarkdown(node);
            algoliaRecords.push(markdownRecord);
          }
        }

        return algoliaRecords;
      },
    },
  ];
}

module.exports = indexAlgoliaRecords;
