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

const getImportedContent = require('./helpers/get-imported-content');
const getIFrameContent = require('./helpers/get-iframe-content');
const getOpenApiContent = require('./helpers/get-openapi-content');
const mdxQuery = require('./mdx-query');
const parseHtml = require('./helpers/parse-html');
const parseMdx = require('./helpers/parse-mdx');
const createAlgoliaRecord = require('./create-record');
const { getProductFromIndex } = require('./helpers/get-products-indexes');

function indexRecords() {
  return [
    {
      query: mdxQuery,
      transformer: async function ({
        data: {
          allFile: { nodes },
        },
      }) {
        const markdownFiles = [];
          for (const node of nodes) {
            // Creates flattened objects from the mdxQuery source data (markdown files in src/pages).
            markdownFiles.push({
                objectID: node.id,
                contentDigest: node.internal.contentDigest,
                product: getProductFromIndex(process.env.REPO_NAME),
                birthTime: node.birthTime,
                changeTime: node.changeTime,
                lastUpdated: node.modifiedTime,
                headings: node.childMdx.headings,
                excerpt: node.childMdx.excerpt,
                words: node.childMdx.wordCount.words,
                fileAbsolutePath: node.childMdx.fileAbsolutePath,
                slug: node.slug,
                size: node.size,
                title: node.childMdx.frontmatter.title,
                description: node.childMdx.frontmatter.description,
                keywords: node.childMdx.frontmatter.keywords,
                category: node.childMdx.frontmatter.category,
                isNew: node.isNew,
                howRecent: node.howRecent,
                icon: node.icon,
                openAPISpec: node.childMdx.frontmatter.openAPISpec,
                frameSrc: node.childMdx.frontmatter.frameSrc,
                featured: node.childMdx.frontmatter.featured,
                mdxAST: node.childMdx.mdxAST,
            });
          }

        const algoliaRecords = [];

        for (const markdownFile of markdownFiles) {
          // Get source content
          const htmlContent =
            (await getImportedContent(markdownFile)) ??
            (await getIFrameContent(markdownFile)) ??
            (await getOpenApiContent(markdownFile)) ?? {};

          // Create 'raw' records from content
          let rawRecords =
              Object.keys(htmlContent).length > 0
              ? parseHtml(htmlContent.content, htmlContent.options)
              : parseMdx(markdownFile);

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

module.exports = indexRecords;
