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

// https://github.com/gatsbyjs/gatsby/issues/24815#issuecomment-645512683
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    optimization: {
      // Else react-spectrum css is discarded
      sideEffects: false
    }
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Link {
      title: String,
      path: String
    }
    
    type SiteSiteMetadata {
      globalNav: GlobalNav
      pages: [Link]
      subPages: [SubPage]
      versions: [Link],
      docs: Link
    }
    
    type GlobalNav {
      home: Link
      menus: [Menu]
      console: Boolean
      signIn: Boolean
      footer: Footer
    }
    
    type Menu {
      title: String,
      path: String,
      sections: [Section]
    }
    
    type Section {
      heading: String,
      viewAll: Link,
      divider: Boolean,
      pages: [SectionPage]
    }
    
    type SectionPage {
      title: String,
      path: String,
      description: String
    }
    
    type SubPage {
      title: String,
      path: String,
      header: Boolean,
      pages: [NestedSubPage1]
    }
    
    type NestedSubPage1 {
      title: String,
      path: String,
      pages: [NestedSubPage2]
    }
    
    type NestedSubPage2 {
      title: String,
      path: String,
      pages: [NestedSubPage3]
    }
    
    type NestedSubPage3 {
      title: String,
      path: String,
      pages: [NestedSubPage4]
    }
    
    type NestedSubPage4 {
      title: String,
      path: String,
      pages: [NestedSubPage5]
    }
    
    type NestedSubPage5 {
      title: String,
      path: String,
      pages: [Link]
    }
    
    type Footer {
      allAPIs: Link
      APIs: [Link]
      services: [Link]
      community: [Link]
      support: [Link]
      developer: [Link]
      legal: [Link]
    }
  `;

  createTypes(typeDefs);
};
