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

import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import {
    TABLET_SCREEN_WIDTH,
    layoutColumns,
    MOBILE_SCREEN_WIDTH,
} from "@adobe/gatsby-theme-aio/src/utils";
import { DESKTOP_SCREEN_WIDTH } from "@adobe/gatsby-theme-aio/src/utils";

import {
    HeroButtons
} from "../Hero"
import classNames from "classnames";
import { Swiper, SwiperSlide, } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const smallMobileView = "375px";
const MIN_MOBILE_SCREEN_WIDTH = "767px"

const Texts = ({ texts, index }) => {
    const definedTextKeys = texts.slots
        .split(',').map(key => key.trim())
        .filter((key) => key.startsWith('text'));
    return definedTextKeys.map((data) => texts[`${data}${index}`]);
};

const SwiperContent = ({
    textKeys,
    heading,
    buttons,
    props,
    index,
    theme,
    isCenter,
    videos,
    position
}) => {

    return (
        <div
            className={classNames(`spectrum--${theme}`)}
            css={css`
                display: flex;
                margin-bottom: var(--spectrum-global-dimension-size-500);
                flex-direction: ${position === "left" ? "row" : "row-reverse"};
                
                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                flex-direction: column;
                max-width: calc(${layoutColumns(6)}) !important;
                gap:25px;
                }

                @media screen and (max-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
                max-width: calc(${layoutColumns(3.5)}) !important;
                gap:25px;
                }        
            `}
        >
            <div
                css={css`
                    flex: 1;
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
                    }
                    `}
            >
                {videos.length &&
                    <video name="media3" loop="true" muted="true" autoPlay preload="metadata" playsInline css={css`
                            height:auto;
                            width:470px;
                        `}>
                        <source src={videos[index]} />
                    </video>}
            </div>

            {textKeys.length > 0 || heading || buttons ? (
                <div
                    css={css`
                        text-align: left;
                        flex: 1;
                        display: ${isCenter ? "flex" : "block"};
                        flex-direction:  ${isCenter && "column "};
                        height:  ${isCenter && "auto"};
                        justify-content:  ${isCenter && "center"};
                        padding-bottom: var(--spectrum-global-dimension-size-200);
                        @media only screen and (min-width: ${smallMobileView}) and(max-width:${MOBILE_SCREEN_WIDTH}) {
                        margin: 0;
                        text-align: center !important;
                        max-width: calc(${layoutColumns(3.5)}) !important;
                        padding-left:  var(--spectrum-global-dimension-size-100) !important;
                        }
                `}
                >
                    {heading && (
                        <h3
                            className="spectrum-Heading--sizeL"
                            css={css`
                                @media only screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                                font-size: 27px !important;
                                }
                                @media only screen and (max-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
                                font-size: 22px !important;
                                }
                                `
                            }>
                            {heading.props.children}
                        </h3>
                    )}
                    {textKeys.length > 0 ?
                        <div
                            className="textWrapper"
                            css={css`
                                @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                                &>h3{
                                    font-size: var(--spectrum-alias-heading-xxs-text-size) !important;

                                }
                                }`
                            }
                        >
                            <Texts texts={props} index={index} />
                        </div>
                        : null}
                    {buttons ? (
                        <div
                            css={css`
                                margin-top: var(--spectrum-global-dimension-size-200);

                                @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                                    div:first-child{
                                    justify-content:center !important;
                                    }
                                }
                            `}
                        >
                            <HeroButtons buttons={buttons} />
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};

const VideoCarousel = ({
    className,
    theme = "dark",
    swiperSpeed = 600,
    delay = 2500,
    enableNavigation = false,
    variant = "fullWidth",
    bulletActiveClass = "swiper-pagination-bullet-active",
    bulletClass = "swiper-pagination-bullet",
    navigationPre = "swiper-button-prev",
    navigationNext = "swiper-button-next",
    isCenter = false,
    videos = [],
    position = "left",
    navigationIconColor = "black",
    ...props
}) => {
    const [duration, setDuration] = useState([]);

    const propKeys = Object.keys(props);
    let carouselProps = propKeys.filter((key) => key.startsWith("heading"));

    carouselProps = carouselProps.map((data, index) => {
        return {
            heading: props[data],
            buttons: props[`buttons${index}`],
        };
    });

    const getVideoDurations = async (videoUrl) => {
        const durations = [];
        for (let i = 0; i < videoUrl?.length; i++) {
            const url = videoUrl[i];
            const video = document.createElement('video');
            video.src = url;

            await new Promise(resolve => {
                video.onloadedmetadata = () => {
                    durations[i] = video.duration * 1000;
                    resolve();
                };
            });
        }
        return durations;
    };

    async function videoDurationArr() {
        let duration1 = await getVideoDurations(videos);
        setDuration(duration1)
    }

    useEffect(() => {
        videoDurationArr()
    }, [])

    const textKeys = props.slots.split(",").filter((key) => key.trim().startsWith("text"));

    if (videos?.length && !duration.length) return <></>
    if (variant === "halfWidth") {
        return (
            <section
                className={classNames(className, `spectrum--${theme}`)}
                css={css`
                    position: relative;
                    z-index: 0;
                    background: var(--spectrum-global-color-gray-100);
                    padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-200) 0;`}
                role="button"
                tabindex={0}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                        const swiperSlide = document.querySelector('.swiper').swiper;
                        swiperSlide.slideNext();
                    }
                    if (e.key === "ArrowLeft") {
                        const swiper = document.querySelector('.swiper').swiper;
                        swiper.slidePrev();
                    }
                }}
            >
                <div
                    css={css`
                            max-width: calc(${layoutColumns(10)});
                            margin: auto;
                            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                                max-width: calc(${layoutColumns(2.75)}) !important;
                            }
                            @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
                                padding-bottom: 0;
                                margin-top: 0;
                                max-width: calc(${layoutColumns(6)}) !important;
                            }
                            `}
                >
                    <Swiper
                        speed={swiperSpeed}
                        slidesPerView={"auto"}
                        autoplay={{
                            delay,
                        }}
                        pagination={{
                            bulletActiveClass,
                            bulletClass,
                            clickable: true,

                        }}
                        navigation={{
                            nextEl: `.${navigationNext}`,
                            prevEl: `.${navigationPre}`,
                        }}
                    >
                        {carouselProps.map((data, index) => {
                            return (
                                <SwiperSlide key={index} {...(videos?.length && duration[index] ? { "data-swiper-autoplay": `${duration[index]}` } : {})} >
                                    <SwiperContent
                                        textKeys={textKeys}
                                        heading={data.heading}
                                        buttons={data.buttons}
                                        props={props}
                                        index={index}
                                        theme={theme}
                                        videos={videos}
                                        isCenter={isCenter}
                                        position={position}
                                    />
                                    {enableNavigation ? (
                                        <>
                                            <div css={css`color:${navigationIconColor}`} className={navigationPre}></div>
                                            <div css={css`color:${navigationIconColor}`} className={navigationNext} ></div>
                                        </>
                                    ) : null}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </section>
        );
    }
    else if (variant === 'fullWidth') {
        return (
            <section
                className={classNames(className, `spectrum--${theme}`)}
                css={css`
                    position: relative;
                    z-index: 0;
                    background: var(--spectrum-global-color-gray-100);
                    padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-200) 0;
                `}
                role="button"
                tabindex={0}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                        const swiper = document.querySelector('.swiper').swiper;
                        swiper.slideNext();
                    }
                    if (e.key === "ArrowLeft") {
                        const swiper = document.querySelector('.swiper').swiper;
                        swiper.slidePrev();
                    }
                }}
            >
                <Swiper
                    speed={swiperSpeed}
                    slidesPerView={"auto"}
                    autoplay={{
                        delay,
                    }}
                    pagination={{
                        bulletActiveClass,
                        bulletClass,
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: `.${navigationNext}`,
                        prevEl: `.${navigationPre}`,
                    }}
                >
                    {carouselProps.map((data, index) => {
                        return (
                            <SwiperSlide key={index} {...(videos?.length && duration[index] ? { "data-swiper-autoplay": `${duration[index]}` } : {})}>
                                <div css={css`
                                        width:100%;
                                        @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                                            width:100% !important;
                                        }
                                `} >
                                    <div
                                        css={css`
                                            max-width: calc(${layoutColumns(12)});
                                            margin: auto;

                                            @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
                                                max-width: calc(${layoutColumns(6)});

                                            }
                                    `}>
                                        <SwiperContent
                                            textKeys={textKeys}
                                            heading={data.heading}
                                            buttons={data.buttons}
                                            props={props}
                                            videos={videos}
                                            index={index}
                                            theme={theme}
                                            isCenter={isCenter}
                                            position={position}
                                        />
                                        {enableNavigation ? (
                                            <div >
                                                <div css={css`color:${navigationIconColor}`} className={navigationPre}></div>
                                                <div css={css`color:${navigationIconColor}`} className={navigationNext} ></div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>
        )
    }
};

VideoCarousel.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(["light", "dark", "lightest"]),
    swiperSpeed: PropTypes.number,
    delay: PropTypes.number,
    enableNavigation: PropTypes.bool,
    slideTheme: PropTypes.oneOf(["light", "dark"]),
    bulletActiveClass: PropTypes.string,
    bulletClass: PropTypes.string,
    navigationNext: PropTypes.string,
    navigationPre: PropTypes.string,
    isCenter: PropTypes.bool,
    variant: PropTypes.string,
    videos: PropTypes.array,
    navigationIconColor: PropTypes.string
};

export { VideoCarousel };