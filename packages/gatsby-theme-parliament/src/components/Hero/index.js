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
import { Button } from '@adobe/react-spectrum';
import { ButtonGroup } from '@adobe/react-spectrum';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';

const HeroButtons = ({ buttons, variants = ['cta', 'primary'], quiets = [true, true], ...props }) =>
  buttons ? (
    <ButtonGroup {...props}>
      {React.Children.map(buttons.props.children, (item, i) => {
        let variant = variants[0];
        let quiet = quiets[0];

        if (i > 0) {
          variant = variants[1];
          quiet = quiets[1];
        }

        const link = React.Children.toArray(item.props.children)[0];

        return (
          <Button key={i} elementType="a" isQuiet={quiet} href={link.props.href} variant={variant}>
            {link.props.children}
          </Button>
        );
      })}
    </ButtonGroup>
  ) : null;

const HeroImage = ({ image }) =>
  image
    ? React.cloneElement(image, {
        css: css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0;
          }
        `
      })
    : null;

const Hero = ({ background, theme = 'dark', heading, text, image, icon, buttons, variant = 'default' }) => {
  if (!variant || variant === 'default') {
    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          height: var(--spectrum-global-dimension-size-3400);
          margin-bottom: var(--spectrum-global-dimension-size-400);
          background: ${background ?? 'rgb( 29, 125, 238)'};
          position: relative;
        `}>
        <HeroImage image={image} />

        <div
          css={css`
            margin-left: var(--spectrum-global-dimension-size-800);
            width: calc(5 * 100% / 12);
            height: 100%;
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: left;
            justify-content: center;
            text-align: left;
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
      </section>
    );
  } else {
    const height = 'calc(var(--spectrum-global-dimension-size-6000) + var(--spectrum-global-dimension-size-250))';

    if (variant === 'fullwidth') {
      return (
        <section
          className={`spectrum--${theme}`}
          css={css`
            position: relative;
            height: ${height};
            background: ${background ?? 'transparent'};
          `}>
          <HeroImage image={image} />

          <div
            css={css`
              height: 100%;
              position: absolute;
              top: 0;
              padding: 0 var(--spectrum-global-dimension-size-3600);
              margin: 0 var(--spectrum-global-dimension-size-125);
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
                    margin-top: var(--spectrum-global-dimension-size-200) !important;
                    margin-bottom: var(--spectrum-global-dimension-size-400) !important;
                  }
                `
              })}

            {text &&
              React.cloneElement(text, {
                className: 'spectrum-Body--L'
              })}

            <HeroButtons buttons={buttons} variants={['cta', 'overBackground']} />
          </div>
        </section>
      );
    } else if (variant === 'halfwidth') {
      return (
        <section
          className={`spectrum--lightest`}
          css={css`
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};
            height: ${height};
            overflow: hidden;
          `}>
          <Flex justifyContent="center" height="100%">
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: calc(5 * 100% / 12);
                margin-left: var(--spectrum-global-dimension-size-800);
                margin-right: var(--spectrum-global-dimension-size-400);
              `}>
              {icon &&
                React.cloneElement(icon, {
                  css: css`
                    height: var(--spectrum-global-dimension-size-600);
                    width: var(--spectrum-global-dimension-size-600);
                    margin-bottom: var(--spectrum-global-dimension-size-300) !important;

                    img {
                      height: 100%;
                      object-fit: contain;
                    }
                  `
                })}

              {heading &&
                React.cloneElement(heading, {
                  className: 'spectrum-Heading--XXL spectrum-Heading--serif',
                  css: css`
                    margin-top: 0 !important;
                    margin-bottom: 0 !important;

                    & + p {
                      margin-top: var(--spectrum-global-dimension-size-200) !important;
                      margin-bottom: var(--spectrum-global-dimension-size-300) !important;
                    }
                  `
                })}

              {text &&
                React.cloneElement(text, {
                  className: 'spectrum-Body--L'
                })}

              <HeroButtons buttons={buttons} />
            </div>
            <div
              css={css`
                flex: 1;
              `}>
              <HeroImage image={image} />
            </div>
          </Flex>
        </section>
      );
    }
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

HeroButtons.propTypes = {
  buttons: PropTypes.element,
  variants: PropTypes.array,
  quiets: PropTypes.array
};

HeroImage.propTypes = {
  image: PropTypes.element
};

export { Hero, HeroImage, HeroButtons };
