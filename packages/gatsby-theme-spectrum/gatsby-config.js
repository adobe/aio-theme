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
    header: {
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
                items: [
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
          path: '/'
        }
      ],
      docs: {
        path: ''
      }
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
        component: require.resolve(`./src/components/Provider.js`)
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/components/Layout.js`)
        },
        rehypePlugins: [require(`rehype-slug`)],
        remarkPlugins: [require(`remark-external-links`), require(`remark-docz`)]
      }
    }
  ]
};
