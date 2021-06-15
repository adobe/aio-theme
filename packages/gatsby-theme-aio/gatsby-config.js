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

require('dotenv').config({
  path: `.env`
});

const AlgoliaConfig = require('./algolia/algolia-config');
const algoliaConfig = new AlgoliaConfig();

const AlgoliaQueryBuilder = require('./algolia/query-builder');
const algoliaQueryBuilder = new AlgoliaQueryBuilder();
const queries = algoliaQueryBuilder.build();

const DESKTOP_SCREEN_WIDTH = require('./conf/globals').DESKTOP_SCREEN_WIDTH;

module.exports = {
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-mdx-embed`,
    `@adobe/parliament-site-search-index`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.js`)
      }
    },
    {
      resolve: `gatsby-source-gdocs2md`,
      options: {
        folder: process.env.GOOGLE_DOCS_FOLDER_ID
      }
    },
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
        plugins: [`gatsby-transformer-remark`, `gatsby-remark-copy-linked-files`, `gatsby-remark-images-remote`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-transformer-remark`
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `md`, `mdx`]
            }
          },
          {
            resolve: `gatsby-remark-images-remote`,
            options: {
              maxWidth: DESKTOP_SCREEN_WIDTH,
              linkImagesToOriginal: false,
              withWebp: { quality: 80 },
              disableBgImage: true,
              backgroundColor: 'none'
            }
          }
        ]
      }
    },
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
        scriptUrl: process.env.ADOBE_LAUNCH_SRC,
        includeInDevelopment: process.env.ADOBE_LAUNCH_SRC_INCLUDE_IN_DEVELOPMENT || false
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: algoliaConfig.getAppId(),
        apiKey: algoliaConfig.getWriteApiKey(),
        indexName: algoliaConfig.getIndexName(), // for all queries
        queries,
        chunkSize: 1000, // default: 1000
        settings: {
          // optional, any index settings
          // Note: by supplying settings, you will overwrite all existing settings on the index
        },
        enablePartialUpdates: false, // default: false
        matchFields: ['slug', 'modified'], // Array<String> default: ['modified']
        concurrentQueries: false, // default: true
        skipIndexing: algoliaConfig.getSkipIndexing(), // default: false, useful for e.g. preview deploys or local development
        dryRun: algoliaConfig.getDryRun(), // default: true, generates index but does not publish it to Algolia
        continueOnFailure: false // default: false, don't fail the build if algolia indexing fails
      }
    }
  ]
};
