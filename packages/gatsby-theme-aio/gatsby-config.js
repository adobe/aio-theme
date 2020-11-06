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

require('dotenv').config({
  path: `.env`
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.js`)
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/components/MDXFilter/index.js`)
        },
        rehypePlugins: [require(`rehype-slug`)],
        remarkPlugins: [require(`remark-external-links`), require(`remark-docz`)],
        gatsbyRemarkPlugins: [
          {
            resolve: `@adobe/gatsby-remark-afm`,
            options: {
              directory: `src/pages`
            }
          }
        ]
      }
    },
    `gatsby-plugin-mdx-embed`,
    {
      resolve: `@adobe/gatsby-source-github-file-contributors`,
      options: {
        root: process.env.REPO_ROOT,
        repo: {
          token: process.env.REPO_GITHUB_TOKEN,
          owner: process.env.REPO_OWNER,
          name: process.env.REPO_NAME,
          branch: process.env.REPO_BRANCH,
          default_branch: process.env.REPO_DEFAULT_BRANCH
        }
      }
    },
    {
      resolve: `@adobe/gatsby-add-launch-script`,
      options: {
        scriptUrl: process.env.GATSBY_LAUNCH_SRC,
        includeInDevelopment: process.env.GATSBY_LAUNCH_SRC_INCLUDE_IN_DEVELOPMENT || false
      }
    },
    `@adobe/parliament-site-search-index`
  ]
};
