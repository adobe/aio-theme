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
const axios = require('axios').default;
const parseHtml = require('./helpers/parse-html');
const parseMdx = require('./helpers/parse-mdx');
const createAlgoliaRecord = require('./create-record');

function indexRecords(isDryRun) {
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
        let productIndexMap;
        try {
          const result = await axios.get(
            'https://raw.githubusercontent.com/AdobeDocs/search-indices/main/product-index-map.json'
          );
          productIndexMap = result.data;
        } catch (error) {
          console.error(`AIO: Failed fetching search index.\n${error}`);
          process.exit();
        }

        const productFromPath = productIndexMap.find(prod => {
          return prod.productIndices.some(index => {
            return index.indexPathPrefix.includes(pathPrefix);
          });
        });

        const markdownFiles = [];
        for (const node of nodes) {

          // skip file if noIndex is set true in frontmatter
          if (node.childMdx.frontmatter.noIndex) continue;

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
            contentDigest: node.internal.contentDigest,
            icon: node.icon,
            isNew: node.isNew,
            keywords: node.childMdx.frontmatter.keywords,
            lastUpdated: node.modifiedTime,
            mdxAST: node.childMdx.mdxAST,
            objectID: node.id,
            openAPISpec: node.childMdx.frontmatter.openAPISpec,
            pathPrefix: `${pathPrefix}/`,
            product: productFromPath.productName ? productFromPath.productName : "other",
            size: node.size,
            slug: node.childMdx.slug,
            title: node.childMdx.frontmatter.title,
            words: node.childMdx.wordCount.words,
          });
        }

        const frontmatterReport = isDryRun => {
          // markdownFiles frontmatter report - start
          let warnCount = 0;
          let passCount = 0;

          console.log('\x1b[35m ==== FRONTMATTER REPORT - STARTING ==================== \x1b[0m');
          console.info('\x1b[36m [cmd + click] on the file path to open \x1b[0m');
          markdownFiles.forEach(file => {
            if (!file.description || !file.keywords || !file.title) {
              warnCount++;
              console.log('\n\x1b[43mWarn\x1b[0m - ' + file.fileAbsolutePath + ': ');
              if (!file.title) console.log('\x1b[33m\tMissing Title \x1b[0m');
              if (!file.description) console.log('\x1b[33m\tMissing Description \x1b[0m');
              if (!file.keywords) console.log('\x1b[33m\tMissing Keywords \x1b[0m');
            } else {
              passCount++;
              console.log('\x1b[42mPass\x1b[0m - ' + file.fileAbsolutePath);
            }
          });

          if (isDryRun) {
            if (passCount)
              console.info(
                `- \x1b[42m${passCount} Pages have Title, Description, and Keywords\x1b[0m`
              );
            if (warnCount)
              console.warn(`- \x1b[43m${warnCount} Pages are missing frontmatter\x1b[0m`);
          } else {
            if (passCount)
              console.info(
                `- \x1b[42m${passCount} Pages have Title, Description, and Keywords\x1b[0m`
              );
            // Implement an Error or prompt to user when attempting to index frontmatter-less files
            if (warnCount)
              console.error(`\x1b[41m${warnCount} Pages are missing frontmatter\x1b[0m`);
          }
          console.log('\x1b[35m ==== FRONTMATTER REPORT - FINISHED ==================== \x1b[0m');

          // markdownFiles frontmatter report - end
        };

        frontmatterReport(isDryRun);

        const algoliaRecords = [];

        for (const markdownFile of markdownFiles) {
          // Get source content
          const htmlContent =
            (await getImportedContent(markdownFile)) ??
            (await getIFrameContent(markdownFile)) ??
            (await getOpenApiContent(markdownFile)) ??
            {};

          // Create 'raw' records from content
          let rawRecords =
            Object.keys(htmlContent).length > 0
              ? parseHtml(htmlContent.content, htmlContent.options)
              : parseMdx(markdownFile);

          if (rawRecords == null || rawRecords.length <= 0) continue;

          // Create Algolia records from rawRecords
          for (const rawRecord of rawRecords) {
            const record = await createAlgoliaRecord(rawRecord, markdownFile);
            if (record.size > 20000) {
              console.warn(JSON.stringify(record));
              console.warn(`Record at path ${record?.path} objectID=${record?.objectID} is too big
              size=${record?.size}/20000 bytes and will be skipped.`);
            } else {
              algoliaRecords.push(record);
            }
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
