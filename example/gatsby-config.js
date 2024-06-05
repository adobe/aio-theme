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

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/example/',
  siteMetadata: {
    docs: {
      title: 'Get Credential',
    },
    home: {
      title: 'Home',
      path: '/home/?plop=plip#foo'
    },
    versions: [
      {
        title: 'v2.0',
        selected: true
      },
      {
        title: 'v1.4',
        path: 'https://adobe.io'
      }
    ],
    pages: [
      {
        title: 'Adobe Analytics',
        path: 'index.md'
      },
      {
        title: 'Get API Key credential',
        path: "/getCredential"
      },
      {
        title: 'Get OAuth S2S credential',
        path: "/get-credential-oauth"
      },
      {
        title: 'Docs',
        menu: [
          {
            title: 'Guides',
            path: '/guides/index.md'
          },
          {
            title: 'Guides without breadcrumbs',
            path: '/guides/no-breadcrumbs.md'
          },
          {
            title: 'Guides without hero breadcrumbs',
            path: '/guides/no-hero-breadcrumb.md'
          }
        ]
      },
      {
        title: 'APIs',
        menu: [
          {
            title: 'Analytics API',
            description: 'This is the OpenAPI page of Adobe Analytics',
            path: '/api/index.md/'
          },
          {
            title: 'Analytics Swagger file',
            description: 'External link',
            path: 'https://raw.githubusercontent.com/AdobeDocs/analytics-2.0-apis/master/docs/swagger.json'
          }
        ]
      },
      {
        title: 'JS Doc',
        path: '/jsdoc/'
      },
      {
        title: 'Support',
        path: '/support/?plop=plip#foo'
      },
      {
        title: 'Frame',
        menu: [
          {
            title: 'Frame communication with Penpal',
            path: '/frame.md/?plop=plip#foo'
          }
        ]
      },
      {
        title: 'Community',
        menu: [
          {
            title: 'Tech Blog',
            path: 'https://medium.com/adobetech'
          },
          {
            title: 'Open Source at Adobe',
            path: '/open'
          },
          {
            title: 'Adobe on GitHub',
            path: 'https://github.com/adobe'
          },
          {
            title: 'Adobe Developer Support',
            path: '/developer-support'
          },
          {
            title: 'Community Forums',
            path: 'https://community.adobe.com/'
          }
        ]
      },
      {
        title: 'CC',
        path: '/creative_cloud/'
      },
      {
        title: 'Ext',
        path: 'https://adobe.io?aio_internal'
      },
      {
        title: 'Project Firefly',
        path: '/project_firefly/'
      },
      {
        title: 'Cloud filter',
        path: '/cloud_filter/'
      },
      {
        title: 'No layout',
        path: '/no_layout/'
      }
    ],
    subPages: [
      {
        title: 'Get Started',
        path: '/guides/?plop=plip#foo',
        pages: [
          {
            title: 'Overview',
            path: '/guides/index.md/?plop=plip#foo'
          },
          {
            title: 'Creating an OAuth Client',
            path: '/guides/creating_oauth_client/index.md'
          },
          {
            title: 'Guide with no breadcrumbs',
            path: '/guides/no-breadcrumbs.md'
          }
        ]
      },
      {
        title: 'Reporting API',
        path: '/guides/reporting_api/',
        pages: [
          {
            title: 'Overview',
            path: '/guides/reporting_api/overview.md'
          },
          {
            title: 'Reporting with breakdowns',
            path: '/guides/reporting_api/reporting_breakdowns/',
            pages: [
              {
                title: 'Reporting with single breakdowns',
                path: '/guides/reporting_api/reporting_breakdowns/',
              },
              {
                title: 'Reporting with multiple breakdowns',
                path: '/guides/reporting_api/reporting_breakdowns/reporting_multiple_breakdowns/',
              },
            ]
          },
          {
            title: 'Nested level 2',
            path: '/guides/reporting_api/nested_level_2/',
            pages: [
              {
                title: 'Nested level 3',
                path: '/guides/reporting_api/nested_level_2/nested_level_3/',
                pages: [
                  {
                    title: 'Nested level 4',
                    path: '/guides/reporting_api/nested_level_2/nested_level_3/nested_level_4/',
                    pages: [
                      {
                        title: 'Nested level 5',
                        path: '/guides/reporting_api/nested_level_2/nested_level_3/nested_level_4/nested_level_5/',
                        pages: [
                          {
                            title: 'Nested level 6',
                            path: '/guides/reporting_api/nested_level_2/nested_level_3/nested_level_4/nested_level_5/nested_level_6/'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: 'Reporting tips and tricks',
            path: '/guides/reporting_api/reporting_tips_tricks/'
          }
        ]
      },
      {
        title: 'Calculated Metrics API',
        path: '/guides/Calculated Metrics API/',
        pages: [
          {
            title: 'External',
            path: 'https://adobe.io'
          }
        ]
      },
      {
        title: 'Overview',
        path: '/support/',
        header: true,
        pages: [
          {
            title: 'Help',
            path: '/support/'
          },
          {
            title: 'FAQ',
            path: '/support/FAQ/'
          },
          {
            title: 'How to contribute',
            path: '/support/contribute/'
          }
        ]
      },
      {
        title: 'Community',
        path: '/support/community/',
        header: true,
        pages: [
          {
            title: 'Information',
            path: '/support/community/'
          },
          {
            title: 'External',
            path: 'https://adobe.io'
          }
        ]
      }

    ]
  },
  plugins: [
    `@adobe/gatsby-theme-aio`
  ],
  developMiddleware: app => {
    app.use(
      "/console/api",
      createProxyMiddleware({
        target: "https://developer-stage.adobe.com/console/api",
        secure: false,
        changeOrigin: true,
      })
    );
    app.use("/templates", createProxyMiddleware({
      target: "https://developer-stage.adobe.com/templates",
      secure: false,
      changeOrigin: true,
    }));

    app.use("/ims", createProxyMiddleware({
      target: "https://ims-na1-stg1.adobelogin.com/ims",
      secure: false,
      changeOrigin: true,
    }));
  },
};
