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
const createHtmlObjects = require('./get-content/create-objects-from-html');
const createHtmlRecords = require('./create-html-records');
const createMarkdownRecords = require('./create-markdown-records');

async function indexAlgoliaRecords() {
  return [
    {
      query: mdxQuery,
      transformer: async function ({
        data: {
          allFile: { edges },
        },
      }) {
        const markdownObjects = edges.map(({ node: mdxFile }) => {
          // Creates new markdown data objects from the mdxQuery source data (from the markdown files in src/pages).
          return {
            id: mdxFile.id,
            contentDigest: mdxFile.internal.contentDigest,
            lastUpdated: mdxFile.modifiedTime,
            size: mdxFile.size,
            headings: mdxFile['childMdx'].headings,
            content: mdxFile['childMdx'].excerpt,
            words: mdxFile['childMdx'].wordCount.words,
            fileAbsolutePath: mdxFile['childMdx'].fileAbsolutePath, // Required for additional source data
            slug: mdxFile['childMdx'].slug,
            title: mdxFile['childMdx'].frontmatter.title,
            description: mdxFile['childMdx'].frontmatter.description,
            keywords: mdxFile['childMdx'].frontmatter.keywords, // Used for search filters
            openAPISpec: mdxFile['childMdx'].frontmatter.openAPISpec, // Required for OpenAPI sources
            frameSrc: mdxFile['childMdx'].frontmatter.frameSrc, // Required for iframe sources
            spotlight: mdxFile['childMdx'].frontmatter.spotlight, // Added to elevate records from file
            mdxAST: mdxFile['childMdx'].mdxAST,
          };
        });

        // TODO: Step through with debugger on different source files/repos
        // Creates record objects from the html of the imported, framed, or OpenApi content referenced in the markdown.
        const htmlObjects = async node => {
          const htmlContent =
            (await getImportedContent(node)) ?? (await getFrameContent(node)) ?? (await getOpenApiContent(node));

          if (htmlContent == null) return [];

          return createHtmlObjects(htmlContent.content, htmlContent.options);
        };

        let markdownRecords = [];
        let htmlRecords = [];

        // TODO: Replace with real conditional
        const isHtmlObject = false;
        // TODO: Step through with debugger
        if (isHtmlObject) {
          for (const htmlObject of htmlObjects) {
            htmlRecords = await createHtmlRecords(htmlObject);
            const tempRecords = htmlRecords.map(({ mdxAST, ...keepAttrs }) => {
              return keepAttrs;
            });
            console.log(`${tempRecords.length} records for "${node?.title === '' ? node.slug : node?.title}"`);
            htmlRecords = [...htmlRecords, ...tempRecords];
          }
          return htmlRecords;
        }

        for (const markdownObject of markdownObjects) {
          markdownRecords = await createMarkdownRecords(markdownObject);
          // TODO: Rework this, step through with debugger
          const tempRecords = markdownRecords.map(({ mdxAST, ...keepAttrs }) => {
            return keepAttrs;
          });
          console.log(`${tempRecords.length} records for "${node?.title === '' ? node.slug : node?.title}"`);
          markdownRecords = [...markdownRecords, ...tempRecords];
        }
        return markdownRecords;
      },
    },
    // OPTIONAL: Additional queries and resulting records can be added to specific Algolia indexes as shown here.
    // {
    //   query: myQuery,
    //   transformer: ({ data }) => data.pages.nodes, // optional
    //   indexName: 'index name to target', // overrides main index name, optional
    //   settings: {
    //   // optional, any index settings
    //   // Note: by supplying settings, you will overwrite all existing settings on the index
    //   },
    //   matchFields: ['slug', 'modified'], // Array<String> overrides main match fields, optional
    //   mergeSettings: false, // optional, defaults to false. See notes on mergeSettings below
    //   queryVariables: {}, // optional. Allows you to use graphql query variables in the query
    // }
  ];
}

module.exports = indexAlgoliaRecords;
