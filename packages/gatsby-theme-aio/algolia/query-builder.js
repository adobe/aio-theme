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
  build = (options = {}) => {
    const sourceDir = 'src/pages';

    return [
      {
        query: `
      {
        allMdx(
          filter: {
            fileAbsolutePath: {regex: "/${sourceDir}/"}
          }
        ) {
          edges {
            node {
              objectID: id
              headings {
                value
              }
              frontmatter {
                title
                description
                contributors
                keywords
                frameSrc
                openAPISpec
              }
              slug
              fileAbsolutePath
              mdxAST
            }
          }
        }
      }
    `,
        settings: {
          attributeForDistinct: 'id',
          distinct: true
        },
        transformer: ({ data }) => {
          return data.allMdx.edges
            .map((edge) => edge.node)
            .map((node) => {
              const { frontmatter, ...rest } = node;

              return {
                ...frontmatter,
                ...rest
              };
            })
            .map(this.createRecords.bind(this))
            .reduce((accumulator, currentValue) => {
              return [...accumulator, ...currentValue];
            }, []);
        }
      }
    ];
  };

  /**
   * @private
   * @param {Object} node
   * @return {Object}
   */
  createRecords(node) {
    const embeddedContent = selectAll('import', node.mdxAST);

    let records = [];
    if (embeddedContent.length > 0) {
      const options = {
        publicDir: 'public',
        pagesSourceDir: 'src/pages',
        cacheFileExtension: 'html',
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
      records = this.createRecordsForFrame.execute(node, options);
    } else if (node.openAPISpec) {
      const options = {};
      records = this.createRecordsForOpenApi.execute(node, options);
    } else {
      const options = {
        tagsToIndex: 'paragraph text, code, tableCell text',
        minCharsLengthPerTag: 20
      };
      records = this.createRecordsForRegularContent.execute(node, options);
    }

    console.log(records.length + ' records for "' + (node.title.length ? node.title : node.objectID) + '"');
    return records;
  }
}

module.exports = QueryBuilder;
