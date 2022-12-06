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
import { Helmet } from 'react-helmet';
import LinkedInRetargeting from './linkedInRetargetting'

const DESKTOP_SCREEN_MAX_WIDTH = '1060px'; 
const { APIs, services, community, support, developer, legal, allAPIs } = {
  allAPIs: {
    title: 'View all',
    path: '/apis'
  },
  APIs: [
    {
      title: 'Adobe Creative Cloud',
      path: '/creative-cloud'
    },
    {
      title: 'Adobe Experience Platform',
      path: '/experience-platform-apis'
    },
    {
      title: 'Adobe Document Cloud',
      path: '/document-services/homepage'
    }
  ],
  services: [
    {
      title: 'Adobe Cloud Manager',
      path: '/experience-cloud/cloud-manager'
    },
    {
      title: 'Adobe Analytics',
      path: '/analytics-apis/docs/2.0'
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
      title: 'Adobe Developer support',
      path: '/developer-support'
    },
    {
      title: 'Adobe Product support',
      path: 'https://helpx.adobe.com/contact/enterprise-support.html'
    }
  ],
  developer: [
    {
      title: 'Adobe Developer Console',
      path: '/developer-console'
    },
    {
      title: 'Open source at Adobe',
      path: '/open'
    },
    {
      title: 'Download SDKs',
      path: '/console/downloads'
    },
    {
      title: 'Authentication',
      path: '/developer-console/docs/guides/authentication'
    },
    {
      title: 'Careers',
      path: 'https://adobe.com/careers.html'
    }
  ],
  legal: [
    {
      title: 'Privacy',
      path: 'https://adobe.com/privacy.html'
    },
    {
      title: 'Terms of Use',
      path: 'https://adobe.com/legal/terms.html'
    },
    {
      title: 'Cookie preferences',
      path: '#/'
    },
    {
      title: 'Do not sell or share my personal information',
      path: 'https://adobe.com/privacy/us-rights.html'
    },
    {
      title: 'AdChoices',
      path: 'https://adobe.com/privacy/opt-out.html#interest-based-ads'
    }
  ]
};

const OPEN_PRIVACY_ID = 'openPrivacy';

const VIEW_ALL_APIS_DESC = 'View all APIs and Services';

const Heading = ({ children }) => <h3 className="spectrum-Heading spectrum-Heading--sizeXS">{children}</h3>;

const List = ({ children }) => <ul className="spectrum-Body spectrum-Body--sizeS">{children}</ul>;

const Footer = ({ hasSideNav = false }) => (
  <>
    {process.env.GATSBY_FEDS_PRIVACY_ID && (
      <Helmet>
        <script>{`
        window.fedsConfig = {
          privacy: {
            // TODO config from adobe.com
            otDomainId: '${process.env.GATSBY_FEDS_PRIVACY_ID}',
            footerLinkSelector: '#${OPEN_PRIVACY_ID}'
          }
        };
      `}</script>
        <style>{`
        #onetrust-consent-sdk, #ot-cookie-settings {
          font-family: "adobe-clean",sans-serif;
        }
      `}</style>
        <script
          defer
          src="https://wwwimages2.adobe.com/etc/beagle/public/globalnav/adobe-privacy/latest/privacy.min.js"
        />
      </Helmet>
    )}

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
          max-width: ${DESKTOP_SCREEN_MAX_WIDTH};
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
            grid-template-columns: 25%;
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
                  {services.map(({ title, path }, i) => (
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
                      <a {...getExternalLinkProps(allAPIs.path)} href={allAPIs.path} aria-labelledby="allAPIsDesc">
                        <span id="allAPIsDesc" css={css`display: none;`}>{VIEW_ALL_APIS_DESC}</span>
                        <strong>{allAPIs.title}</strong>
                      </a>
                    </Link>
                  </li>
                </List>
              </div>
              {/* <div
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
              </div> */}
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
              {legal.map(({ title, path }, i) => {
                // AdChoices
                if (i === 4) {
                  return (
                    <li
                      key={i}
                      css={css`
                        display: inline-flex;
                        align-items: center;
                        gap: var(--spectrum-global-dimension-size-50);
                      `}>
                      <svg
                        viewBox="0 0 71.38 75.48"
                        css={css`
                          height: var(--spectrum-global-dimension-size-150);
                          fill: var(--spectrum-global-color-gray-900);
                        `}>
                        <path
                          d="M71.43,46.62c6.63-3.61,7.81-8.22.11-12.78L17.44,4.31c-6.57-3.71-12-.64-12,6.84V69.36c0,9.58,5,10.51,11.63,6.91l6.18-3.44c1-.67,3.38-2.69,2.72-5.42-.61-2.54-2.8-3.33-5.31-2.64-3.68,2-6,0-6-4.16V19.16c0-4.16,3-5.87,6.63-3.8L58.63,36.68c3.65,2.07,3.62,5.39-.06,7.39l-23.06,12V42a3.95,3.95,0,1,0-7.89,0V62c0,2.18,1.9,3.74,3.95,4.47a5.36,5.36,0,0,0,3.72-.23Z"
                          transform="translate(-5.49 -2.73)"
                        />
                        <path
                          d="M35.9,31.33a4.14,4.14,0,1,1-4.14-4.14,4.14,4.14,0,0,1,4.14,4.14"
                          transform="translate(-5.49 -2.73)"
                        />
                      </svg>
                      <Link isQuiet={true} variant="secondary">
                        <a {...getExternalLinkProps(path)} href={path} aria-label={title}>
                          {title}
                        </a>
                      </Link>
                    </li>
                  );
                }
                // Cookie preferences
                else if (i === 2) {
                  return (
                    <li key={i}>
                      <Link isQuiet={true} variant="secondary">
                        <a id={OPEN_PRIVACY_ID} href={path} aria-label="Cookie preferences" tabindex="0"></a>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={i}>
                    <Link isQuiet={true} variant="secondary">
                      <a {...getExternalLinkProps(path)} href={path} aria-label={title}>
                        {title}
                      </a>
                    </Link>
                  </li>
                );
              })}
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
      {process.env.GATSBY_DC_LINKED_IN && (
      <LinkedInRetargeting/>
      )}
    </footer>
  </>
);

Footer.propTypes = {
  hasSideNav: PropTypes.bool
};

export { Footer };
