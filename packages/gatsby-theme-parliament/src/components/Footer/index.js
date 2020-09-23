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
import { Flex, Grid } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';
import { Divider } from '@adobe/react-spectrum';
import { Link } from '@adobe/react-spectrum';
import '@spectrum-css/typography';
import { layoutColumns, getExternalLinkProps } from '../utils';
import PropTypes from 'prop-types';

const Heading = ({ children }) => <h3 className="spectrum-Heading--S">{children}</h3>;

const List = ({ children }) => <ul className="spectrum-Body--S">{children}</ul>;

const externalLinkProps = getExternalLinkProps();

const Footer = ({ hasSideNav = false, isCentered = false }) => (
  <footer
    css={css`
      position: relative;
      box-sizing: border-box;
      padding-bottom: var(--spectrum-global-dimension-size-400);
      padding-top: var(--spectrum-global-dimension-size-700);
      background-color: var(--spectrum-global-color-gray-75);
      ${hasSideNav && 'padding-left: var(--spectrum-global-dimension-size-800);'}
    `}>
    <div
      css={css`
        box-sizing: border-box;
        max-width: ${layoutColumns(12, hasSideNav && ['256px'])};
        ${isCentered && 'margin: auto;'}
        padding: ${hasSideNav ? '0' : '0 var(--spectrum-global-dimension-size-800)'};

        ul {
          list-style: none;
          padding: 0;
        }

        .spectrum-Heading--S {
          position: absolute;
          white-space: nowrap;
        }

        ul.spectrum-Body--S {
          padding-top: var(--spectrum-global-dimension-size-1000);

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
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://creativecloud.adobe.com/">
                      Adobe Creative Cloud
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://www.adobe.com/experience-platform.html">
                      Adobe Experience Platform
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://documentcloud.adobe.com/">
                      Adobe Document Cloud
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://experience.adobe.com/">
                      Adobe Experience Cloud
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true}>
                    <a {...externalLinkProps} href="http://adobe.com/">
                      <strong>View All</strong>
                    </a>
                  </Link>
                </li>
              </List>
            </View>
            <View marginStart="size-400">
              <ul className="spectrum-Body--S">
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://adobexdplatform.com/">
                      Adobe XD Platform
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://www.adobe.com/marketing/target.html">
                      Adobe Target
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://www.adobe.com/analytics/adobe-analytics.html">
                      Adobe Analytics
                    </a>
                  </Link>
                </li>
                <li>
                  <Link isQuiet={true} variant="secondary">
                    <a {...externalLinkProps} href="https://www.adobe.io/apis/experienceplatform/project-firefly.html">
                      Project Firefly
                    </a>
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
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://medium.com/adobetech">
                  Adobe Tech Blog
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://github.com/adobe">
                  Adobe on Github
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.youtube.com/channel/UCDtYqOjS9Eq9gacLcbMwhhQ">
                  Adobe Developer on Youtube
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://twitter.com/adobedevs">
                  Adobe Developer on Twitter
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/communities/index.html">
                  Community Forums
                </a>
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
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/about-adobe/contact.html">
                  Contact us
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.io/support">
                  Adobe Developer support
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://helpx.adobe.com/contact/enterprise-support.html">
                  Adobe Product support
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.io/releasenotes.html">
                  Release notes
                </a>
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
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://console.adobe.io/">
                  Adobe I/O Console
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.io/open.html">
                  Open source at Adobe
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://console.adobe.io/downloads">
                  Download SDKs
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/careers.html">
                  Careers
                </a>
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
                margin-right: var(--spectrum-global-dimension-size-400);
              }
            `}>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/legal/terms.html">
                  Terms of use
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/privacy.html">
                  Privacy policy
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/privacy/cookies.html">
                  Cookies
                </a>
              </Link>
            </li>
            <li>
              <Link isQuiet={true} variant="secondary">
                <a {...externalLinkProps} href="https://www.adobe.com/privacy/cookies.html">
                  AdChoices
                </a>
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
  </footer>
);

Footer.propTypes = {
  hasSideNav: PropTypes.bool,
  isCentered: PropTypes.bool
};

export { Footer };
