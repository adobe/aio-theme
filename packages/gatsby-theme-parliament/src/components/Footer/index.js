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
import { css } from '@emotion/core';
import { Flex, Grid } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Divider } from '@react-spectrum/divider';
import { Link } from '../Link';
import '@spectrum-css/typography';
import { layoutColumns } from '../utils';

const Heading = ({ children }) => <h3 className="spectrum-Heading--S">{children}</h3>;

const List = ({ children }) => <ul className="spectrum-Body--S">{children}</ul>;

export const Footer = ({ hasSideNav }) => (
  <View
    elementType="footer"
    position="relative"
    paddingBottom="size-400"
    paddingTop="size-700"
    backgroundColor="gray-75"
    zIndex="1">
    <div
      css={css`
        box-sizing: border-box;
        max-width: ${layoutColumns(12, hasSideNav && ['256px'])};
        padding: ${hasSideNav ? '0' : '0 var(--spectrum-global-dimension-static-size-800)'};

        ul {
          list-style: none;
          padding: 0;
        }

        .spectrum-Heading--S {
          position: absolute;
          white-space: nowrap;
        }

        ul.spectrum-Body--S {
          padding-top: var(--spectrum-global-dimension-static-size-1000);

          & > li {
            margin-top: 16px;

            &:first-of-type {
              margin-top: 0;
            }
          }
        }
      `}>
      <Grid areas={['apis blogs support developer']} columns={['31%', '23%', '23%', '23%']} gap="size-400">
        <View gridArea="apis" position="relative">
          <Flex>
            <View>
              <Heading>APIs and Services</Heading>
              <List>
                <li>
                  <Link variant="secondary" href="#">
                    Adobe Creative Cloud
                  </Link>
                </li>
                <li>
                  <Link variant="secondary" href="#">
                    Adobe Experience Platform
                  </Link>
                </li>
                <li>
                  <Link variant="secondary" href="#">
                    Adobe Document Cloud
                  </Link>
                </li>
                <li>
                  <Link variant="secondary" href="#">
                    Adobe Experience Cloud
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <strong>View All</strong>
                  </Link>
                </li>
              </List>
            </View>
            <View marginStart="size-400">
              <ul className="spectrum-Body--S">
                <li>
                  <Link variant="secondary" href="#">
                    Adobe XD Platform
                  </Link>
                </li>
                <li>
                  <Link variant="secondary" href="#">
                    Adobe Target
                  </Link>
                </li>
                <li>
                  <Link variant="secondary" href="#">
                    Adobe Analytics
                  </Link>
                </li>
                <li>
                  <Link variant="secondary" href="#">
                    Project Firefly
                  </Link>
                </li>
              </ul>
            </View>
          </Flex>
          <View position="absolute" right={0} top={0} height="100%">
            <Divider height="100%" orientation="vertical" size="M" />
          </View>
        </View>
        <View gridArea="blogs" position="relative">
          <Heading>Blogs & Community</Heading>
          <List>
            <li>
              <Link variant="secondary" href="#">
                Adobe Tech Blog
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Adobe on Github
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Adobe Developer on Youtube
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Adobe Developer on Twitter
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Community Forums
              </Link>
            </li>
          </List>
          <View position="absolute" right={0} top={0} height="100%">
            <Divider height="100%" orientation="vertical" size="M" />
          </View>
        </View>
        <View gridArea="support" position="relative">
          <Heading>Support</Heading>
          <List>
            <li>
              <Link variant="secondary" href="#">
                Contact us
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Adobe Developer support
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Adobe Product support
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Release notes
              </Link>
            </li>
          </List>
          <View position="absolute" right={0} top={0} height="100%">
            <Divider height="100%" orientation="vertical" size="M" />
          </View>
        </View>
        <View gridArea="developer">
          <Heading>Adobe Developer</Heading>
          <List>
            <li>
              <Link variant="secondary" href="#">
                Adobe I/O Console
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Open source at Adobe
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Download SDKs
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="#">
                Careers
              </Link>
            </li>
          </List>
        </View>
      </Grid>
      <Divider size="M" marginTop="size-700" />
      <Flex justifyContent="space-between" alignItems="center" marginTop="size-100">
        <View>
          <ul
            className="spectrum-Body--XS"
            css={css`
              display: inline-flex;
              color: var(--spectrum-global-color-gray-700);

              & > li {
                margin-right: var(--spectrum-global-dimension-static-size-400);
              }
            `}>
            <li>
              <Link variant="secondary" href="https://www.adobe.com/legal/terms.html">
                Terms of use
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="https://www.adobe.com/privacy.html">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="https://www.adobe.com/privacy/cookies.html">
                Cookies
              </Link>
            </li>
            <li>
              <Link variant="secondary" href="https://www.adobe.com/privacy/cookies.html">
                AdChoices
              </Link>
            </li>
          </ul>
        </View>
        <View>
          <span
            className="spectrum-Body--XS"
            css={css`
              color: var(--spectrum-global-color-gray-700);
            `}>
            Copyright © {new Date().getFullYear()} Adobe. All rights reserved.
          </span>
        </View>
      </Flex>
    </div>
  </View>
);
