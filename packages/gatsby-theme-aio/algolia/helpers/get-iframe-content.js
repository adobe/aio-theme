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

const getContentFromUrl = require('./get-content-from-url');
const getContentFromCache = require('./get-content-from-cache');

/**
 * Support of "frameSrc" directive:
 * https://github.com/adobe/aio-theme#frame
 */

async function getIFrameContent(markdownFile) {
  if (!markdownFile.frameSrc) return null;

  const options = {
    pagesSourceDir: 'src/pages',
    staticSourceDir: 'static',
    tagsToIndex: 'p,td,li',
    minCharsLengthPerTag: 10,
    minWordsCount: 3,
  };

  const content = /^https?:\/\//i.test(markdownFile.frameSrc)
    ? await getContentFromUrl(markdownFile.frameSrc)
    : getContentFromCache(markdownFile, options);

  return { content, options };
}

module.exports = getIFrameContent;
