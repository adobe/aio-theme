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

<<<<<<< HEAD:packages/gatsby-theme-aio/algolia/get-content/create-records-from-html.js
const AlgoliaHTMLExtractor = require('algolia-html-extractor');
const htmlExtractor = new AlgoliaHTMLExtractor();

function createRecordsFromHtml(htmlContent, options) {
  const htmlRecord = htmlExtractor
    .run(htmlContent, { cssSelector: options.tagsToIndex })
    .filter(
      (record) =>
        record.content.length >= options.minCharsLengthPerTag &&
        record.content.split(' ').length >= options.minWordsCount
    );
  return htmlRecord;
}

module.exports = createRecordsFromHtml;
=======
const AlgoliaHTMLExtractor = require('./algolia-html-extractor');
const htmlExtractor = new AlgoliaHTMLExtractor();

function createObjectsFromHtml(content, options) {
  const htmlObjects = htmlExtractor
    .run(content, { cssSelector: options.tagsToIndex })
    .filter(
      htmlElement =>
        htmlElement.content.length >= options.minCharsLengthPerTag &&
        htmlElement.content.split(' ').length >= options.minWordsCount
    );

  return htmlObjects;
}

module.exports = createObjectsFromHtml;
>>>>>>> a57bd3edfa34ff111debb40a470d138afc5261fc:packages/gatsby-theme-aio/algolia/get-content/create-objects-from-html.js
