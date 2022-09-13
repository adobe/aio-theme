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

const { getAdobeDocType } = require("./helpers/get-adobe-doctype");

async function createRecord(rawRecord, file) {
  const record = {
    category: getCategory(file.category),
    content: rawRecord.content,
    contentDigest: rawRecord.contentDigest,
    contentHeading: rawRecord.contentHeading,
    description: rawRecord.description,
    excerpt: file.excerpt,
    featured: file.featured,
    headings: rawRecord.headings,
    howRecent: getHowRecent(file.changeTime),
    icon: file.icon,
    isNew: getIsNew(file.birthTime),
    keywords: getKeywords(file.keywords),
    lastUpdated: file.lastUpdated,
    objectID: rawRecord.objectID,
    path: getPath(rawRecord, file),
    product: file.product,
    size: file.size,
    slug: file.slug,
    title: rawRecord.title,
    url: getUrl(rawRecord, file),
    words: rawRecord.words,
  };
  return record;
}

function getIsNew(birthTimeInDays) {
  const days = parseInt(birthTimeInDays, 10);
  return days <= 30;
}

function getHowRecent(lastUpdatedInDays) {
  const days = parseInt(lastUpdatedInDays, 10);
  return days <= 30 ? 3 : days <= 60 ? 2 : days <= 90 ? 1 : 0;
}

// We use the standard documentation types from Experience League to tag our markdown files with the category frontmatter.
// https://experienceleague.adobe.com/docs/authoring-guide-exl/using/authoring/style-guide/content-types.html#product-documentation
function getCategory(category) {
  return getAdobeDocType(category);
}

// TODO: Replace with category frontmatter.
function getKeywords(keywords) {
  return keywords;
}

// Full url complete with anchor link to the nearest heading for the search record result.
function getUrl(rawRecord, file) {
  return `${process.env.GATSBY_SITE_DOMAIN_URL}${file.pathPrefix}${file.slug == null ? '' : file.slug
    }${rawRecord.anchor}`;
}

function getPath(rawRecord, file) {
  return `${file.pathPrefix}${file.slug == null ? '' : file.slug
  }${rawRecord.anchor}`;
}

module.exports = createRecord;
