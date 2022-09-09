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

const { ProvidePlugin } = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        tty: require.resolve('tty-browserify'),
        os: require.resolve('os-browserify/browser'),
      },
    },
    plugins: [
      new ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Link {
      title: String
      path: String
    }

    type Menu {
      title: String
      description: String
      path: String
    }

    type TopPage {
      title: String
      path: String
      menu: [Menu]
    }

    type Version {
      title: String
      path: String
      selected: Boolean
    }

    type Home {
      title: String
      path: String
      hidden: Boolean
    }

    type SiteSiteMetadata {
      home: Home
      pages: [TopPage]
      subPages: [SubPage]
      versions: [Version]
      docs: Link
    }

    type SubPage {
      title: String
      path: String
      header: Boolean
      pages: [NestedSubPage1]
    }

    type NestedSubPage1 {
      title: String
      path: String
      pages: [NestedSubPage2]
    }

    type NestedSubPage2 {
      title: String
      path: String
      pages: [NestedSubPage3]
    }

    type NestedSubPage3 {
      title: String
      path: String
      pages: [NestedSubPage4]
    }

    type NestedSubPage4 {
      title: String
      path: String
      pages: [NestedSubPage5]
    }

    type NestedSubPage5 {
      title: String
      path: String
      pages: [Link]
    }
  `;
  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    File: {
      isNew: {
        type: 'Boolean',
        resolve(source) {
          const birthTime = new Date(source.birthTime);
          const publishDate = birthTime.getTime();
          const daysPassed = Math.floor((Date.now() - publishDate) / 1000 / 60 / 60 / 24);
          return daysPassed <= 60; // 60 days
        }
      },
      howRecent: {
        type: 'Int',
        resolve(source, args, context, info) {
          const changeTime = new Date(source.changeTime);
          const timeUpdated = changeTime.getTime();
          const daysPassed = Math.floor((Date.now() - timeUpdated) / 1000 / 60 / 60 / 24);
          return daysPassed <= 30 ? 3 : daysPassed <= 60 ? 2 : daysPassed <= 120 ? 1 : 0;
        },
      },
      icon: {
        type: 'String',
        resolve(source) {
          return source.icon;
        }
      },
    },
    MdxFrontmatter: {
      title: {
        type: 'String',
        resolve(source) {
          return source.title;
        }
      },
      keywords: {
        type: '[String]',
        resolve(source) {
          return source.keywords;
        }
      },
      category: {
        type: 'String',
        resolve(source) {
          return source.category;
        }
      },
      description: {
        type: 'String',
        resolve(source) {
          return source.description;
        }
      },
      contributors: {
        type: '[String]',
        resolve(source) {
          return source.contributors;
        }
      },
      contributor_name: {
        type: 'String',
        resolve(source) {
          return source.contributor_name;
        }
      },
      contributor_link: {
        type: 'String',
        resolve(source) {
          return source.contributor_link;
        }
      },
      edition: {
        type: 'String',
        resolve(source) {
          return source.edition;
        }
      },
      openAPISpec: {
        type: 'String',
        resolve(source) {
          return source.openAPISpec;
        }
      },
      frameSrc: {
        type: 'String',
        resolve(source) {
          return source.frameSrc;
        }
      },
      frameHeight: {
        type: 'String',
        resolve(source) {
          return source.frameHeight;
        }
      },
      layout: {
        type: 'String',
        resolve(source) {
          return source.layout;
        }
      },
      jsDoc: {
        type: 'Boolean',
        resolve(source) {
          return source.jsDoc;
        }
      },
      hideBreadcrumbNav: {
        type: 'Boolean',
        resolve(source) {
          return source.hideBreadcrumbNav;
        }
      },
      featured: {
        type: 'Boolean',
        resolve(source) {
          return source.featured;
        }
      },
    },
  };
  createResolvers(resolvers);
};
