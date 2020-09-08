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
import { Flex } from '@adobe/react-spectrum';
import { View } from '@adobe/react-spectrum';
import { Button } from '@adobe/react-spectrum';
import { ButtonGroup } from '@adobe/react-spectrum';
import { layoutColumns } from '../utils';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';

const Buttons = ({ buttons }) =>
  buttons ? (
    <ButtonGroup>
      {React.Children.map(buttons.props.children, (item, i) => {
        const variant = i === 0 ? 'cta' : 'primary';
        const link = React.Children.toArray(item.props.children)[0];

        return (
          <Button key={i} elementType="a" isQuiet={true} href={link.props.href} variant={variant}>
            {link.props.children}
          </Button>
        );
      })}
    </ButtonGroup>
  ) : null;

const Hero = ({
  background = 'rgb( 29, 125, 238)',
  theme = 'dark',
  heading,
  text,
  image,
  icon,
  buttons,
  variant = 'default'
}) => {
  const height =
    'calc(var(--spectrum-global-dimension-static-size-6000) + var(--spectrum-global-dimension-static-size-250))';

  if (!variant || variant === 'default') {
    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          height: var(--spectrum-global-dimension-static-size-3400);
          margin-bottom: var(--spectrum-global-dimension-static-size-400);
          background: ${background};
        `}>
        <Flex height="100%" alignItems="center">
          <div
            css={css`
              margin-left: var(--spectrum-global-dimension-static-size-800);
              width: ${layoutColumns(5)};
            `}>
            {heading &&
              React.cloneElement(heading, {
                className: 'spectrum-Heading--XL'
              })}

            {text &&
              React.cloneElement(text, {
                className: 'spectrum-Body--L'
              })}
          </div>
          {image && (
            <View>
              {React.cloneElement(image, {
                className: '',
                css: css`
                  margin: 0;
                  & img {
                    min-width: ${layoutColumns(7)};
                    max-height: var(--spectrum-global-dimension-static-size-2600);
                    object-fit: contain;
                    border-radius: 0;
                  }
                `
              })}
            </View>
          )}
        </Flex>
      </section>
    );
  } else if (variant === 'fullwidth') {
    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          position: relative;
          height: ${height};
          background: ${background};
        `}>
        {image &&
          React.cloneElement(image, {
            css: css`
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;

              & > img {
                max-height: 100%;
                object-fit: contain;
                border-radius: 0;
              }
            `
          })}

        <div
          css={css`
            height: 100%;
            position: absolute;
            top: 0;
            padding: 0 var(--spectrum-global-dimension-static-size-3600);
            margin: 0 var(--spectrum-global-dimension-static-size-125);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          `}>
          {heading &&
            React.cloneElement(heading, {
              className: 'spectrum-Heading--XXL spectrum-Heading--serif',
              css: css`
                margin-bottom: 0 !important;

                & + p {
                  margin-top: var(--spectrum-global-dimension-static-size-200) !important;
                  margin-bottom: var(--spectrum-global-dimension-static-size-400) !important;
                }
              `
            })}

          {text &&
            React.cloneElement(text, {
              className: 'spectrum-Body--L'
            })}

          <Buttons buttons={buttons} />
        </div>
      </section>
    );
  } else if (variant === 'halfwidth') {
    return (
      <section
        className={`spectrum--lightest`}
        css={css`
          height: ${height};
          overflow: hidden;
        `}>
        <Flex justifyContent="center" height="100%">
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              width: ${layoutColumns(5)};
              margin-left: var(--spectrum-global-dimension-static-size-800);
              margin-right: var(--spectrum-global-dimension-static-size-400);
            `}>
            {icon &&
              React.cloneElement(icon, {
                css: css`
                  height: var(--spectrum-global-dimension-static-size-600);
                  width: var(--spectrum-global-dimension-static-size-600);
                  margin-bottom: var(--spectrum-global-dimension-static-size-300) !important;
                `
              })}

            {heading &&
              React.cloneElement(heading, {
                className: 'spectrum-Heading--XXL spectrum-Heading--serif',
                css: css`
                  margin-top: 0 !important;
                  margin-bottom: 0 !important;

                  & + p {
                    margin-top: var(--spectrum-global-dimension-static-size-200) !important;
                    margin-bottom: var(--spectrum-global-dimension-static-size-300) !important;
                  }
                `
              })}

            {text &&
              React.cloneElement(text, {
                className: 'spectrum-Body--L'
              })}

            <Buttons buttons={buttons} />
          </div>
          <div
            css={css`
              flex: 1;
            `}>
            {image &&
              React.cloneElement(image, {
                css: css`
                  & {
                    display: flex;
                    justify-content: center;
                    height: 100%;
                    width: 100%;
                  }

                  & > img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    border-radius: 0;
                  }
                `
              })}
          </div>
        </Flex>
      </section>
    );
  }
};

Hero.propTypes = {
  background: PropTypes.string,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element,
  icon: PropTypes.element,
  buttons: PropTypes.element,
  variant: PropTypes.string,
  theme: PropTypes.string
};

export { Hero };
