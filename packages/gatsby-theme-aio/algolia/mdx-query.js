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

const mdxQuery = `
{
  site {
    pathPrefix
  }
  github {
    repository
  },
  allFile(
    filter: {absolutePath: {regex: "/src/pages/"}, internal: {mediaType: {in: ["text/markdown", "text/mdx", "text/x-markdown"]}}}
  ) {
     nodes {
      id
      internal {
        contentDigest
      }
      birthTime(difference: "days")
      changeTime(difference: "days")
      modifiedTime(fromNow: true)
      icon
      isNew
      howRecent
      size
      childMdx {
        excerpt(pruneLength: 200)
        frontmatter {
          title
          description
          keywords
          category
          featured
          openAPISpec
          jsDoc
          frameSrc
          frameHeight
          contributors
          edition
          hideBreadcrumbNav
          contributor_name
          contributor_link
          noIndex
        }
        headings {
          value
          depth
        }
        wordCount {
          words
        }
        fileAbsolutePath
        slug
        mdxAST
      }
    }
  }
}
`;

module.exports = mdxQuery;
