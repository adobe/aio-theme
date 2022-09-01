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

async function createAlgoliaRecord(rawRecord, file) {
  const record = {
    objectID: rawRecord.objectID,
    contentDigest: rawRecord.contentDigest,
    product: file.product,
    title: rawRecord.title,
    description: rawRecord.description,
    content: rawRecord.content,
    keywords: file.keywords,
    headings: rawRecord.headings,
    contentHeading: rawRecord.contentHeading,
    words: rawRecord.words,
    anchor: rawRecord.anchor,
    spotlight: file.spotlight,
    slug: file.slug,
    url: getUrl(rawRecord, file),
    lastUpdated: getDateLastUpdated(file),
  };
  return record;
}

function getUrl(rawRecord, file) {
  const url = `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${
    file.slug == null ? '' : file.slug
  }${rawRecord.anchor}`;
  return url;
}

function getDateLastUpdated(file) {
  const lastUpdated = file.lastUpdated;
  return lastUpdated;
}

module.exports = createAlgoliaRecord;
