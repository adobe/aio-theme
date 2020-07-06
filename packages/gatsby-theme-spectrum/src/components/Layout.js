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
import {MDXProvider} from '@mdx-js/react';
import {css} from '@emotion/core';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import './Layout.css';

import {Provider} from '@react-spectrum/provider';
import {theme} from '@react-spectrum/theme-default';
import {Grid, Flex} from '@react-spectrum/layout';
import {View} from '@react-spectrum/view';
import LinkOut from '@spectrum-icons/workflow/LinkOut';
import '@spectrum-css/typography/dist/index-vars.css';

import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

import Heading1 from './Heading1';
import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Paragraph from './Paragraph';
import List from './List';
import Code from './Code';
import InlineCode from './InlineCode';
import Link from './Link';
import Image from './Image';

import ContentBlock from './ContentBlock';
import Contributors from './Contributors';
import Feedback from './Feedback';

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

export default ({children, pageContext, path}) => (
  <HelmetProvider>
    <Helmet>
      <title>{pageContext.frontmatter.title}</title>
      <meta name="description" content={pageContext.frontmatter.description}/>
    </Helmet>
    <Provider theme={theme} colorScheme="light" locale="en-US">
      <MDXProvider components={mdxComponents}>
        <View backgroundColor="gray-50">
          <Grid
            areas={[
              'header',
              'main'
            ]}
            rows={['size-800']}>
            <View gridArea="header">
              <Header path={path}/>
            </View>
  
            <View gridArea="main">
              <main className="spectrum-Typography">
                {pageContext.frontmatter.hero && <Hero {...pageContext.frontmatter.hero[0]} />}
                <section css={css`
                  max-width: 1120px;
                  margin: 0 64px;
                `}>
                  <Flex>
                    <article
                      css={css`
                        min-width: 872px;
                      `}>
                      {children}
                      <Flex alignItems="center" justifyContent="space-between" marginTop="size-800" marginBottom="size-400">
                        <View>
                          {
                            pageContext.frontmatter.contributors &&
                            <Contributors
                              href="#"
                              contributors={pageContext.frontmatter.contributors}
                              date={new Date().toLocaleDateString()}
                            />
                          }
                        </View>
                        <View>
                          <Feedback onYes={() => {alert('thanks')}} onNo={() => {alert('why not ?')}}/>
                        </View>
                      </Flex>
                    </article>
                    {pageContext.frontmatter.resources &&
                      <aside
                        css={css`
                          min-width: 280px;
                          margin-left: 32px;
                          margin-top: 32px;
                        `}>
                        <h4 className="spectrum-Heading--XS">Resources</h4>
                        <ul
                          className="spectrum-Body--M"
                          css={css`
                            list-style: none;
                            padding: 0;
                          `}>
                          {pageContext.frontmatter.resources.map(({link, text}, i) => (
                            <li
                              key={i}
                              css={css`
                                margin-top: 16px;
                              `}>
                              <Link href={link}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer">
                                <span css={css`margin-right: 8px`}>{text}</span>
                                <LinkOut size="XS"/>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </aside>
                    }
                  </Flex>
                </section>
                <Footer/>
              </main>
            </View>
          </Grid>
        </View>
      </MDXProvider>
    </Provider>
  </HelmetProvider>
);