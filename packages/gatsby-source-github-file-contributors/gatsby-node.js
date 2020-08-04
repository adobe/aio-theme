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

const globby = require('globby')
const { githubFetchContributorsForPage } = require('./src/gql')
const path = require('path')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, options) => {
  const { paths: pages = ['src/pages'], extensions = ['md'], prefix } = options.pages
  const { token = 'token_not_set', owner, name, branch } = options.repo

  const paths = await globby(pages, { 
    expandDirectories: {
      extensions
    }
  })

  for (const _path of paths) {
    const contributors = await githubFetchContributorsForPage(owner, name, branch, `${prefix}/${_path}`, token)
    actions.createNode({
      contributors,
      path: path.resolve(_path),
      href: `https://github.com/${owner}/${name}`,
      id: createNodeId(_path),
      internal: {
        type: "GithubContributors",
        contentDigest: createContentDigest(_path)
      }
    })
  }
}