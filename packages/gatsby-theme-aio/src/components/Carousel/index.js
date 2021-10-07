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

import React,{cloneElement} from 'react';
import { css } from '@emotion/react';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';
import { TABLET_SCREEN_WIDTH, layoutColumns, MOBILE_SCREEN_WIDTH, DESKTOP_SCREEN_WIDTH,cloneChildren } from '../../utils';
import { HeroButtons,HeroImage } from '../Hero';
import classNames from 'classnames';

const Texts = ({ texts, index }) => {
  const definedTextKeys = texts.slots
    .split(',')
    .map((key) => key.trim())
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
  theme
}) => {
  return (
    <div
    className={classNames(`spectrum--${slideTheme ? slideTheme : theme}`)}
    css={css`
      display: flex;
      ${backgroundColor}
      flex-direction: row;
      @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
        flex-direction: column;
      }
      margin: var(--spectrum-global-dimension-size-500);
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
            max-width: calc(${layoutColumns(4)});
            margin-bottom: var(--spectrum-global-dimension-size-200);
          }
          @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
            max-width: calc(${layoutColumns(6)});
            margin: 0;
            margin-bottom: var(--spectrum-global-dimension-size-200);
          }
        `}
      >
        <HeroImage image={cloneElement(image, {children: cloneChildren(image.props.children, setImage)})} styles={imageStyle} />
      </div>
    ) : null}
    {textKeys.length > 0 || heading || buttons ? (
      <div
        css={css`
          text-align: left;
          flex: 1;
          padding: var(--spectrum-global-dimension-size-200);
        `}
      >
        {heading && (
          <h3
            className="spectrum-Heading spectrum-Heading--sizeL"
            css={css`
              max-width: calc(${layoutColumns(6)});
              margin-top: 0 !important;
              margin-bottom: var(
                --spectrum-global-dimension-size-200
              ) !important;
              overflow: hidden;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
                max-width: calc(${layoutColumns(2)});
                padding: var(--spectrum-global-dimension-size-200) !important;
              }
              @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
                padding: var(--spectrum-global-dimension-size-200) !important;
                max-width: calc(${layoutColumns(6)});
              }
            `}
          >
            {heading.props.children}
          </h3>
        )}
        {textKeys.length > 0 ? <Texts texts={props} index={index} /> : null}
        {buttons ? (
          <div
            css={css`
              margin-top: var(--spectrum-global-dimension-size-200);
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

const setImage = (child) => {
  if (child?.props?.mdxType === 'img') {
    return cloneElement(child, {
      loading:'lazy',
      style:{...child.props.style,opacity:1}
    });
  }
  return child;
};

  
const Carousel = ({
  className,
  theme = 'dark',
  imageStyle = {},
  swiperSpeed = 600,
  delay = 2500,
  enableNavigation = false,
  slideTheme,
  bulletActiveClass = 'swiper-pagination-bullet-active',
  bulletClass = 'swiper-pagination-bullet',
  ...props
}) => {
  const [Swiper,setSwiper] = React.useState(null);
  const [CarouselModule,setCarouselModule] = React.useState(null);

  React.useEffect(()=>{
    (async() => {
      const swiper =  await(  import('swiper/react'));
      const swiperModules = await(  import('swiper'));
      import('swiper/css/bundle')
      setSwiper(swiper);
      setCarouselModule(swiperModules);
    })();
  },[])

  const propKeys = Object.keys(props);
  let carouselProps = propKeys.filter((key) => key.startsWith('image'));

  carouselProps = carouselProps.map((data, index) => {
    return {
      image: props[data],
      heading: props[`heading${index}`],
      buttons: props[`buttons${index}`]
    };
  });

  const textKeys = props.slots.split(',').filter((key) => key.trim().startsWith('text'));

  const backgroundColor = `background-color: var(--spectrum-global-color-gray-${slideTheme === 'light' ? '50' : ''});`;
  return (
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        background: var(--spectrum-global-color-gray-100);
        padding: var(--spectrum-global-dimension-size-600) 0 var(--spectrum-global-dimension-size-200) 0;
      `}>
       <div
        css={css`
        max-width: calc(${layoutColumns(12)});
        margin: auto;
          @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
            max-width: calc(${layoutColumns(3)});
          }
          @media screen and (min-width: ${MOBILE_SCREEN_WIDTH})  and (max-width: ${TABLET_SCREEN_WIDTH})  {
            padding-bottom: 0;
            margin-top: 0;
            max-width: calc(${layoutColumns(6)});
          }
        `}>

        {Swiper&&<Swiper.Swiper
         modules={[CarouselModule.Pagination, CarouselModule.Autoplay, CarouselModule.Navigation]}
          speed={swiperSpeed}
          slidesPerView={'auto'}
          autoplay={{
            delay
          }}

          pagination={{
            bulletActiveClass,
            bulletClass,
            clickable: true
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          >
          {carouselProps.map((data, index) => {
            return (
              <Swiper.SwiperSlide key={index}>
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
                    <div className="swiper-button-prev" />
                    <div className="swiper-button-next" />
                  </>
                ) : null}
              </Swiper.SwiperSlide>
            );
          })}
        </Swiper.Swiper>}
      </div>
    </section>
  );
};

Carousel.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', 'lightest']),
  imageStyle: PropTypes.string,
  swiperSpeed: PropTypes.number,
  delay: PropTypes.number,
  enableNavigation: PropTypes.bool,
  slideTheme: PropTypes.oneOf(['light', 'dark']),
  bulletActiveClass: PropTypes.string,
  bulletClass: PropTypes.string
};

export { Carousel };
