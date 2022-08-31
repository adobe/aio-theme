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
const getIFrameContent = require('./get-content/get-iframe-content');
const getOpenApiContent = require('./get-content/get-openapi-content');
const mdxQuery = require('./mdx-query');
const parseHtml = require('./get-content/parse-html');
const parseMarkdown = require('./get-content/parse-markdown');
const createAlgoliaRecord = require('./create-algolia-record');
const createAlgoliaRecordFromHtml = require('./create-algolia-record-from-html');

function indexAlgoliaRecords() {
  return [
    {
      query: mdxQuery,
      transformer: async function({
                                    data: {
                                      allFile: { nodes },
                                    },
                                  }) {
        const markdownFiles = nodes.map(node => {
          // Creates flattened objects from the mdxQuery source data (markdown files in src/pages).
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

        for (const markdownFile of markdownFiles) {
          const htmlContent =
            (await getImportedContent(markdownFile)) ??
            (await getIFrameContent(markdownFile)) ??
            (await getOpenApiContent(markdownFile));

          if (htmlContent != null) {
            const rawRecords = parseHtml(htmlContent.content, htmlContent.options);
            if (rawRecords.length <= 0) continue;
            for (const rawRecord of rawRecords) {
              const htmlRecord = await createAlgoliaRecordFromHtml(rawRecord, markdownFile);
              algoliaRecords.push(htmlRecord);
            }
          } else {
            const rawRecords = parseMarkdown(markdownFile);
            if (rawRecords == null) continue;
            for (const rawRecord of rawRecords) {
              const markdownRecord = await createAlgoliaRecord(rawRecord, markdownFile);
              algoliaRecords.push(markdownRecord);
            }
          }
        }
        // Returns the record objects (created from the HTML and markdown sources)
        // to the plugin, which sends them to the Algolia servers using the Algolia API.
        return algoliaRecords;
      },
    },
  ];
}

module.exports = indexAlgoliaRecords;
