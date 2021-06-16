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

const CreateRecordsFromAst = require('./query-builder-strategy/create-records-from-ast');
const CreateRecordsFromCache = require('./query-builder-strategy/create-records-from-cache');
const CreateRecordsFromStatic = require('./query-builder-strategy/create-records-from-static');
const { selectAll } = require('unist-util-select');

class QueryBuilder {
  constructor() {
    this.createRecordsFromCache = new CreateRecordsFromCache();
    this.createRecordsFromStatic = new CreateRecordsFromStatic();
    this.createRecordsFromAst = new CreateRecordsFromAst();
  }

  /**
   * @return {Array}
   */
  build = () => {
    const options = {
      tagsToIndex: 'paragraph text, code, tableCell text, heading text, listItem text',
      pagesSourceDir: 20
    };

    return [
      {
        query: `
{
  allMdx(
    filter: {
      fileAbsolutePath: {regex: "/${options.pagesSourceDir}/"}
    }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          description
          frameSrc
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
  createRecords = (node) => {
    const transclusions = selectAll('import', node.mdxAST);

    let records = [];
    if (transclusions.length > 0) {
      records = this.createRecordsFromCache.execute(node);
    } else if (node.frameSrc) {
      records = this.createRecordsFromStatic.execute(node);
    } else {
      records = this.createRecordsFromAst.execute(node);
    }

    console.log(records.length + ' records for "' + (node.title.length ? node.title : node.objectID) + '"');
    return records;
  };
}
module.exports = QueryBuilder;
