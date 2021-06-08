/*
 * Copyright 2020 Adobe. All rights reserved.
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

class QueryBuilder {
  constructor() {
    this.htmlExtractor = new AlgoliaHTMLExtractor();
  }

  /**
   * @return {Array}
   */
  build = (options = {}) => {
    this.htmlTagsToIndex = options.htmlTagsToIndex
        ? options.htmlTagsToIndex
        : ['p', 'li', 'td', { tag: 'code', minLength: 6 }];

    const graphqlQuery = options.graphqlQuery
        ? options.graphqlQuery
        : `
{
  allMarkdownRemark {
    nodes {
      objectID: id
      frontmatter {
        description
        title
      }
      html
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
          return data.allMarkdownRemark.nodes
              .map((node) => node)
              .map(this.flattenNodes)
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
  flattenNodes = (node) => {
    const { frontmatter, ...rest } = node;

    return {
      ...frontmatter,
      ...rest
    };
  };

  /**
   * @private
   * @param {Object} htmlTagsToIndex
   * @return {Object}
   */
  getHtmlExtractorOptions(htmlTagsToIndex) {
    let cssSelector = '';
    let tagsLengthLimitation = {};

    htmlTagsToIndex.forEach((element) => {
      if (typeof element === 'string' || element instanceof String) {
        cssSelector += ',' + element.toLowerCase();
      } else if (element.tag !== undefined) {
        cssSelector += ',' + element.tag.toLowerCase();

        if (element.minLength !== undefined) {
          tagsLengthLimitation[element.tag.toLowerCase()] = element.minLength;
        }
      }
    });
    cssSelector = cssSelector.substring(1);

    return {
      cssSelector: cssSelector,
      tagsLengthLimitation: tagsLengthLimitation
    };
  }

  /**
   * @private
   * @param {Object} node
   * @return {Object}
   */
  createRecords = (node) => {
    const { html, ...rest } = node;
    const { cssSelector, tagsLengthLimitation } = this.getHtmlExtractorOptions(this.htmlTagsToIndex);

    const extractedData = this.htmlExtractor
        .run(html, { cssSelector: cssSelector })
        .filter(
            (htmlTag) =>
                tagsLengthLimitation[htmlTag.node.tagName.toLowerCase()] === undefined ||
                htmlTag.content.length >= tagsLengthLimitation[htmlTag.node.tagName.toLowerCase()]
        );

    const records = extractedData.map((htmlTag) => ({
      ...rest,
      objectID: htmlTag.objectID,
      content: htmlTag.content,
      headings: htmlTag.headings,
      custom_ranking: htmlTag.customRanking,
      internalObjectID: node.objectID
    }));

    console.log(records.length + ' records for "' + (node.title.length ? node.title : node.objectID) + '"');
    return records;
  };
}
module.exports = QueryBuilder;
