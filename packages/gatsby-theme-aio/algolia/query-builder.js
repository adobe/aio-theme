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

const AlgoliaHTMLExtractor = require('algolia-html-extractor');
const fs = require('fs');
const normalizePath = require('normalize-path');
const { selectAll } = require('unist-util-select');
const { v4: uuidv4 } = require('uuid');

class QueryBuilder {
  constructor() {
    this.htmlExtractor = new AlgoliaHTMLExtractor();
  }

  /**
   * @return {Array}
   */
  build = (options = {}) => {
    this.indexationFromCacheOptions = options.indexationFromCacheOptions
      ? options.indexationFromCacheOptions
      : {
          publicDir: 'public',
          sourceDir: 'src/pages',
          cacheFileExtension: 'html',
          sourceFileExtension: 'md'
        };

    this.indexationOptions = options.indexationOptions
      ? options.indexationOptions
      : {
          tagsToIndex: 'p, li, td, code',
          minCharsLengthPerTag: 20,
          minWordsCountPerPage: 10
        };

    const graphqlQuery = `
      {
        allMdx(
          filter: {
            fileAbsolutePath: {regex: "/${this.indexationFromCacheOptions.sourceDir}/"},
            wordCount: {words: {gt: ${this.indexationOptions.minWordsCountPerPage}}}
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
              }
              slug
              fileAbsolutePath
              mdxAST
            }
          }
        }
      }
    `;

    return [
      {
        query: graphqlQuery,
        settings: {
          attributeForDistinct: 'id',
          distinct: true
        },
        transformer: ({ data }) => {
          return data.allMdx.edges
            .map((edge) => edge.node)
            .map(this.flattenNode)
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
  flattenNode = (node) => {
    const { frontmatter, ...rest } = node;

    return {
      ...frontmatter,
      ...rest
    };
  };

  /**
   * @private
   * @param {Object} node
   * @return {Object}
   */
  createRecords = (node) => {
    const transclusions = selectAll('import', node.mdxAST);

    const records =
      transclusions.length > 0 ? this.createRecordsBasedOnCache(node) : this.createRecordsBasedOnAST(node);

    console.log(records.length + ' records for "' + (node.title.length ? node.title : node.objectID) + '"');

    return records;
  };

  /**
   * @private
   * @param {Object} node
   * @return {Array}
   */
  createRecordsBasedOnAST(node) {
    const { mdxAST, objectID, slug, title, headings, ...restNodeFields } = node;

    const pageID = objectID;

    // https://mdxjs.com/table-of-components TODO: create map
    const parsedData = selectAll('paragraph text, code, tableCell text', mdxAST).filter((record) => {
      return record.value.length >= this.indexationOptions.minCharsLengthPerTag;
    });

    delete restNodeFields.mdxAST;
    delete restNodeFields.fileAbsolutePath;
    return parsedData.map((record) => {
      return {
        objectID: uuidv4(record.value.toString()),
        title: title === '' ? headings[0]?.value : title,
        ...restNodeFields,
        headings: headings.map((heading) => heading.value),
        content: record.value,
        slug: slug,
        pageID: pageID
      };
    });
  }

  /**
   * @param {Object} node
   * @return {Array}
   */
  createRecordsBasedOnCache(node) {
    const { fileAbsolutePath, ...restNodeFields } = node;

    const [siteDirAbsolutePath, sourceFileRelativePath] = normalizePath(fileAbsolutePath).split(
      this.indexationFromCacheOptions.sourceDir
    );

    const cacheFileAbsolutePath =
      `${siteDirAbsolutePath}${this.indexationFromCacheOptions.publicDir}${sourceFileRelativePath}`.replace(
        new RegExp(`\.${this.indexationFromCacheOptions.sourceFileExtension}$`),
        `.${this.indexationFromCacheOptions.cacheFileExtension}`
      );

    if (!fs.existsSync(cacheFileAbsolutePath)) {
      throw Error(`Cache file resolving error: no such file "${cacheFileAbsolutePath}"`);
    }

    const fileContent = fs.readFileSync(cacheFileAbsolutePath, 'utf8');

    const extractedData = this.htmlExtractor
      .run(fileContent, { cssSelector: this.indexationOptions.tagsToIndex })
      .filter((htmlTag) => htmlTag.content.length >= this.indexationOptions.minCharsLengthPerTag);

    delete restNodeFields.mdxAST;
    delete restNodeFields.fileAbsolutePath;
    return extractedData.map((htmlTag) => ({
      ...restNodeFields,
      objectID: htmlTag.objectID,
      content: htmlTag.content,
      headings: htmlTag.headings,
      customRanking: htmlTag.customRanking,
      internalObjectID: node.objectID
    }));
  }
}

module.exports = QueryBuilder;
