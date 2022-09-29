
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

import React, { cloneElement, Children, useContext,useEffect } from "react";
import { withPrefix } from "gatsby";
import { css } from "@emotion/react";
import { AnchorButton } from "../AnchorButton";
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import {
  getElementChild,
  cloneChildren,
  TABLET_SCREEN_WIDTH,
  DESKTOP_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
  DEFAULT_HOME,
  findSelectedTopPage,
  rootFixPages,
  rootFix,
  findSelectedTopPageMenu,
} from "../../utils";
import Context from "../Context";
import { Breadcrumbs } from "../Breadcrumbs";
import classNames from "classnames";

import lottie from 'lottie-web';

const setImageLoading = (child) => {
  if (child?.props?.mdxType === 'img') {
    return cloneElement(child, {
      loading: 'eager'
    });
  }

  return child;
};

const getAriaLabel = (label, heading='') => {
  const labelVal = label === 'Learn more' && heading !=='' ? `${label} about ${heading}` : `${label}`;
  return labelVal;
}

const HeroButtons = ({ buttons, styles = ['fill', 'outline'], variants = ['accent', 'secondary'], className }) =>
  buttons ? (
    <div>
      <div
        className={className}
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: var(--spectrum-global-dimension-size-200);
        `}>
        {Children.map(buttons.props.children, (item, i) => {
          let variant = variants[0];
          let quiet = quiets[0];

          if (i > 0) {
            variant = variants[1];
            quiet = quiets[1];
          }

          const link = getElementChild(item);

          return (
            <div key={i}>
              <AnchorButton aria-label={getAriaLabel(link.props.children, heading)} isQuiet={quiet} href={link.props.href} variant={variant}>
                {link.props.children}
              </AnchorButton>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

const HeroImage = ({ image, styles }) =>
  image
    ? cloneElement(image, {
      children: cloneChildren(image.props.children, setImageLoading),
      css: css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          margin-top: 0;
          ${styles}

          .gatsby-resp-image-wrapper {
            max-width: none !important;
            width: 100% !important;
            height: 100% !important;
          }

          .gatsby-resp-image-image {
            object-fit: cover;
          }
        `
    })
    : null;

const HeroTexts = ({ texts }) => {
  const textKeys = Object.keys(texts).filter((key) => key.startsWith('text'));
  return textKeys.map((textKey) =>
    cloneElement(texts[textKey], {
      className: 'spectrum-Body spectrum-Body--sizeL',
      css: css`
        &.spectrum-Body--sizeL {
          margin-top: 0 !important;
          color:#fff !important;

          &:last-of-type {
            margin-bottom: 0 !important;
          }
        }

        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
          padding: 0 var(--spectrum-global-dimension-size-115);
        }
      `
    })
  );
};

const HeroHeading = ({ heading, variant, customLayout }) =>
  heading
    ? cloneElement(heading, {
      // force h1 to support gdocs
      mdxType: 'h1',
      originalType: 'h1',
      className:
        (variant === 'default' || customLayout) ? customLayout ? 'spectrum-Heading--sizeXL spectrum-Heading--serif' : 'spectrum-Heading--sizeXL' : 'spectrum-Heading--sizeXXL spectrum-Heading--serif',
      css: css`
          margin-top: 0;
          margin-bottom: var(--spectrum-global-dimension-size-200);

          & + p {
            margin-bottom: var(--spectrum-global-dimension-size-200);
          }
        `
    })
    : null;

const Hero = ({
  className,
  background,
  theme = 'dark',
  heading,
  image,
  icon,
  buttons,
  assetsImg,
  variant = 'default',
  containerHeight = 1000,
  width = DESKTOP_SCREEN_WIDTH,
  customLayout = false,
  primaryOutline = false,
  isPrimaryBtn=false,
  variantsTypePrimary='cta',
  variantsTypeSecondary='overBackground',
  animationVideo="",
  ...props
}) => {
  const { siteMetadata, location } = useContext(Context);

  
  useEffect(()=>{
    if ( animationVideo ) {
      var anim = lottie.loadAnimation({
        container: document.querySelector("#svgContainer"), 
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animationVideo
      });
  
      anim.addEventListener("enterFrame", function (animation) {
            if (animation.currentTime > (anim.totalFrames - 25)) {
              anim.pause();
            }
      });
    }
  },[])


  if (!variant || variant === 'default') {
    const { home, pages } = siteMetadata;
    const pathWithRootFix = rootFix(location.pathname);
    const pagesWithRootFix = rootFixPages(pages);
    const selectedTopPage = findSelectedTopPage(pathWithRootFix, pagesWithRootFix);
    const selectedTopPageMenu = findSelectedTopPageMenu(pathWithRootFix, selectedTopPage);

    return (
      <section
        className={classNames(className, `spectrum--${theme}`)}
        css={css`
          position: relative;
          height: var(--spectrum-global-dimension-size-3400);
          margin-bottom: var(--spectrum-global-dimension-size-400);
          background-color: ${background ?? 'rgb( 29, 125, 238)'};
          width: 100%;
          display: flex;

          @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
            overflow: auto;
          }

          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
            height: calc(100vh - var(--spectrum-global-dimension-size-1200));
          }
        `}>
        <HeroImage image={image} styles={`position: absolute;`} />
        <div
          css={css`
            margin: auto;
            display: flex;
            position: relative;
            height: 100%;
            max-width: ${width};
            flex-direction: row;
            width: 100%;
            align-items: center;

            & > p {
              margin-top: 0 !important;
            }
          `}>
          <div
            css={css`
              width: calc(5 * 100% / 12);
              position: absolute;
              display: flex;
              flex-direction: column;

              & > p {
                margin-top: var(--spectrum-global-dimension-size-225) !important;
                margin-bottom: 0 !important;
              }

              @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
                width: auto;
                padding: 0 var(--spectrum-global-dimension-size-400);
              }
            `}>
            {home?.hidden !== true && home?.title && home?.href && selectedTopPage && (
              <Breadcrumbs
                pages={[
                  DEFAULT_HOME,
                  home,
                  { ...selectedTopPage, href: withPrefix(selectedTopPage.href) },
                  selectedTopPageMenu && { ...selectedTopPageMenu, href: withPrefix(selectedTopPageMenu.href) }
                ]}
              />
            )}

            <HeroHeading heading={heading} variant={variant} />

            <HeroTexts texts={props} />
          </div>
        </div>
      </section>
    );
  } else {
    const height = 'calc(var(--spectrum-global-dimension-size-6000) + var(--spectrum-global-dimension-size-1800))';
    if (variant === 'fullwidth' && customLayout) {
      return (
        <section
          className={classNames(className, `spectrum--${theme}`)}
          css={css`
            width: 100%;
            background: ${background ?? "var(--spectrum-global-color-gray-50)"};

            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              overflow: auto;
            }

            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              .spectrum-Heading--sizeXL {
                font-size: var(--spectrum-alias-heading-l-text-size);
              }
            }
          `}
        >
          <HeroImage image={image} />

          <div
            css={css`
              height: 100%;
              top: 0;
              bottom: 0;
              width: 100%;
              box-sizing: border-box;
              padding: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
              text-align: center;

              h1 {
                padding: var(--spectrum-global-dimension-size-500) var(--spectrum-global-dimension-size-300) var(--spectrum-global-dimension-size-0) !important;
              }

              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                padding: 0 !important;
              }

              @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                padding: 0 var(--spectrum-global-dimension-size-250);

                h1 {
                  padding: var(--spectrum-global-dimension-size-400) var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-0) !important;
                }
              }
            `}
          >
            {heading && (
              <HeroHeading
                heading={heading}
                variant={variant}
                customLayout={customLayout}
              />
            )}

            <HeroTexts texts={props} />

            {buttons ? (
              <HeroButtons
                buttons={buttons}
                quiets={[!isPrimaryBtn, !primaryOutline]}
                variants={[variantsTypePrimary,variantsTypeSecondary]}
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-200);
                  margin-bottom: var(--spectrum-global-dimension-size-200);
                `}
              />
            ) : (
              <div
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-200);
                `}
              />
            )}
            <div className={assetsImg?.props?.children}/>
          </div>
        </section>
      )
    } else if(variant === 'video' && animationVideo){
      return (
        <section
          className={classNames(className, `spectrum--${theme}`)}
          css={css`
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};
            width: 100%;
            overflow: hidden;
            height: auto;
            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              height: auto;
              padding: var(--spectrum-global-dimension-size-400);
              box-sizing: border-box;
            }
            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              height: auto;
              padding: var(--spectrum-global-dimension-size-400);
              box-sizing: border-box;
            }
          `}>
            <div css={css`
              @media screen and (min-width: ${DESKTOP_SCREEN_WIDTH}) {
                position: relative;
                max-width:${DESKTOP_SCREEN_WIDTH}
                margin:auto;
              }
            `}>
              <div css={css`
                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  display: none;
                }
              `}>
              <div id="svgContainer"></div>
              </div>

              <div
                css={css`
                  display: flex;
                  height: 100%;
                  max-width: ${width};
                  margin: auto;
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    display: inline;
                  }
              `}>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center !important;
                    position: absolute;
                    padding: 0;
                    top: 0;
                    text-align: left;
                    width: 30%;
                    align-item:center;
                    bottom: 0;
                    box-sizing: border-box;

                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      padding: 0 !important;
                      width: 100% !important;
                      position: initial !important;
                    }

                    @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                      padding: 0 var(--spectrum-global-dimension-size-100);
                      width:100% !important;
                      top: 20px !important;
                      position: initial !important;
                      h1 {
                        padding: 0 var(--spectrum-global-dimension-size-200) 0 var(--spectrum-global-dimension-size-0) !important;
                        font-size: var(--spectrum-heading-l-text-size, var(--spectrum-alias-heading-l-text-size))
                      }
                    }
                `}>

                  {heading && (
                    <HeroHeading
                      heading={heading}
                      variant={variant}
                      customLayout={customLayout}
                    />
                  )}

                  <HeroTexts texts={props} />

                  <HeroButtons
                    buttons={buttons}
                    quiets={[false]}
                    variants={["primary", "overBackground"]}
                    css={css`
                      margin-top: var(--spectrum-global-dimension-size-400);
                    `}
                  />
                </div>
                <div
                  css={css`
                    max-width: ${width};
                    margin: auto;
                    display: none;
                    @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                      display: block;
                    }
                    @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                      display: inline;
                    }
                `}>
                <div className={assetsImg?.props?.children}/>
              </div>
            </div>
          </div>
        </section>
      );
    } else if (variant === 'halfwidth' && customLayout ) {
      return (
        <section
          className={classNames(className, `spectrum--${theme}`)}
          css={css`
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};
            width: 100%;
            overflow: hidden;
            height: auto;
            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              height: auto;
              padding: var(--spectrum-global-dimension-size-400);
              box-sizing: border-box;
            }
            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              height: auto;
              padding: var(--spectrum-global-dimension-size-225);
              box-sizing: border-box;
            }
        `}>
          <div css={css`
            @media screen and (min-width: ${DESKTOP_SCREEN_WIDTH}) {
              display: flex;
              justify-content: space-between;
              position: relative;
              max-width:${DESKTOP_SCREEN_WIDTH};
              margin:auto;
            }
          `}>            
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center !important;
                // position: absolute;
                padding: 0;
                top: 0;
                text-align: left;
                width: 36%;
                align-item:center;
                bottom: 0;
                box-sizing: border-box;

                @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  padding: 0 !important;
                  width: 100% !important;
                  position: initial !important;
                }

                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  padding: 0 var(--spectrum-global-dimension-size-100);
                  width:100% !important;
                  top: 20px !important;
                  position: initial !important;
                  h1 {
                    padding: 0 var(--spectrum-global-dimension-size-200) 0 var(--spectrum-global-dimension-size-0) !important;
                    font-size: var(--spectrum-heading-l-text-size, var(--spectrum-alias-heading-l-text-size))
                  }
                }
            `}>                    
            {icon &&
              cloneElement(icon, {
                children: cloneChildren(icon.props.children, setImageLoading),
                css: css`
                  height: var(--spectrum-global-dimension-size-400);
                  width: var(--spectrum-global-dimension-size-3600);
                  margin-top: 0 !important;
                  margin-bottom: var(--spectrum-global-dimension-size-300) !important;
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    width: var(--spectrum-global-dimension-size-3000) !important;
                  }
                  .gatsby-resp-image-wrapper {
                    max-width: none !important;
                    width: 100% !important;
                    height: 100% !important;
                  }

                  .gatsby-resp-image-image {
                    height: 100%;
                    object-fit: contain;
                  }
                `
              })}

                {heading && (
                  <HeroHeading
                    heading={heading}
                    variant={variant}
                    customLayout={customLayout}
                  />
                )}

              <HeroTexts texts={props} />

              <HeroButtons
                buttons={buttons}
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-400);
                `}
                variants={[variantsTypePrimary, variantsTypeSecondary]}
                quiets={[primaryOutline]}
              />
            </div>
            <div>
              <div className={assetsImg?.props?.children}/>
            </div>
          </div>
        </section>
      );
    } else if (variant === 'fullwidth') {
      return (
        <section
          className={classNames(className, `spectrum--${theme}`)}
          css={css`
            position: relative;
            width: 100%;
            height: ${height};
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};

            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              overflow: auto;
            }

            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              height: 100vh;

              .spectrum-Heading--sizeXXL {
                font-size: var(--spectrum-alias-heading-xl-text-size);
              }
            }
          `}>
          <HeroImage image={image} />

          <div
            css={css`
              height: 100%;
              position: absolute;
              top: 0;
              width: 100%;
              box-sizing: border-box;
              padding: 0 calc(var(--spectrum-global-dimension-size-3600) + var(--spectrum-global-dimension-size-125));
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;

              @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                padding: 0 var(--spectrum-global-dimension-size-400);
              }
            `}>
            <HeroHeading heading={heading} variant={variant} />

            <HeroTexts texts={props} />

            <HeroButtons
              buttons={buttons}
              variants={['cta', 'overBackground']}
              css={css`
                margin-top: var(--spectrum-global-dimension-size-400);
              `}
            />
            <div className={assetsImg?.props?.children}/>
          </div>
        </section>
      );    
    } else if (variant === 'halfwidth') {
      return (
        <section
          className={classNames(className, `spectrum--lightest`)}
          css={css`
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};
            width: 100%;
            height: ${height};
            overflow: hidden;

            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              height: auto;
              padding: var(--spectrum-global-dimension-size-400);
              box-sizing: border-box;
            }
          `}>
          <div
            css={css`
              display: flex;
              height: 100%;
              justify-content: center;
            `}>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: calc(5 * 100% / 12);
                margin-left: var(--spectrum-global-dimension-size-800);
                margin-right: var(--spectrum-global-dimension-size-400);

                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  width: 100%;
                  margin: 0;
                }
              `}>
              {icon &&
                cloneElement(icon, {
                  children: cloneChildren(icon.props.children, setImageLoading),
                  css: css`
                    height: var(--spectrum-global-dimension-size-600);
                    width: var(--spectrum-global-dimension-size-600);
                    margin-top: 0 !important;
                    margin-bottom: var(--spectrum-global-dimension-size-300) !important;

                    .gatsby-resp-image-wrapper {
                      max-width: none !important;
                      width: 100% !important;
                      height: 100% !important;
                    }

                    .gatsby-resp-image-image {
                      height: 100%;
                      object-fit: contain;
                    }
                  `
                })}

              <HeroHeading heading={heading} isVariant />

              <HeroTexts texts={props} />

              <HeroButtons
                buttons={buttons}
                css={css`
                  margin-top: var(--spectrum-global-dimension-size-400);
                `}
              />
            </div>
            <div
              css={css`
                flex: 1;

                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  display: none;
                }
              `}>
              <HeroImage image={image} />
            </div>
          </div>
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
  width: PropTypes.string,
  theme: PropTypes.string,
  customLayout: PropTypes.bool,
  assetsImg:PropTypes.element,
  animationVideo: PropTypes.element
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
