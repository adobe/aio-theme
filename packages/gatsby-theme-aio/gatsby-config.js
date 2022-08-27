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
  path: `.env`,
});

const { DESKTOP_SCREEN_WIDTH } = require('./conf/globals');
const { ALGOLIA_INDEXING_MODES, ALGOLIA_DEFAULT_INDEXING_MODE } = require('./algolia/config/algolia-indexing-modes');
const { ALGOLIA_INDEX_SETTINGS } = require('./algolia/config/algolia-search-settings');
const indexAlgoliaRecords = require('./algolia/index-algolia-records');

let algoliaIndexingMode = process.env.ALGOLIA_INDEXATION_MODE;

if (ALGOLIA_INDEXING_MODES[algoliaIndexingMode] == null) {
  algoliaIndexingMode = ALGOLIA_DEFAULT_INDEXING_MODE;
  console.warn(
    `Algolia: Wrong value for ALGOLIA_INDEXATION_MODE. Should be [${Object.keys(ALGOLIA_INDEXING_MODES).join(
      ' | '
    )}]. Defaults to ${ALGOLIA_DEFAULT_INDEXING_MODE}.`
  );
}

console.info(`Algolia: using indexing mode ${algoliaIndexingMode}`);

module.exports = {
  flags: {
    PARALLEL_QUERY_RUNNING: true,
  },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-mdx-embed`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        mediaTypes: [`text/markdown`, `text/x-markdown`],
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/components/MDXFilter/index.js`),
        },
        plugins: [
          `gatsby-transformer-remark`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-images-remote`,
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-transformer-remark`,
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: false,
              removeAccents: true,
              enableCustomId: true,
              elements: [`h2`, `h3`, `h4`, `h5`],
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `md`, `mdx`],
              destinationDir: `assets`,
            },
          },
          {
            resolve: `gatsby-remark-images-remote`,
            options: {
              maxWidth: DESKTOP_SCREEN_WIDTH,
              linkImagesToOriginal: false,
              showCaptions: false,
              quality: 100,
              withWebp: { quality: 100 },
              disableBgImage: true,
              backgroundColor: 'none',
            },
          },
        ],
      },
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
          default_branch: process.env.REPO_DEFAULT_BRANCH,
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APPLICATION_ID,
        apiKey: process.env.ALGOLIA_WRITE_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: indexAlgoliaRecords(),
        chunkSize: 10000,
        mergeSettings: false,
        settings: ALGOLIA_INDEX_SETTINGS,
        enablePartialUpdates: true,
        matchFields: ['contentDigest'],
        concurrentQueries: false, // default: true
        dryRun: ALGOLIA_INDEXING_MODES[algoliaIndexingMode], // default: true. skipIndexing was removed in v0.26.0
        continueOnFailure: true, // default: false. But we want `true` because the plugin will skip indexing but continue the build if the appId, apiKey, or indexName is missing
      },
    },
  ],
};
