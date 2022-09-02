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

const getImportedContent = require('./sourcing/get-imported-content');
const getIFrameContent = require('./sourcing/get-iframe-content');
const getOpenApiContent = require('./sourcing/get-openapi-content');
const mdxQuery = require('./mdx-query');
const parseHtml = require('./sourcing/parse-html');
const parseMarkdown = require('./sourcing/parse-markdown');
const createAlgoliaRecord = require('./create-algolia-record');

function indexAlgoliaRecords() {
  return [
    {
      query: mdxQuery,
      transformer: async function ({
        data: {
          allFile: { nodes },
        },
      }) {
        const markdownFiles = nodes.map(node => {
          // Creates flattened objects from the mdxQuery source data (markdown files in src/pages).
          return {
            objectID: node.id,
            contentDigest: node.internal.contentDigest,
            product: getProductFromIndex(process.env.REPO_NAME),
            lastUpdated: node.modifiedTime,
            headings: node.childMdx.headings,
            excerpt: node.childMdx.excerpt,
            words: node.childMdx.wordCount.words,
            fileAbsolutePath: node.childMdx.fileAbsolutePath, // Required for additional source data
            slug: node.childMdx.slug,
            title: node.childMdx.frontmatter.title,
            description: node.childMdx.frontmatter.description,
            keywords: node.childMdx.frontmatter.keywords, // Used for search filters
            openAPISpec: node.childMdx.frontmatter.openAPISpec, // Required for OpenAPI sources
            frameSrc: node.childMdx.frontmatter.frameSrc, // Required for iframe sources
            spotlight: node.childMdx.frontmatter.spotlight, // Added to elevate records from file
            mdxAST: node.childMdx.mdxAST,
          };
        });

        let rawRecords = [];
        const algoliaRecords = [];

        for (const markdownFile of markdownFiles) {
          // Get source content
          const htmlContent =
            (await getImportedContent(markdownFile)) ??
            (await getIFrameContent(markdownFile)) ??
            (await getOpenApiContent(markdownFile));

          // Create 'raw' records from content
          rawRecords =
            htmlContent != null
              ? parseHtml(htmlContent.content, htmlContent.options)
              : parseMarkdown(markdownFile);

          if (rawRecords == null || rawRecords.length <= 0) continue;

          // Create Algolia records from rawRecords
          for (const rawRecord of rawRecords) {
            const record = await createAlgoliaRecord(rawRecord, markdownFile);
            algoliaRecords.push(record);
          }
        }
        // Return the normalized Algolia records to the plugin for indexing.
        // The plugin sends the records to the Algolia index specified for the site.
        return algoliaRecords;
      },
    },
  ];
}

module.exports = indexAlgoliaRecords;
