import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/typography";
import PropTypes from "prop-types";
import {
  TABLET_SCREEN_WIDTH,
  layoutColumns,
  MOBILE_SCREEN_WIDTH,
} from "@adobe/gatsby-theme-aio/src/utils";

import {  DESKTOP_SCREEN_WIDTH } from "../../../../utils";

import {
  HeroButtons,
  HeroImage,
} from "@adobe/gatsby-theme-aio/src/components/Hero";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const smallMobileView = "375px";
const MIN_MOBILE_SCREEN_WIDTH = "767px"

const Texts = ({ texts, index }) => {
  const definedTextKeys = texts.slots
    .split(',').map(key=>key.trim())
    .filter((key) => key.startsWith('text'));
  return definedTextKeys.map((data) => texts[`${data}${index}`]);
};

const SwiperContent = ({
  textKeys,
  heading,
  image,
  imageStyle,
  buttons,
  props,
  backgroundColor,
  index,
  slideTheme,
  theme,
  centerAlignament,
  isCenter
}) => {
  return (
    <div
      className={classNames(`spectrum--${slideTheme ? slideTheme : theme}`)}
      css={css`
        display: flex;
        ${backgroundColor}
        margin-bottom: var(--spectrum-global-dimension-size-500);
        flex-direction: row;

        @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
          flex-direction: column;
          max-width: calc(${layoutColumns(6)}) !important;
        }

        @media screen and (max-width: ${MIN_MOBILE_SCREEN_WIDTH}) {
          max-width: calc(${layoutColumns(3.5)}) !important;
          padding-left: var(--spectrum-global-dimension-size-200);
        }        

      `}
    >
      {image ? (
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
              // margin-bottom: var(--spectrum-global-dimension-size-200);  
            }

            @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
              max-width: calc(${layoutColumns(6)}) !important;
              margin: 0;
              // margin-bottom: var(--spectrum-global-dimension-size-200);
            }

          `}
        >
          <h2>
            <HeroImage image={image} styles={imageStyle} />
          </h2>
        </div>
      ) : null}

      {textKeys.length > 0 || heading || buttons ? (
        <div
          css={css`
            text-align: left;
            flex: 1;
            padding-bottom: var(--spectrum-global-dimension-size-200);
            // padding-right:45px;
            @media only screen and (min-width: ${smallMobileView}) and(max-width:${MOBILE_SCREEN_WIDTH}) {
              margin: 0;
              background:red;
              text-align: center !important;
              max-width: calc(${layoutColumns(3.5)}) !important;
              padding-left:  var(--spectrum-global-dimension-size-100) !important;
            }
            ${isCenter&&centerAlignament}
          `}
        >
          {heading && (
            <h3
              className="spectrum-Heading--sizeL"
              css={css`
                @media only screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                  font-size: 18px !important;
                }`
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
          ):null}
        </div>
      ) : null}
    </div>
  );
};

const Carousel = ({
  className,
  theme = "dark",
  imageStyle = "",
  swiperSpeed = 600,
  delay = 2500,
  enableNavigation = false,
  varient="default",
  slideTheme,
  bulletActiveClass = "swiper-pagination-bullet-active",
  bulletClass = "swiper-pagination-bullet",
  navigationPre= "swiper-button-prev",
  navigationNext = "swiper-button-next" ,
  isCenter=false,
  ...props
}) => {
  const propKeys = Object.keys(props);
  let carouselProps = propKeys.filter((key) => key.startsWith("image"));

  carouselProps = carouselProps.map((data, index) => {
    return {
      image: props[data],
      heading: props[`heading${index}`],
      buttons: props[`buttons${index}`],
      bgimage:props[`bgimage${index}`]
    };
  });

  const textKeys = props.slots.split(",").filter((key) => key.trim().startsWith("text"));

  const backgroundColor = `background-color: var(--spectrum-global-color-gray-${
    slideTheme === "light" ? "50" : ""
  });`;

 if (varient==="default"){
  return (
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding: var(--spectrum-global-dimension-size-600) 0
          var(--spectrum-global-dimension-size-200) 0;
      `}
      role="button" 
      tabindex={0}
      onKeyDown={(e)=>{
        if(e.key==="ArrowRight"){
          const swiperSlide = document.querySelector('.swiper').swiper;
          swiperSlide.slideNext();
        }
        if(e.key ==="ArrowLeft"){
          const swiper = document.querySelector('.swiper').swiper;
          swiper.slidePrev();
        }
      }}
    >
      <div
        css={css`
          max-width: calc(${layoutColumns(12)});
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
              <SwiperSlide key={index}>
                <SwiperContent
                  textKeys={textKeys}
                  heading={data.heading}
                  image={data.image}
                  imageStyle={imageStyle}
                  buttons={data.buttons}
                  props={props}
                  backgroundColor={backgroundColor}
                  index={index}
                  slideTheme={slideTheme}
                  theme={theme}
                />
                {enableNavigation ? (
                  <>
                    <div className={navigationPre}></div>
                    <div className={navigationNext} ></div>
                  </>
                ) : null}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}else if( varient==='fullWidth'){
  let centerAlignament= "margin:auto"
  return(
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-200) 0;
      `}
      role="button" 
      tabindex={0}
      onKeyDown={(e)=>{
        if(e.key==="ArrowRight"){
          const swiper = document.querySelector('.swiper').swiper;
          swiper.slideNext();
        }
        if(e.key ==="ArrowLeft"){
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
            <SwiperSlide key={index}  >
              <div   css={css`
                   width:100%;
                  @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                    width:100% !important;
                  }
                `} className={data.bgimage.props?.children}>
                <div
                  css={css`
                  max-width: calc(${layoutColumns(12)});
                  margin: auto;

                  // @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  //   max-width: calc(${layoutColumns(2.75)}) !important;
                  // }
                  
                  @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
                    max-width: calc(${layoutColumns(6)});
                  }
                `}>
                  <SwiperContent
                    textKeys={textKeys}
                    heading={data.heading}
                    image={data.image}
                    imageStyle={imageStyle}
                    buttons={data.buttons}
                    props={props}
                    backgroundColor={backgroundColor}
                    index={index}
                    slideTheme={slideTheme}
                    theme={theme}
                    isCenter={isCenter}
                    centerAlignament={centerAlignament}
                  />
                  {enableNavigation ? (
                    <div >
                      <div className={navigationPre}></div>
                      <div className={navigationNext} ></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  )}
};

Carousel.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(["light", "dark", "lightest"]),
  imageStyle: PropTypes.string,
  swiperSpeed: PropTypes.number,
  delay: PropTypes.number,
  enableNavigation: PropTypes.bool,
  slideTheme: PropTypes.oneOf(["light", "dark"]),
  bulletActiveClass: PropTypes.string,
  bulletClass: PropTypes.string,
  navigationNext:PropTypes.string,
  navigationPre:PropTypes.string,
  isCenter:PropTypes.bool,
  varient:PropTypes.string,
};

export { Carousel };