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

const normalizePath = require('normalize-path');
const { existsSync, readFileSync } = require('fs');

/**
 * Support of "frameSrc" directive:
 * https://github.com/adobe/aio-theme#frame
 */
function getContentFromCache(markdownFile, options) {
  const { fileAbsolutePath } = markdownFile;
  const [siteDirAbsolutePath] = normalizePath(fileAbsolutePath).split(options.pagesSourceDir);
  const staticFileAbsolutePath = `${siteDirAbsolutePath}${options.staticSourceDir}${markdownFile.frameSrc}`;

  if (!existsSync(staticFileAbsolutePath)) {
    throw Error(`Static file resolving error: no such file "${staticFileAbsolutePath}"`);
  }

  return readFileSync(staticFileAbsolutePath, 'utf8');
}

module.exports = getContentFromCache;
