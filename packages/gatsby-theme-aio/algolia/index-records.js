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
          site: { pathPrefix },
          github: { repository },
          allFile: { nodes },
        },
      }) {
        const markdownFiles = [];
        for (const node of nodes) {
          markdownFiles.push({
            birthTime: node.birthTime,
            category: node.childMdx.frontmatter.category,
            changeTime: node.changeTime,
            description: node.childMdx.frontmatter.description,
            excerpt: node.childMdx.excerpt,
            featured: node.childMdx.frontmatter.featured,
            fileAbsolutePath: node.childMdx.fileAbsolutePath,
            frameSrc: node.childMdx.frontmatter.frameSrc,
            headings: node.childMdx.headings,
            howRecent: node.howRecent,
            icon: node.icon,
            isNew: node.isNew,
            keywords: node.childMdx.frontmatter.keywords,
            lastUpdated: node.modifiedTime,
            mdxAST: node.childMdx.mdxAST,
            objectID: node.id,
            openAPISpec: node.childMdx.frontmatter.openAPISpec,
            pathPrefix: `${pathPrefix}/`,
            product: getProductFromIndex(repository),
            size: node.size,
            slug: node.childMdx.slug,
            title: node.childMdx.frontmatter.title,
            words: node.childMdx.wordCount.words,
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
