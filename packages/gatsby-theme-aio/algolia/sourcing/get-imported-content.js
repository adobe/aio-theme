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

const { existsSync, readFileSync } = require('fs')
const normalizePath = require('normalize-path')
const { selectAll } = require('unist-util-select')

/**
 * Support of "import" directive:
 * https://github.com/adobe/aio-theme#embedding-markdown-documents-and-filtering-content
 *
 * Parse index records from cache files.
 */

async function getImportedContent (markdownFile) {
  const importedContent = await selectAll('import', markdownFile.mdxAST)
  if (importedContent.length <= 0) return null

  const options = {
    publicDir: 'public',
    pagesSourceDir: 'src/pages',
    publicFileExtension: 'html',
    sourceFileExtension: 'md',
    tagsToIndex: 'p,td,li',
    minCharsLengthPerTag: 10,
    minWordsCount: 2
  }

  const { fileAbsolutePath } = markdownFile
  const [siteDirAbsolutePath, sourceFileRelativePath] = normalizePath(fileAbsolutePath).split(
    options.pagesSourceDir
  )

  const publicSourceFilePath = `${siteDirAbsolutePath}${options.publicDir}${sourceFileRelativePath}`
  const sourceFileExtension = new RegExp(`${options.sourceFileExtension}$`)
  const publicFileExtension = `.${options.publicFileExtension}`

  const isIndexFile = sourceFileRelativePath.split('/').pop() === 'index.md'

  const cacheFileAbsolutePath = isIndexFile
    ? publicSourceFilePath.replace(sourceFileExtension, publicFileExtension)
    : publicSourceFilePath.replace(sourceFileExtension, '/') + 'index.html'

  if (!existsSync(cacheFileAbsolutePath)) {
    throw Error(`Cache file resolving error: no such file "${cacheFileAbsolutePath}"`)
  }

  const content = readFileSync(cacheFileAbsolutePath, 'utf8')
  return { content, options }
}

module.exports = getImportedContent
