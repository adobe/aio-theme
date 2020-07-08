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

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import { layoutColumns } from './utils';
import './Layout.css';

import { Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import LinkOut from '@spectrum-icons/workflow/LinkOut';
import '@spectrum-css/typography';

import { Hero } from './Hero';
import { Footer } from './Footer';

import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Paragraph } from './Paragraph';
import { List } from './List';
import { Code } from './Code';
import { InlineCode } from './InlineCode';
import { Link } from './Link';
import { Image } from './Image';

import { ContentBlock } from './ContentBlock';
import { Contributors } from './Contributors';
import { Feedback } from './Feedback';

const mdxComponents = {
  // Markdown components
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: List,
  code: Code,
  inlineCode: InlineCode,
  a: Link,
  img: Image,
  // React Spectrum components
  Flex,
  // Custom components
  ContentBlock
};

export default ({ children, pageContext }) => (
  <MDXProvider components={mdxComponents}>
    <main className="spectrum-Typography">
      {pageContext.frontmatter.hero && <Hero {...pageContext.frontmatter.hero[0]} />}
      <section
        css={css`
          max-width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
          margin: 0 var(--spectrum-global-dimension-static-size-800);
        `}>
        <Flex>
          <article
            css={css`
              min-width: ${layoutColumns(9, [
                'var(--spectrum-global-dimension-static-size-400)',
                'var(--spectrum-global-dimension-static-size-200)',
                'var(--spectrum-global-dimension-static-size-100)'
              ])};
            `}>
            {children}
            <Flex alignItems="center" justifyContent="space-between" marginTop="size-800" marginBottom="size-400">
              <View>
                {pageContext.frontmatter.contributors && (
                  <Contributors
                    href="#"
                    contributors={pageContext.frontmatter.contributors}
                    date={new Date().toLocaleDateString()}
                  />
                )}
              </View>
              <View>
                <Feedback
                  onYes={() => {
                    alert('thanks');
                  }}
                  onNo={() => {
                    alert('why not ?');
                  }}
                />
              </View>
            </Flex>
          </article>
          {pageContext.frontmatter.resources && (
            <aside
              css={css`
                min-width: ${layoutColumns(3, [
                  'var(--spectrum-global-dimension-static-size-400)',
                  'var(--spectrum-global-dimension-static-size-100)'
                ])};
                margin-left: var(--spectrum-global-dimension-static-size-400);
                margin-top: var(--spectrum-global-dimension-static-size-400);
              `}>
              <h4 className="spectrum-Heading--XS">Resources</h4>
              <ul
                className="spectrum-Body--M"
                css={css`
                  list-style: none;
                  padding: 0;
                `}>
                {pageContext.frontmatter.resources.map(({ link, text }, i) => (
                  <li
                    key={i}
                    css={css`
                      margin-top: var(--spectrum-global-dimension-static-size-200);
                    `}>
                    <a href={link} target="_blank" rel="nofollow noopener noreferrer">
                      <span
                        css={css`
                          margin-right: var(--spectrum-global-dimension-static-size-100);
                        `}>
                        {text}
                      </span>
                      <LinkOut size="XS" />
                    </a>
                    {/*<Link href={link}*/}
                    {/*      target="_blank"*/}
                    {/*      rel="nofollow noopener noreferrer">*/}
                    {/*  <span css={css`margin-right: var(--spectrum-global-dimension-static-size-100)`}>{text}</span>*/}
                    {/*  <LinkOut size="XS"/>*/}
                    {/*</Link>*/}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </Flex>
      </section>
      <Footer />
    </main>
  </MDXProvider>
);
