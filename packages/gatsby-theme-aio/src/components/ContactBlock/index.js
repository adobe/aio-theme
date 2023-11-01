
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

import React from 'react';
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import { HeroButtons, HeroImage } from '@adobe/gatsby-theme-aio/src/components/Hero';
import { DESKTOP_SCREEN_WIDTH, MOBILE_SCREEN_WIDTH, TABLET_SCREEN_WIDTH } from '@adobe/gatsby-theme-aio/conf/globals';
import { layoutColumns } from '@adobe/gatsby-theme-aio/src/utils';

const ContactBlock = ({
  repeat = 1,
  textColor,
  ...props
}) => {

  const propKeys = Object.keys(props);
  let contactDetails;

  if (repeat === "1") {
    contactDetails = [props];
  }
  else {
    contactDetails = propKeys.filter((key) => key.startsWith("image")).map((data, index) => {
      return {
        image: props[data],
        heading: props[`heading${index}`],
        link: props[`link${index}`],
        text: props[`text${index}`],
        buttons: props[`buttons${index}`],
        subheading: props[`subheading${index}`]
      };
    });
  }

  return (
    <section
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding: var(--spectrum-global-dimension-size-1200); 

        @media screen and (min-width : 320px) and (max-width : 768px) {
          padding: var(--spectrum-global-dimension-size-200);
        }

      `}
    >
      <div
        css={css`
            display : flex;
            justify-content: center;

            @media screen and (min-width : 320px) and (max-width : 768px) {
              flex-direction : column;
            }

          `}
      >
        {contactDetails.map(({ image, heading, subheading, text, link, buttons }, index) => {
          return (
            <>
              <div
                css={css`
                    width : 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap:15px;

                    @media screen and (min-width : 320px) and (max-width : 768px) {
                      width : 100%;
                    }

                  `}
              >
                {image &&
                  <div
                    css={css`
                      width: 120px; 
                      height: 120px;
                      justify-content: center;
                      @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                      margin: auto;
                      }

                      @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      margin: 0;
                      max-width: calc(${layoutColumns(3.5)}) !important;
                      }

                      @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                      max-width: calc(${layoutColumns(6)}) !important;
                      margin: 0;
                      }`}
                  >
                    <h2
                      css={
                        css`
                          margin:0px !important;
                        `
                      }
                    >
                      <HeroImage image={image} />
                    </h2>
                  </div>
                }
                {heading && (
                  <h3
                    className="spectrum-Heading--sizeM"
                    css={css`
                        color:${textColor};

                        @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                        font-size: 18px !important;

                        }`
                    }>
                    {heading.props.children}
                  </h3>
                )}
                {subheading && (
                  <h6
                    className="spectrum-Heading--sizeM"
                    css={css`
                        color:${textColor};
                        font-size: 16px;`
                    }>
                    {subheading.props.children}
                  </h6>
                )}
                {text ?
                  <div
                    className="textWrapper"
                    css={css`
                          display: flex;
                          justify-content: center;
                          margin:0 !important;

                          &>p{
                              margin:0;
                              color:${textColor} !important;
                              width : 70%
                          }

                          @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {

                            &>h3{
                                font-size: var(--spectrum-alias-heading-xxs-text-size) !important;
                            }

                            @media screen and (min-width : 320px) and (max-width : 768px) {
                              &>p{
                                width : 100%
                              }
                            }

                          }`
                    }
                  >
                    {text}
                  </div>
                  : null}
                {link &&
                  <div
                    css={css`
                        &>p{
                          margin:0;
                        }
                      `}
                  >{link}</div>
                }
                {buttons &&
                  <HeroButtons
                    buttons={buttons}
                    variants={['accent', 'secondary']}
                    css={css`
                        justify-content:center;
                      `} />
                }
              </div>
              {index !== contactDetails.length - 1 &&
                <hr css={
                  css`
                    border-color: #f8f8f8;
                    border-width: thin;
                    `
                } />
              }
            </>
          )
        })}
      </div>
    </section>
  )
}

ContactBlock.propTypes = {
  repeat: PropTypes.string,
}

export { ContactBlock };
