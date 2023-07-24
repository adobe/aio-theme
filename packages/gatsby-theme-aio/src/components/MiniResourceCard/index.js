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

import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import {
    getElementChild,
    TABLET_SCREEN_WIDTH,
    layoutColumns,
    MOBILE_SCREEN_WIDTH,
} from "../../utils";

import { DESKTOP_SCREEN_WIDTH } from "../../utils";
import { GatsbyLink } from '../GatsbyLink';
import { HeroImage } from "../Hero";
import classNames from "classnames";

const smallMobileView = "375px";
const MIN_MOBILE_SCREEN_WIDTH = "767px"
const href = (link) =>  link ? getElementChild(link).props.href : null;


const Minicard = ({
    text,
    heading,
    image,
    textColor,
    link
}) => {
    const Element = link ? GatsbyLink : 'div';
  
    return (
      <Element
        to={href(link)}
  
        css={css`
  
              text-decoration: none !important;
              display: flex;
              
              justify-content: ${!heading && !text && "center"}
  
              margin-bottom: var(--spectrum-global-dimension-size-500);
              flex-direction: row;
  
              @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              max-width: calc(${layoutColumns(6)}) !important;
              }
  
              @media screen and (max-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
              max-width: calc(${layoutColumns(3.5)}) !important;
              }
  
          `}
      >
        {image ? (
          <div
            css={css`
                  width: 100px;
                  height: 80px;
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
              css={css`margin:0px !important`}
            >
              <HeroImage image={image} />
            </h2>
          </div>
        ) : null}
  
        {text !== undefined || heading !== undefined ? (
          <div
            css={css`
                  border: 2px solid #f1f3f4;
                  border-radius: 4px;
                  padding: var(--spectrum-global-dimension-size-200); !important;
                  text-align: left;
                  height: 65px;
                  flex: 1;
                  text-decoration: none !important;
  
                  display : ${!heading && !text.length ? "none" : "flex"};
                  flex-direction: column;
                  justify-content: space-around;
  
                  @media only screen and (min-width: ${smallMobileView}) and(max-width:${MOBILE_SCREEN_WIDTH}) {
                  margin: 0;
                  background:red;
                  text-align: center !important;
                  max-width: calc(${layoutColumns(3.5)}) !important;
                  padding-left:  var(--spectrum-global-dimension-size-100) !important;
                  }
                  
                  `}
          >
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
            {text ?
              <div
                className="textWrapper"
                css={css`
                  margin:0 !important;
                  &>p{
                      color:${textColor} !important;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                  }
                  @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  &>h3{
                      font-size: var(--spectrum-alias-heading-xxs-text-size) !important;
                  }
                  }`
                }
              >
                {text}
              </div>
              : null}
  
          </div>
        ) : null}
      </Element>
    );
};

const MiniResourceCard = ({
    className,
    theme = "dark",
    inRow = 1,
    textColor = "black",
    ...props
  }) => {
    const propKeys = Object.keys(props);
    const miniCards = propKeys.filter((key) => key.startsWith("image")).map((data, index) => {
        return {
            image: props[data],
            heading: props[`heading${index}`],
            link: props[`link${index}`],
            text: props[`text${index}`]
        };
    });
  
    return (
      <section
        className={classNames(className, `spectrum--${theme}`)}
        css={css`
            background: var(--spectrum-global-color-gray-100);
            padding: var(--spectrum-global-dimension-size-600) 0
            var(--spectrum-global-dimension-size-200) 0;
          `}
  
      >
        <div
          css={css`
                  max-width: calc(${layoutColumns(12)});
                  margin: auto;
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      max-width: calc(${layoutColumns(3.75)}) !important;
                      grid-template-columns: repeat(1, 1fr);
                  }
                  @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
                      padding-bottom: 0;
                      margin-top: 0;
                      max-width: calc(${layoutColumns(6)}) !important;
                      grid-template-columns: repeat(1, 1fr);
                  }
  
                  display: grid;
                  grid-template-columns: repeat(${Number(inRow)}, 1fr);
                  grid-gap: 25px;
  
                  `}
        >
          {miniCards.map((data, index) => {
            return (
              <div>
                <Minicard
                  text={data.text}
                  link={data.link}
                  heading={data.heading}
                  image={data.image}
                  props={props}
                  index={index}
                  textColor={textColor}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  };
  
  MiniResourceCard.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
    inRow: PropTypes.string,
    textColor: PropTypes.string,
    link: PropTypes.element,
  };
  
  export { MiniResourceCard };