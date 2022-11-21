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
  const { createTypes } = actions; // define custom types

  createTypes(`
      type SiteSiteMetadata implements Node {
      title: String
      description: String
      home: Home
      pages: [TopPage]
      subPages: [SubPage]
      versions: [Version]
      docs: Link
      salesFAQMenus: salesFAQMenus
      techSupportFAQMenus: techSupportFAQMenus
      subMenuPages: subMenuPages
    }
    
    type subMenuPages {
      path: String
      title: String
      icon: String
      pages: [MenuPages] 
    }
    
    type MenuPages {
      path: String
      title: String
    }

    type salesFAQMenus {
      path: String
      title: String
    }
    
    type techSupportFAQMenus {
      path: String
      title: String
    }
    
    type Home {
      title: String
      path: String
      hidden: Boolean
    }

    type TopPage {
      title: String
      path: String
      menu: [Menu]
    }

    type Menu {
      title: String
      description: String
      path: String
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

    type Version {
      title: String
      path: String
      selected: Boolean
    }

    type Link {
      title: String
      path: String
    }
  `);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    File: {
      isNew: {
        type: 'Boolean',
        resolve: source => source.isNew,
      },
      howRecent: {
        type: 'Int',
        resolve: source => source.howRecent || 0,
      },
      icon: {
        type: 'String',
        resolve: source => source.icon || '',
      },
      path: {
        type: 'String',
        resolve: source => source.path || '',
      },
    },
    MdxFrontmatter: {
      title: {
        type: 'String',
        resolve: source => source.title,
      },
      keywords: {
        type: '[String]',
        resolve: source => source.keywords,
      },
      category: {
        type: 'String',
        resolve: source => source.category,
      },
      description: {
        type: 'String',
        resolve: source => source.description,
      },
      contributors: {
        type: '[String]',
        resolve: source => source.contributors
      },
      contributor_link: {
        type: 'String',
        resolve: source => source.contributor_link,
      },
      contributor_name: {
        type: 'String',
        resolve: source => source.contributor_name,
      },
      edition: {
        type: 'String',
        resolve: source => source.edition,
      },
      openAPISpec: {
        type: 'String',
        resolve: source => source.openAPISpec,
      },
      frameSrc: {
        type: 'String',
        resolve: source => source.frameSrc,
      },
      frameHeight: {
        type: 'String',
        resolve: source => source.frameHeight,
      },
      layout: {
        type: 'String',
        resolve: source => source.layout,
      },
      jsDoc: {
        type: 'Boolean',
        resolve: source => source.jsDoc,
      },
      hideBreadcrumbNav: {
        type: 'Boolean',
        resolve: source => source.hideBreadcrumbNav,
      },
      featured: {
        type: 'Boolean',
        resolve: source => source.featured || false,
      },
    },
  };
  createResolvers(resolvers);
};
