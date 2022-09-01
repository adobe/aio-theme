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
  allFile(
    filter: {absolutePath: {regex: "/src/pages/"}, internal: {mediaType: {in: ["text/markdown", "text/mdx", "text/x-markdown"]}}}
  ) {
     nodes {
      id
      internal {
        contentDigest
      }
      modifiedTime(fromNow: true)
      childMdx {
        excerpt(pruneLength: 200)
        frontmatter {
          title
          description
          keywords
          spotlight
          openAPISpec
          frameSrc
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
