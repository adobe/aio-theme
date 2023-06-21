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

import React, { cloneElement } from "react";
import { css } from '@emotion/react';
import classNames from "classnames";
import { cloneChildren } from "../../utils";
import { HeroButtons } from "../Hero";
import PropTypes from "prop-types";

const setImageLoading = (child) => {
    if (child?.props?.mdxType === 'img') {
        return cloneElement(child, {
            loading: 'eager'
        });
    }

    return child;
};

const ModalImage = ({ image, styles }) =>
    image
        ? cloneElement(image, {
            children: cloneChildren(image.props.children, setImageLoading),
            css: css`
            display: flex;
            align-items: center;
            justify-content: center;
            align-self:center;
            height: 100%;
            width: 500px;
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

            @media screen and (min-width:320px) and (max-width:1024px) {
                width: 290px !important;
            }
            `
        })
        : null;

const Modal = ({
    image,
    heading,
    text,
    buttons,
    isCenter,
    variantsTypePrimary,
    variantsTypeSecondary,
}) => {

    return (
        <div
            css={css`
                display : flex;
                justify-content: center;
                flex-direction:column;
                `}
        >
            <ModalImage image={image} />
            <div
                css={css`
                    width: 95%;
                    margin: 4% auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                `}
            >
                <div
                    css={css`
                        &gt;span {
                            display: none !important;
                        }

                        &gt;hr {
                            display: none !important;
                        }

                        text-align:${isCenter ? "center" : "initial"} !important;
                    `}
                >
                    {heading}
                </div>
                <div
                    css={css`
                        text-align:${isCenter ? "center" : "initial"}
                    `}
                >
                    {text}
                </div>
                <div
                    css={css`
                    display : flex;
                    justify-content: ${isCenter ? "center" : "start"};
                    `}
                >
                    {buttons &&
                        <HeroButtons
                            buttons={buttons}
                            variants={[variantsTypePrimary, variantsTypeSecondary]}
                            css={css`
                            margin-top: var(--spectrum-global-dimension-size-250);
                            `} />
                    }
                </div>
            </div>
        </div>
    )
}

const ImageTextBlock = ({
    className,
    bgColor = "white",
    isCenter,
    variantsTypePrimary = "accent",
    variantsTypeSecondary = "secondary",
    ...props
}) => {
    const propKeys = Object?.keys(props);
    const blocks = propKeys.filter((key) => key.startsWith("image")).map((data, index) => {
        return {
            image: props[data],
            heading: props[`heading${index}`],
            text: props[`text${index}`],
            buttons: props[`buttons${index}`]
        };
    });

    return (
        <section
            css={css`
            margin:auto;
            padding : 4% 0;
            background-color:${bgColor}
            `}
            className={classNames(className)}
        >
            <div
                css={css`
            display : flex;
            justify-content:center;
            gap:10%;

            @media screen and (min-width:320px) and (max-width:767px) {
                flex-direction:column !important;
            }

            `
                }
            >
                {blocks.map((data, index) => {
                    return (
                        <div key={index} >
                            <Modal
                                image={data.image}
                                heading={data.heading}
                                text={data.text}
                                buttons={data.buttons}
                                isCenter={isCenter}
                                variantsTypePrimary={variantsTypePrimary}
                                variantsTypeSecondary={variantsTypeSecondary}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

ImageTextBlock.propTypes = {
    className: PropTypes.string,
    bgColor: PropTypes.string,
    isCenter: PropTypes.bool,
    variantsTypePrimary: PropTypes.string,
    variantsTypeSecondary: PropTypes.string,

};

export { ImageTextBlock }