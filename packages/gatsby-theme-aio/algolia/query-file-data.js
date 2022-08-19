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

const createFileRecords = require('./create-file-records');

function queryFileData(options = {}) {
  const sourceDir = 'src/pages';

  return [
    {
      query: `
        {
          allFile(
            filter: {absolutePath: {regex: "/${sourceDir}/"}, internal: {mediaType: {in: ["text/markdown", "text/mdx", "text/x-markdown"]}}}
          ) {
            nodes {
              id
              internal {
                contentDigest
              }
              modifiedTime(fromNow: true)
              size
              childMdx {
                frontmatter {
                  title
                  description
                  keywords
                  edition
                  contributor_name
                  contributor_link
                  openAPISpec
                  frameSrc
                }
                headings {
                  value
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
      `,
      transformer: async function ({
        data: {
          allFile: { nodes }
        }
      }) {
        const fileNodes = nodes.map((node) => {
          const {
            id,
            internal: { contentDigest },
            modifiedTime: lastModified,
            size,
            childMdx: {
              frontmatter: {
                title,
                description,
                keywords,
                edition,
                contributor_name,
                contributor_link,
                openAPISpec,
                frameSrc
              },
              headings,
              wordCount: { words },
              fileAbsolutePath,
              slug,
              mdxAST
            }
          } = node;

          // Returns flattened File node used to build normalized Algolia records
          // that we later send to populate the Algolia index for the site/repo.
          return {
            id,
            contentDigest,
            title,
            description,
            keywords,
            edition,
            contributor_name,
            contributor_link,
            openAPISpec,
            frameSrc,
            headings,
            words,
            fileAbsolutePath,
            slug,
            mdxAST,
            lastModified,
            size
          };
        });

        let algoliaRecords = [];
        for (const node of fileNodes) {
          algoliaRecords = [...algoliaRecords, ...(await createFileRecords(node))];
        }
        return algoliaRecords;
      }
    }
  ];
}

module.exports = queryFileData;
