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

async function createRecord(rawRecord, file) {
  const record = {
    anchor: rawRecord.anchor,
    category: getCategory(file.category),
    content: rawRecord.content,
    contentDigest: rawRecord.contentDigest,
    contentHeading: rawRecord.contentHeading,
    description: rawRecord.description,
    excerpt: file.excerpt,
    featured: file.featured,
    headings: rawRecord.headings,
    keywords: getKeywords(file.keywords),
    lastUpdated: file.lastUpdated,
    new: getNewStatus(file.birthTime),
    objectID: rawRecord.objectID,
    product: file.product,
    productIcon: getProductIcon(),
    size: file.size,
    slug: file.slug,
    title: rawRecord.title,
    updated: getTimeUpdated(file.changeTime),
    url: getUrl(rawRecord, file),
    words: rawRecord.words,
  };
  return record;
}

// TODO: Replace `keywords` with `category` within the frontmatter.
//  Category refers to content type, with only a few for writers/teams to pick from:
//  - Overview (Introduction, concepts, philosophy, etc.)
//  - Setup (getting started, settings, configuration, etc.)
//  - Architecture (Structure, etc. )
//  - Instructions (Synonyms: How-to, tutorial, steps, etc.)
//  - API (Synonyms: Reference, library, SDK, events, etc.)
//  Populating category will be easier and less varied than keywords. Provides more structure.
function getCategory(category) {
  // use `file.category` (from the `category` key in the frontmatter) to set standard checkbox names for content types.
  if (category == null) return;
  const contentType = category?.toLowerCase();

  if (
    contentType === 'overview' ||
    contentType === 'introduction' ||
    contentType === 'concepts' ||
    contentType === 'getting started'
  ) {
    return 'Overview';
  }
  if (
    contentType === 'instructions' ||
    contentType === 'steps' ||
    contentType === 'how-to' ||
    contentType === 'tutorial'
  ) {
    return 'Setup';
  }
  // and so on...
}

function getKeywords(keywords) {
  return keywords;
}

const DAYS_CONSIDERED_NEW = 60;

// The topic is considered new if created in the last 60 days. New topics in returned results get higher ranking.
function getNewStatus(birthTime) {
  if (birthTime == null) return;
  const publishDate = birthTime.getTime();
  const daysPassed = Math.floor((Date.now() - publishDate) / 1000 / 60 / 60 / 24);
  return daysPassed <= DAYS_CONSIDERED_NEW;
}

// Most recently updated gets a higher number for customRanking
function getTimeUpdated(changeTime) {
  if (changeTime == null) return;
  const timeUpdated = changeTime.getTime();
  const daysPassed = Math.floor((Date.now() - timeUpdated) / 1000 / 60 / 60 / 24);
  return daysPassed <= 30 ? 3 : daysPassed <= 60 ? 2 : daysPassed <= 120 ? 1 : 0;
}

// Full url complete with anchor link to the nearest heading for the search record result.
function getUrl(rawRecord, file) {
  const url = `${process.env.GATSBY_SITE_DOMAIN_URL}${process.env.PATH_PREFIX}${
    file.slug == null ? '' : file.slug
  }${rawRecord.anchor}`;
  return url;
}

// TODO: Get url that returns the product icon so that the search results can be easily identified by product.
function getProductIcon() {
  // Need to find out if there are standard urls for Adobe product icons.
}

module.exports = createRecord;
