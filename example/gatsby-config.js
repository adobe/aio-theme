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
    versions: [
      {
        title: 'v2.0'
      },
      {
        title: 'v1.4',
        path: 'https://github.com/AdobeDocs/analytics-1.4-apis'
      }
    ],
    pages: [
      {
        title: 'Adobe Analytics',
        path: '/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'API Reference',
        path: '/api/'
      },
      {
        title: 'JS Doc',
        path: '/jsdoc/'
      },
      {
        title: 'Support',
        path: '/support/'
      },
      {
        title: 'Adobe Creative Cloud',
        path: '/creative_cloud/'
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
      },
      {
        title: 'Frame',
        path: '/frame/'
      }
    ],
    subPages: [
      {
        title: 'Get Started',
        path: '/guides/',
        pages: [
          {
            title: 'Overview',
            path: '/guides/'
          },
          {
            title: 'Creating an OAuth Client',
            path: '/guides/creating_oauth_client/'
          }
        ]
      },
      {
        title: 'Reporting API',
        path: '/guides/reporting_api/',
        pages: [
          {
            title: 'Overview',
            path: '/guides/reporting_api/'
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
        path: '/guides/Calculated Metrics API/'
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
          }
        ]
      }
    ]
  },
  plugins: [
    `@adobe/gatsby-theme-aio`
  ],
  pathPrefix: '/example'
};