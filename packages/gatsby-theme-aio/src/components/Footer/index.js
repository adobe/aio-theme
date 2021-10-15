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
import { css } from '@emotion/react';
import { Divider } from '../Divider';
import { Link } from '../Link';
import '@spectrum-css/typography';
import { layoutColumns, getExternalLinkProps, DESKTOP_SCREEN_WIDTH, MOBILE_SCREEN_WIDTH } from '../../utils';
import PropTypes from 'prop-types';

const { APIs, services, community, support, developer, legal, allAPIs } = {
  allAPIs: {
    title: 'View all',
    path: '/apis'
  },
  APIs: [
    {
      title: 'Adobe Creative Cloud',
      path: '/apis/creativecloud'
    },
    {
      title: 'Adobe Experience Platform',
      path: '/apis/experienceplatform/home'
    },
    {
      title: 'Adobe Document Cloud',
      path: '/apis/documentcloud'
    },
    {
      title: 'Adobe Experience Cloud',
      path: '/apis/experiencecloud'
    }
  ],
  services: [
    {
      title: 'Adobe XD',
      path: '/apis/creativecloud/xd'
    },
    {
      title: 'Adobe Target',
      path: '/apis/experiencecloud/target'
    },
    {
      title: 'Adobe Analytics',
      path: '/apis/experiencecloud/analytics'
    },
    {
      title: 'App Builder',
      path: '/app-builder'
    }
  ],
  community: [
    {
      title: 'Adobe Tech Blog',
      path: 'https://medium.com/adobetech'
    },
    {
      title: 'Adobe on GitHub',
      path: 'https://github.com/adobe'
    },
    {
      title: 'Adobe Developer on YouTube',
      path: 'https://youtube.com/channel/UCDtYqOjS9Eq9gacLcbMwhhQ'
    },
    {
      title: 'Adobe Developer on Twitter',
      path: 'https://twitter.com/adobedevs'
    },
    {
      title: 'Community Forums',
      path: 'https://adobe.com/communities/index.html'
    }
  ],
  support: [
    {
      title: 'Contact us',
      path: '/contactus'
    },
    {
      title: 'Adobe Developer support',
      path: '/support'
    },
    {
      title: 'Adobe Product support',
      path: 'https://helpx.adobe.com/contact/enterprise-support.html'
    }
  ],
  developer: [
    {
      title: 'Adobe Developer Console',
      path: '/console'
    },
    {
      title: 'Open source at Adobe',
      path: '/open'
    },
    {
      title: 'Download SDKs',
      path: '/console/servicesandapis'
    },
    {
      title: 'Authentication',
      path: '/authentication'
    },
    {
      title: 'Careers',
      path: 'https://adobe.com/careers.html'
    }
  ],
  legal: [
    {
      title: 'Terms of use',
      path: 'https://adobe.com/legal/terms.html'
    },
    {
      title: 'Privacy policy',
      path: 'https://adobe.com/privacy.html'
    },
    {
      title: 'Cookies',
      path: 'https://adobe.com/privacy/cookies.html'
    },
    {
      title: 'AdChoices',
      path: 'https://adobe.com/privacy/opt-out.html#interest-based-ads'
    }
  ]
};

const Heading = ({ children }) => <h3 className="spectrum-Heading spectrum-Heading--sizeXS">{children}</h3>;

const List = ({ children }) => <ul className="spectrum-Body spectrum-Body--sizeS">{children}</ul>;

const Footer = ({ hasSideNav = false }) => (
  <footer
    css={css`
      position: relative;
      padding-bottom: var(--spectrum-global-dimension-size-400);
      padding-top: var(--spectrum-global-dimension-size-600);
      padding-left: var(--spectrum-global-dimension-size-400);
      padding-right: var(--spectrum-global-dimension-size-400);
      box-sizing: border-box;
      background-color: var(--spectrum-global-color-gray-75);
      width: 100%;
      ${hasSideNav &&
      `
          max-width: ${DESKTOP_SCREEN_WIDTH};
          background-color: var(--spectrum-global-color-static-white);
        `}

      @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
        max-width: none;

        [role='separator'][aria-orientation='vertical'] {
          display: none;
        }
      }
    `}>
    <div
      css={css`
        box-sizing: border-box;
        max-width: ${layoutColumns(12)};
        margin: 0 auto;
        ${hasSideNav &&
        'margin: 0 var(--spectrum-global-dimension-size-800) 0 var(--spectrum-global-dimension-size-400)'};
        padding: 0;

        @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
          padding: var(--spectrum-global-dimension-size-200);
          margin: 0 auto;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        .spectrum-Heading--sizeXS {
          position: absolute;
          white-space: nowrap;
        }

        ul.spectrum-Body--sizeS {
          padding-top: var(--spectrum-global-dimension-size-500);

          & > li {
            margin-top: var(--spectrum-global-dimension-size-200);

            &:first-of-type {
              margin-top: 0;
            }
          }
        }
      `}>
      <div
        css={css`
          display: grid;
          grid-template-areas: 'apis blogs support developer';
          grid-template-columns: 30% 22% 19%;
          gap: var(--spectrum-global-dimension-size-400);

          @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
            display: flex;
            flex-wrap: wrap;
          }
        `}>
        <div
          css={css`
            position: relative;
            grid-area: apis;
          `}>
          <div
            css={css`
              display: flex;

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                flex-direction: column;

                & > div {
                  margin: 0;
                }
              }
            `}>
            <div>
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
            </div>
            <div
              css={css`
                margin-left: var(--spectrum-global-dimension-size-400);
              `}>
              <ul className="spectrum-Body spectrum-Body--sizeS">
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
            </div>
          </div>
          <div
            css={css`
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
            `}>
            <Divider height="100%" orientation="vertical" size="M" />
          </div>
        </div>
        <div
          css={css`
            position: relative;
            grid-area: blogs;
          `}>
          <Heading>Community</Heading>
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
          <div
            css={css`
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
            `}>
            <Divider height="100%" orientation="vertical" size="M" />
          </div>
        </div>
        <div
          css={css`
            position: relative;
            grid-area: support;
          `}>
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
          <div
            css={css`
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
            `}>
            <Divider height="100%" orientation="vertical" size="M" />
          </div>
        </div>
        <div
          css={css`
            position: relative;
            grid-area: developer;
          `}>
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
        </div>
      </div>
      <Divider
        size="M"
        css={css`
          margin-top: var(--spectrum-global-dimension-size-700);
        `}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: var(--spectrum-global-dimension-size-100);

          @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
            flex-direction: column;
            align-items: flex-start;
          }
        `}>
        <div>
          <ul
            className="spectrum-Body spectrum-Body--sizeXS"
            css={css`
              display: inline-flex;
              color: var(--spectrum-global-color-gray-700);

              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                flex-direction: column;
              }

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
        </div>
        <div>
          <span
            className="spectrum-Body spectrum-Body--sizeXS"
            css={css`
              color: var(--spectrum-global-color-gray-700);

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                display: block;
                margin-top: var(--spectrum-global-dimension-size-200);
              }
            `}>
            Copyright © {new Date().getFullYear()} Adobe. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  hasSideNav: PropTypes.bool
};

export { Footer };
