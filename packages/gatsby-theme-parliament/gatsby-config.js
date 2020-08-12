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

module.exports = {
  siteMetadata: {
    globalNav: {
      home: {
        title: '',
        path: ''
      },
      menus: [
        {
          title: '',
          sections: [
            {
              heading: '',
              viewAll: {
                title: '',
                path: ''
              },
              divider: false,
              pages: [
                {
                  title: '',
                  path: '',
                  description: ''
                }
              ]
            }
          ]
        }
      ],
      console: false,
      signIn: false
    },
    pages: [
      {
        title: 'Overview',
        path: '/overview/'
      }
    ],
    versions: [
      {
        title: '',
        path: ''
      }
    ],
    subPages: [
      {
        title: '',
        path: '',
        pages: [
          {
            title: '',
            path: '',
            pages: [
              {
                title: '',
                path: ''
              }
            ]
          }
        ]
      }
    ],
    docs: {
      path: ''
    },
    github: {
      repository: 'adobe/gatsby-theme-parliament',
      branch: 'main'
    }
  },
  plugins: [
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          pages: `src/pages`,
          components: `src/components`
        }
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`)
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
          default: require.resolve(`./src/components/MDXFilter.js`)
        },
        rehypePlugins: [require(`rehype-slug`)],
        remarkPlugins: [require(`remark-external-links`), require(`remark-docz`)],
        gatsbyRemarkPlugins: ['@adobe/gatsby-remark-afm']
      }
    },
    {
      resolve: `@adobe/gatsby-source-github-file-contributors`,
      options: {
        root: 'example',
        repo: {
          token: process.env.GITHUB_TOKEN,
          owner: process.env.GITHUB_REPO_OWNER,
          name: process.env.GITHUB_REPO_NAME,
          branch: process.env.GITHUB_REPO_BRANCH
        }
      }
    }
  ]
};
