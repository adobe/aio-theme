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

const Footer = ({ hasSideNav = false, isCentered = false, links = {} }) => {
  const { APIs = [], services = [], community = [], support = [], developer = [], legal = [], allAPIs } = links;

  return (
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
                  {APIs.map(({ title, path }, i) => (
                    <li key={i}>
                      <Link isQuiet={true} variant="secondary">
                        <a {...getExternalLinkProps(path)} href={path}>
                          {title}
                        </a>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link isQuiet={true}>
                      <a {...getExternalLinkProps(allAPIs.path)} href={allAPIs.path}>
                        <strong>{allAPIs.title}</strong>
                      </a>
                    </Link>
                  </li>
                </List>
              </View>
              <View marginStart="size-400">
                <ul className="spectrum-Body--S">
                  {services.map(({ title, path }, i) => (
                    <li key={i}>
                      <Link isQuiet={true} variant="secondary">
                        <a {...getExternalLinkProps(path)} href={path}>
                          {title}
                        </a>
                      </Link>
                    </li>
                  ))}
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
              {community.map(({ title, path }, i) => (
                <li key={i}>
                  <Link isQuiet={true} variant="secondary">
                    <a {...getExternalLinkProps(path)} href={path}>
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </List>
            <View position="absolute" right={0} top={0} height="100%">
              <Divider height="100%" orientation="vertical" size="M" />
            </View>
          </View>
          <View gridArea="support" position="relative">
            <Heading>Support</Heading>
            <List>
              {support.map(({ title, path }, i) => (
                <li key={i}>
                  <Link isQuiet={true} variant="secondary">
                    <a {...getExternalLinkProps(path)} href={path}>
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </List>
            <View position="absolute" right={0} top={0} height="100%">
              <Divider height="100%" orientation="vertical" size="M" />
            </View>
          </View>
          <View gridArea="developer">
            <Heading>Adobe Developer</Heading>
            <List>
              {developer.map(({ title, path }, i) => (
                <li key={i}>
                  <Link isQuiet={true} variant="secondary">
                    <a {...getExternalLinkProps(path)} href={path}>
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
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
              {legal.map(({ title, path }, i) => (
                <li key={i}>
                  <Link isQuiet={true} variant="secondary">
                    <a {...getExternalLinkProps(path)} href={path}>
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
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
};

Footer.propTypes = {
  hasSideNav: PropTypes.bool,
  isCentered: PropTypes.bool
};

export { Footer };
