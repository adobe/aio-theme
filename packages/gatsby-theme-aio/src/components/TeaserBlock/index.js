/*
 * Copyright 2023 Adobe. All rights reserved.
 */

import React, { cloneElement } from "react"
import { HeroButtons } from "@adobe/gatsby-theme-aio/src/components/Hero"
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TeaserBlock = ({
    theme,
    bgURL,
    heading,
    textColor = "white",
    backgroundColor,
    text,
    buttons,
    position = "right",
    className,
    variant = "fullwidth",
}) => {

    console.log('heading', heading);
    return (
        <div>
            <section
                className={classNames(className, `spectrum--${theme}`)}
                style={{ width: variant === "fullwidth" ? "100%" : "80%", margin: variant === "fullwidth" ? "0" : "auto" }}
                css={css`
                background: url(${bgURL});
                background-repeat: no-repeat !important;
                background-position: 50% !important;
                background-size: cover !important;
                background-color: ${backgroundColor ?? `var(--spectrum-global-color-gray-700)`};
                color: #fff;
                `}
            >
                <div
                    css={css`
                    padding-top: 10px;
                    padding-bottom: 10px;`}
                >
                    <div
                        style={{ marginLeft: position === "right" ? "auto" : position === "center" ? "35%" : "5%" }}
                        css={css`
                        @media screen and (min-width: 320px) and (max-width : 767px ) {
                            display: flex;
                            justify-content: center;
                            width: 100%;
                            margin:0 !important;
                        }
                        @media screen and (min-width: 768px) and (max-width : 1024px ) {
                            width:95%;
                            margin-left:5% !important;    
                        }
                        text-align:left ;
                        width : 50%
                        `}
                    >
                        <div css={css`width: 80%`}>
                            {heading && cloneElement(heading, {
                                        style: { color: `${textColor}` }
                                    })}
                            <div>
                                {text &&
                                    cloneElement(text, {
                                        className: 'spectrum-Body spectrum-Body--sizeM ',
                                        style: { color: `${textColor}` }
                                    })}
                            </div>
                            {buttons &&
                                <HeroButtons
                                    buttons={buttons}
                                    variants={['accent', 'secondary']}
                                    css={css`
                                        margin-top: var(--spectrum-global-dimension-size-400);
                            `} />}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

TeaserBlock.propTypes = {
    theme: PropTypes.string,
    bgURL: PropTypes.element,
    heading: PropTypes.element,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    text: PropTypes.element,
    buttons: PropTypes.element,
    position: PropTypes.element,
    variant: PropTypes.element
};


export { TeaserBlock };
