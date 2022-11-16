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

import React, { cloneElement, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { GatsbyLink } from '../GatsbyLink';
import { HeroButtons } from '../Hero';
import {
  getElementChild,
  layoutColumns,
  getExternalLinkProps,
  TABLET_SCREEN_WIDTH,
  DESKTOP_SCREEN_WIDTH
} from '../../utils';
import '@spectrum-css/typography';
import '@spectrum-css/card';
import PropTypes from 'prop-types';
import classNames from "classnames";

const counter = {
  2: 0,
  3: 0
};
const alignMapping = ['margin-left: 0;', 'margin-right: 0;'];

const ResourceCard = ({ theme = 'lightest', width = '100%', link, heading, text, text2=null, image, className, isCustomStories = false, buttons, isFooter = false,   variantsTypePrimary='accent',
variantsTypeSecondary='secondary',variantStyleFill = "fill",variantStyleOutline = "outline", contHeight}) => {
  let initColumns = 100 / parseFloat(width);

  if (width === '33%') {
    width = `${(100 / 3).toFixed(2)}%`;
    initColumns = 3;
  }

  const [columns] = useState(initColumns);

  useEffect(() => {
    return () => {
      if (typeof counter[columns] !== 'undefined') {
        counter[columns]--;
      }
    };
  }, [columns]);

  if (typeof counter[columns] !== 'undefined') {
    counter[columns]++;
  }

  const href = link ? getElementChild(link).props.href : null;
  let extraMargin = '';

  if (columns === 2) {
    extraMargin = alignMapping[counter[columns] % columns];
  } else if (columns === 3) {
    const align = counter[columns] % columns;
    if (align === 0 || align === 1) {
      extraMargin = alignMapping[align];
    }
  }

  const MIN_MOBILE_SCREEN_WIDTH = '1024px';

  const MAX_MOBILE_SCREEN_WIDTH = '1280px';

  const Element = isFooter ? 'div' : GatsbyLink;

  return (
    <>
      <section
        className={classNames(className, `spectrum--${theme}`)}
        css={css`
          display: ${width === '100%' ? 'block' : 'table-cell'};
          width: ${width.replace('%', 'vw')};
          background: var(--spectrum-global-color-gray-100);
          padding: var(--spectrum-global-dimension-size-300) var(--spectrum-global-dimension-size-175);
          box-sizing: border-box;

          @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
            display: block;
            width: 100%;
          }

          @media screen and (min-width: ${MIN_MOBILE_SCREEN_WIDTH}) and (max-width: ${MAX_MOBILE_SCREEN_WIDTH}) {
            display: inline-flex !important;
            width: 50%;
          }
        `}>
        <Element
          className={`spectrum-Card spectrum-Card--vertical spectrum-Card--sizeM`}
          to={href}
          {...getExternalLinkProps(href)}
          css={css`
            display: block;
            margin: auto;
            max-width: ${layoutColumns(4)};
            ${extraMargin}

            @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
              width: 100%;
              min-width: 0;
              margin: auto;
            }
          `}>
          <div
            className="spectrum-Card-preview"
            css={css`
              height: var(--spectrum-global-dimension-size-${text2 ? 2400 : 2000});
              width: 100%;
              padding: 0 !important;
            `}>
            {image &&
              cloneElement(image, {
                css: css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: ${isCustomStories ? '100%' : 'auto'};
                  width: 100%;
                  margin-bottom: 0 !important;
                  margin-top: 0;

                  .gatsby-resp-image-wrapper {
                    max-width: none !important;
                    width: 100% !important;
                    height: 100% !important;
                  }

                  .gatsby-resp-image-image {
                    object-fit: cover;
                  }
                `
              })}
          </div>
          <div
            className="spectrum-Card-body"
            css={css`
              flex: 1;
              padding: var(--spectrum-global-dimension-size-200) !important;
              justify-content: flex-start !important;
              overflow: hidden;
              height:${contHeight};
            `}>
            {text2 ? <div
              className=""
              css={css`
                height: auto;
              `}>
              <div className="spectrum-Card-subtitle">
                <p
                  className="spectrum-Body spectrum-Body-S"
                  css={css`
                    text-align: left;
                    color: var(--spectrum-global-color-gray-700);
                    margin-top: 0;
                    margin-bottom: 5px;
                  `}>
                  {text2 && text2.props.children}
                </p>
              </div>
            </div>:null}
            <div
              className="spectrum-Card-header"
              css={css`
                height: auto;
                width: 100%;
              `}>
              <div
                className="spectrum-Card-title"
                css={css`
                  white-space: normal;
                  text-align: left;
                `}>
                <h3
                  className="spectrum-Heading spectrum-Heading--sizeS"
                  css={css`
                    margin-top: 0 !important;
                    margin-bottom: 0 !important;
                  `}>
                  {heading && heading.props.children}
                </h3>
              </div>
            </div>
            <div
              className="spectrum-Card-content"
              css={css`
                height: auto;
              `}>
              <div className="spectrum-Card-subtitle">
                <p
                  className="spectrum-Body spectrum-Body-S"
                  css={css`
                    text-align: left;
                    color: var(--spectrum-global-color-gray-700);
                    margin-top: 0;
                  `}>
                  {text && text.props.children}
                </p>
              </div>
            </div>
          </div>
            {isFooter &&(
              <div className="spectrum-Card-footer">
                <HeroButtons
                  buttons={buttons}
                  styles={[variantStyleFill, variantStyleOutline]}
                  variants={[variantsTypePrimary,variantsTypeSecondary]}

                  css={css`

                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  justify-content: center;
                }
              `}
                />
              </div>
            )
            }
        </Element>
      </section>
      {typeof counter[columns] !== 'undefined' && counter[columns] % columns === 0 ? <div aria-hidden="true" /> : null}
    </>
  );
};

ResourceCard.propTypes = {
  theme: PropTypes.string,
  width: PropTypes.oneOf(['100%', '50%', '33%','25%']),
  link: PropTypes.element,
  heading: PropTypes.element,
  text: PropTypes.element,
  text2: PropTypes.element,
  buttons: PropTypes.element,
  image: PropTypes.element,
  isFooter: PropTypes.element
};

export { ResourceCard };
