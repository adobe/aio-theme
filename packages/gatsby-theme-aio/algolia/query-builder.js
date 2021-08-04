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

const CreateRecordsForEmbeddedContent = require('./records/create-records-for-embedded-content');
const CreateRecordsForFrame = require('./records/create-records-for-frame');
const CreateRecordsForOpenApi = require('./records/create-records-for-open-api');
const CreateRecordsForRegularContent = require('./records/create-records-for-regular-content');
const { selectAll } = require('unist-util-select');
const { removeDuplicateRecords } = require('./records/record-utils');

class QueryBuilder {
  constructor() {
    this.createRecordsForRegularContent = new CreateRecordsForRegularContent();
    this.createRecordsForEmbeddedContent = new CreateRecordsForEmbeddedContent();
    this.createRecordsForFrame = new CreateRecordsForFrame();
    this.createRecordsForOpenApi = new CreateRecordsForOpenApi();
  }

  /**
   * @return {Array}
   */
  build(options = {}) {
    const sourceDir = 'src/pages';
    const self = this;

    return [
      {
        query: `
        {
          allFile(
            filter: {absolutePath: {regex: "/${sourceDir}/"}, internal: {mediaType: {in: ["text/markdown", "text/mdx", "text/x-markdown"]}}}
          ) {
            edges {
              node {
                ctimeMs
                modifiedTime(fromNow: true)
                size
                prettySize
                extension
                childMdx {
                  objectID: id
                  fileAbsolutePath
                  frontmatter {
                    title
                    description
                    contributors
                    product
                    keywords
                    openAPISpec
                    frameSrc
                  }
                  headings {
                    value
                  }
                  wordCount {
                    words
                  }
                  slug
                  mdxAST
                }
              }
            }
          }
        }
      `,
        settings: {
          searchableAttributes: ['title', 'contentHeading', 'description,content'],
          // TODO: Comment out the ranking override to let Algolia's default determine it. Investigate more.
          // ranking: ['words', 'typo', 'proximity', 'attribute', 'exact', 'geo', 'filters'],
          customRanking: ['desc(ctimeMs)'],
          attributesForFaceting: ['searchable(keywords)', 'filterOnly(product)'],
          attributesToSnippet: ['content:55', 'description:55'],
          snippetEllipsisText: '…',
          distinct: true,
          attributeForDistinct: 'pageID',
          highlightPreTag: '<mark>',
          highlightPostTag: '</mark>',
          hitsPerPage: 20,
          ignorePlurals: true,
          restrictHighlightAndSnippetArrays: false,
          minWordSizefor1Typo: 4,
          minWordSizefor2Typos: 8,
          typoTolerance: true,
          allowTyposOnNumericTokens: true,
          minProximity: 1,
          responseFields: ['*'],
          advancedSyntax: true
        },
        transformer: async function ({
          data: {
            allFile: { edges }
          }
        }) {
          const nodes = edges
            .map((edge) => edge.node)
            .map((node) => {
              const { childMdx, ...restFileFields } = node;
              const { frontmatter, ...restMdxFields } = childMdx;

              return {
                ...restFileFields,
                ...childMdx.frontmatter,
                ...restMdxFields
              };
            });

          let records = [];
          for (const node of nodes) {
            records = [...records, ...(await self.createRecords(node))];
          }
          return records;
        }
      }
    ];
  }

  /**
   * @private
   * @param {Object} node
   * @return {Object}
   */
  async createRecords(node) {
    const embeddedContent = selectAll('import', node.mdxAST);

    let records = [];
    if (embeddedContent.length > 0) {
      const options = {
        publicDir: 'public',
        pagesSourceDir: 'src/pages',
        publicFileExtension: 'html',
        sourceFileExtension: 'md',
        tagsToIndex: 'p, li, td, code',
        minCharsLengthPerTag: 20
      };
      records = this.createRecordsForEmbeddedContent.execute(node, options);
    } else if (node.frameSrc) {
      const options = {
        pagesSourceDir: 'src/pages',
        staticSourceDir: 'static',
        tagsToIndex: 'p, li, td, code',
        minCharsLengthPerTag: 20
      };
      records = await this.createRecordsForFrame.execute(node, options);
    } else if (node.openAPISpec) {
      const options = {
        tempDir: './public/bootprint',
        tagsToIndex: 'p, li, td, code',
        minCharsLengthPerTag: 20
      };
      records = await this.createRecordsForOpenApi.execute(node, options);
    } else {
      const options = {
        tagsToIndex: 'paragraph text, code, tableCell text',
        minCharsLengthPerTag: 20
      };
      records = this.createRecordsForRegularContent.execute(node, options);
    }

    records = records.map(({ mdxAST, fileAbsolutePath, frameSrc, openAPISpec, ...keepAttrs }) => keepAttrs);
    records = removeDuplicateRecords(records);

    console.log(records.length + ' records for "' + (node.title?.length ? node.title : node.objectID) + '"');
    return records;
  }
}

module.exports = QueryBuilder;
