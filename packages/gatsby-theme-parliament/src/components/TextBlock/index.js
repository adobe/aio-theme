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

import React, { useEffect } from 'react';
import { css } from '@emotion/core';
import { HeroButtons } from '../Hero';
import { Flex, View } from '@adobe/react-spectrum';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';
import { YouTube } from '@pauliescanlon/gatsby-mdx-embed';
import { getElementChild, layoutColumns } from '../utils';

let counter = 0;
const alignMapping = ['margin-left: 0;', 'margin-right: 0;'];

const Icons = ({ icons, isCentered }) =>
  icons
    ? React.cloneElement(icons, {
        css: css`
          list-style: none;
          padding: 0;
          margin-bottom: var(--spectrum-global-dimension-size-400) !important;
          display: flex;
          justify-content: ${isCentered ? 'center' : 'left'};

          & li {
            display: flex;
            border-right: 1px solid var(--spectrum-global-color-gray-300);
          }

          & img {
            height: var(--spectrum-global-dimension-size-600);
          }

          & li:last-of-type {
            padding-right: 0;
            border-right: none;
          }
        `
      })
    : null;

const Texts = ({ texts }) => {
  const textKeys = Object.keys(texts).filter((key) => key.startsWith('text'));
  return textKeys.map((textKey) => texts[textKey]);
};

const Links = ({ links, isCentered }) =>
  links
    ? React.cloneElement(links, {
        css: css`
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: ${isCentered ? 'center' : 'left'};
          margin-top: var(--spectrum-global-dimension-size-150) !important;

          & li {
            display: flex;
            align-items: center;
          }

          & li a {
            white-space: nowrap;
            margin-right: var(--spectrum-global-dimension-size-600);
          }

          & li:last-of-type a {
            margin-right: 0;
          }

          & img {
            max-height: var(--spectrum-global-dimension-size-400);
            margin-right: var(--spectrum-global-dimension-size-150);
            border-radius: 0;
          }
        `
      })
    : null;

const YouTubeVideo = ({ video }) => {
  let youTubeId = null;
  if (video) {
    const link = getElementChild(video);
    const url = new URL(link.props.href);
    if (url.hostname.startsWith('youtube.com') || url.hostname.startsWith('www.youtube.com')) {
      const queryParams = new URLSearchParams(url.search);
      youTubeId = queryParams.get('v');
    }
  }

  return youTubeId ? (
    <div
      css={css`
        & {
          display: inline;
          width: ${layoutColumns(6)};
          box-sizing: border-box;
          padding: 0 var(--spectrum-global-dimension-size-400);
          margin: auto;
        }
      `}>
      <YouTube youTubeId={youTubeId} />
    </div>
  ) : null;
};

const TextBlock = ({
  heading,
  links,
  buttons,
  icons,
  image,
  video,
  theme = 'lightest',
  width = '100%',
  isCentered = false,
  ...props
}) => {
  let columns = 100 / parseFloat(width);

  if (width === '33%') {
    width = `${(100 / 3).toFixed(2)}%`;
    columns = 3;
  }

  useEffect(() => {
    return () => {
      if (isCentered && columns > 1) {
        counter--;
      }
    };
  });

  if (isCentered) {
    let blockWidth = '';
    let extraMargin = '';

    if (columns === 1) {
      blockWidth = `max-width: ${layoutColumns(6)};`;
    } else if (columns > 3) {
      counter++;
      blockWidth = 'max-width: var(--spectrum-global-dimension-size-3600);';
    } else {
      counter++;
      blockWidth = 'max-width: var(--spectrum-global-dimension-size-4600);';
      extraMargin = alignMapping[counter % columns];
    }

    return (
      <>
        <section
          className={`spectrum--${theme}`}
          css={css`
            display: table-cell;
            width: ${width.replace('%', 'vw')};
            background: var(--spectrum-global-color-gray-100);
            padding: var(--spectrum-global-dimension-size-400) 0;
          `}>
          <div
            css={css`
              ${blockWidth}
              padding: 0 var(--spectrum-global-dimension-size-400);
              margin: auto;
              ${extraMargin}
            `}>
            <Icons icons={icons} isCentered={isCentered} />

            {image &&
              React.cloneElement(image, {
                css: css`
                  height: var(--spectrum-global-dimension-size-1600);

                  & img {
                    height: 100%;
                    border-radius: 0;
                    object-fit: contain;
                  }
                `
              })}

            {heading && (
              <h3
                className="spectrum-Heading--M"
                css={css`
                  margin-bottom: var(--spectrum-global-dimension-size-200) !important;

                  & ~ p {
                    margin-bottom: 0 !important;
                  }
                `}>
                {heading.props.children}
              </h3>
            )}

            <Texts texts={props} />

            <HeroButtons buttons={buttons} marginTop="size-150" marginBottom="size-150" />

            <Links links={links} isCentered={isCentered} />

            {video && (
              <View marginTop="size-400">
                <YouTubeVideo video={video} />
              </View>
            )}
          </div>
        </section>
        {counter % columns === 0 ? <div aria-hidden="true" /> : null}
      </>
    );
  } else {
    const isReversed = props.slots.endsWith('image') || props.slots.endsWith('video');

    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          width: 100%;
          background: var(--spectrum-global-color-gray-100);
          box-sizing: border-box;
          padding: var(--spectrum-global-dimension-size-400);
        `}>
        <div
          css={css`
            width: var(--spectrum-global-dimension-static-grid-fixed-max-width);
            margin: auto;
          `}>
          <Flex alignItems="center" direction={isReversed ? 'row-reverse' : 'row'}>
            {image &&
              React.cloneElement(image, {
                css: css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 50%;
                  height: calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-225));
                  box-sizing: border-box;
                  padding: 0 var(--spectrum-global-dimension-size-400);

                  & img {
                    height: 100%;
                    border-radius: 0;
                    object-fit: contain;
                  }
                `
              })}

            <YouTubeVideo video={video} />

            <div
              css={css`
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                box-sizing: border-box;
                padding: 0 var(--spectrum-global-dimension-size-400);
              `}>
              <Icons icons={icons} isCentered={isCentered} />

              {heading && (
                <h3
                  className="spectrum-Heading--M"
                  css={css`
                    margin-top: 0 !important;
                    margin-bottom: var(--spectrum-global-dimension-size-200) !important;
                  `}>
                  {heading.props.children}
                </h3>
              )}

              <Texts texts={props} />

              <HeroButtons buttons={buttons} marginTop="size-150" marginBottom="size-150" />

              <Links links={links} isCentered={isCentered} />
            </div>
          </Flex>
        </div>
      </section>
    );
  }
};

TextBlock.propTypes = {
  heading: PropTypes.element,
  links: PropTypes.element,
  icons: PropTypes.element,
  buttons: PropTypes.element,
  image: PropTypes.element,
  video: PropTypes.element,
  theme: PropTypes.string,
  width: PropTypes.string,
  isCentered: PropTypes.bool
};

export { TextBlock };
