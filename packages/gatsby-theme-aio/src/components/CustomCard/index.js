/*
 * Copyright 2022 Adobe. All rights reserved.
*/
import React, { useEffect, useState, cloneElement } from 'react';
import { css } from '@emotion/react';
import { HeroButtons } from '../Hero';
import '@spectrum-css/typography';
import '@spectrum-css/card';
import { TABLET_SCREEN_WIDTH, MOBILE_SCREEN_WIDTH, DESKTOP_SCREEN_WIDTH } from '../../utils';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import classNames from "classnames";


const counter = {
  2: 0,
  3: 0,
  4: 0
};
const alignMapping = ['flex-start', 'flex-end'];

const CustomCard = ({ 
  theme = 'lightest',
  width = '100%',
  icon,
  heading,
  text,
  links ,
  borderRadious,
  gradients=false,
  gradientsType,
  buttons,
  footer =false,
  buttonDisplay=false,
  height=500,
  cursorDisable=false,
  headerSize='225',
  contentSize='230',
  className
  }) => {

  let initColumns = 100 / parseFloat(width);

  //Set the card width and no of columns.
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

  // Set the card alignment.
  let alignment = 'center';
  if (columns === 2 || columns === 3) {
    alignment = alignMapping[counter[columns] % columns] || 'center';
  }

  // Set the card background linear-gradient color.
  const linearGradients=(type)=>{
    if(type === 'redORange'){
      return {background: "linear-gradient(to bottom, #f19861, #cc3232)"}
    }else if(type === 'lightBlue'){
      return {background: "linear-gradient(to bottom, #50b7d6, #3a5cad)"}
    }else if(type === 'lightGreen'){
      return {background: "linear-gradient(to bottom, #6cb966, #266d71)"}
    }else if(type === 'darkBlue') {
      return {background: "linear-gradient(to bottom, #2260b5, #298b78)"}
    }else if(type === 'orangeRed'){
      return {background: "linear-gradient(to bottom, #eb5174, #f06a52)"}
    }else if(type === 'violetBlue'){
      return {background: "linear-gradient(to bottom, #4e43c5, #ce6fc3)"}
    }else if(type === 'pinkRed'){
      return {background: "linear-gradient(to bottom, #e87c76, #ed4368)"}
    }
  }

  return (
    <section
      className={classNames(className, `spectrum--${theme}`)}
      css={css`
        display: inline-flex;
        flex-direction: column;
        align-items: ${alignment};
        width: ${width};
        padding: var(--spectrum-global-dimension-size-400) 0;
        background: var(--spectrum-global-color-gray-100);

        @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
          display: flex;
          width: 100%;
          align-items: center;
        }
      `}
      >
      <div
        onClick={links ?
          () => navigate(links.props.children) :()=>('javascript')}
        onKeyPress={links ?
          () => navigate(links.props.children) :()=>('javascript')}
        role="button"
        tabIndex={0} 
        className="spectrum-Card"
        style={gradients && linearGradients(gradientsType)}
        css={css`
          margin: 0 var(--spectrum-global-dimension-size-300);
          width: calc(var(--spectrum-global-dimension-size-3000) - var(--spectrum-global-dimension-size-500));
          // width: calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-800));
          // height: calc(var(--spectrum-global-dimension-size-4600) - var(--spectrum-global-dimension-size-${height}));
          ${ !cursorDisable && `cursor:pointer;`}
          ${borderRadious && `border-radius: 10px;`}
          &:hover {
            border-color: var(--spectrum-card-border-color, var(--spectrum-global-color-gray-200));
          }

          @media screen and (max-width: ${DESKTOP_SCREEN_WIDTH}) {
            width: var(--spectrum-global-dimension-size-3000);
          }

          @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
            width: 0;
            margin: 0;
          }
        `}>
        <div
          className="spectrum-Card-body"
          css={css`
            height: calc(var(--spectrum-global-dimension-size-3600) + var(--spectrum-global-dimension-size-900));
            overflow: auto;
            text-align: left;
            @media screen and (max-width: ${MOBILE_SCREEN_WIDTH}) {
              height: calc(var(--spectrum-global-dimension-size-3600) + var(--spectrum-global-dimension-size-150)) !important;
            }
            @media screen and (device-width: ${TABLET_SCREEN_WIDTH}) {
              height: calc(var(--spectrum-global-dimension-size-3400) + var(--spectrum-global-dimension-size-900)) !important;
            }
          `}>
          <div
            css={css`
              position: absolute;
              height: var(--spectrum-global-dimension-size-800);
              z-index: 1;

            `}>
            {icon &&
              cloneElement(icon, {
                css: css`
                  height: var(--spectrum-global-dimension-size-600);
                  width: var(--spectrum-global-dimension-size-600);
                  margin-top: 0;

                  img {
                    display: block;
                    height: 100%;
                    object-fit: contain;
                  }
                `
              })}
          </div>
          <div
            css={css`
              position: relative;
              z-index: 1;
              ${ !gradients && `background-color: var(--spectrum-global-color-gray-50);` }
              ${icon ? 'top: var(--spectrum-global-dimension-size-800);' : ''}
            `}>
            <div
              css={css`
                margin-top: 0 !important;
                margin-bottom: var(--spectrum-global-dimension-size-100) !important;
              `}>
              <div
                style={ gradients && {  color: 'white'}}
                css={css`
                  font-size: var(--spectrum-global-dimension-size-${headerSize});
                  @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                    font-size: var(--spectrum-global-dimension-size-185);
                `}>
                <strong>{heading && heading.props.children}</strong>
              </div>
            </div>
            <div
              className="spectrum-Card-content spectrum-Body spectrum-Body--sizeS"
              style={ gradients && {  color: 'white'}}
              css={css`
                height: auto;
                margin-bottom: 0 !important;
                margin-top:30px;
                font-size: var(--spectrum-global-dimension-size-${contentSize});
              `}>
              {text && text.props.children}
            </div>
            { buttonDisplay &&
              <div
               style={{textAlign:'center',display:'flex',alignItems:'center',marginTop:'20px'}}
               >
                <HeroButtons
                  buttons={buttons}
                  quiets={[false, false]}
                  variants={['primary', 'primary']}
                  css={css`
                    justify-content: flex-end;
                    @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                      justify-content: center;
                    }
                  `}
                />
              </div>
            }
          </div>
        </div>
        
        {footer &&
          <div className="spectrum-Card-footer">
            <HeroButtons
              buttons={buttons}
              quiets={[true, false]}
              variants={['secondary', 'primary']}
              css={css`
                justify-content: flex-end;

                @media screen and (max-width: ${TABLET_SCREEN_WIDTH}) {
                  justify-content: center;
                }
              `}
            />
          </div>
        }
      </div>
    </section>
  );
};

CustomCard.propTypes = {
  theme: PropTypes.string,
  width: PropTypes.oneOf(['100%', '50%', '33%', '25%']),
  icon: PropTypes.element,
  heading: PropTypes.element,
  text: PropTypes.element,
  buttons: PropTypes.element,
  gradients:PropTypes.bool,
  footer:PropTypes.bool,
  buttonDisplay:PropTypes.bool,
  cursorDisable:PropTypes.bool
};

export { CustomCard };
