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

// todo use wrapPageElement

import React, { useRef, useEffect, createRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { Grid, Flex } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Button } from './Button';
import '@spectrum-css/typography';
import '@spectrum-css/tabs';

const stretched = css`
  height: 100%;
`;

export const Header = ({ path }) => {
  const nav = useRef(null);
  const tabs = [];
  const selectedTabIndicator = useRef(null);

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            header {
              title
              url
            }
          }
        }
      }
    `
  );

  const positionSelectedTabIndicator = (ref) => {
    if (ref) {
      selectedTabIndicator.current.style.transform = `translate(${ref.current.offsetLeft}px, 0px)`;
      selectedTabIndicator.current.style.width = `${ref.current.offsetWidth}px`;
    }
  };

  useEffect(() => {
    positionSelectedTabIndicator(tabs.find((ref) => ref.current.getAttribute('href') === path));

    // Font load changes tab size
    const resizeObserver = new ResizeObserver(() => {
      positionSelectedTabIndicator(tabs.find((ref) => ref.current && ref.current.getAttribute('href') === path));
    });

    resizeObserver.observe(nav.current);
  }, [path]);

  return (
    <header
      css={css`
        ${stretched};
        border-bottom: var(--spectrum-global-dimension-static-size-10) solid var(--spectrum-global-color-gray-200);
        box-sizing: border-box;
      `}>
      <nav css={stretched}>
        <Grid
          areas={['title navigation console profile']}
          columns={['256px', 'auto', 'size-1200', 'size-1200']}
          alignItems="center"
          marginX="size-400"
          height="100%">
          <View gridArea="title" justifySelf="flex-start">
            <a
              href="https://adobe.io"
              css={css`
                text-decoration: none;
              `}>
              <Flex alignItems="center">
                <svg
                  css={css`
                    width: var(--spectrum-global-dimension-static-size-450);
                    height: var(--spectrum-global-dimension-static-size-400);
                    display: block;
                    margin-right: var(--spectrum-global-dimension-static-size-200);
                  `}
                  viewBox="0 0 30 26"
                  fill="#E1251B"
                  aria-label="Adobe">
                  <polygon points="19,0 30,0 30,26"></polygon>
                  <polygon points="11.1,0 0,0 0,26"></polygon>
                  <polygon points="15,9.6 22.1,26 17.5,26 15.4,20.8 10.2,20.8"></polygon>
                </svg>
                <strong className="spectrum-Heading--XXS">Developer</strong>
              </Flex>
            </a>
          </View>
          <View gridArea="navigation">
            <div ref={nav} className="spectrum-Tabs spectrum-Tabs--quiet spectrum-Tabs--horizontal">
              {data.site.siteMetadata.header.map(({ title, url }, index) => {
                const ref = createRef();
                tabs.push(ref);

                return (
                  <a key={index} ref={ref} href={url} className="spectrum-Tabs-item">
                    <span className="spectrum-Tabs-itemLabel">{title}</span>
                  </a>
                );
              })}
              <div
                ref={selectedTabIndicator}
                className="spectrum-Tabs-selectionIndicator"
                css={css`
                  bottom: -10px !important;
                  transition: none !important;
                `}></div>
            </div>
          </View>
          <View gridArea="console" justifySelf="center">
            <Button variant="primary">Console</Button>
          </View>
          <View gridArea="profile" justifySelf="center">
            <Button isQuiet variant="primary">
              Sign in
            </Button>
          </View>
        </Grid>
      </nav>
    </header>
  );
};
