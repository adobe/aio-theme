import React from 'react';
import { css } from "@emotion/react";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from '../FormFields';

const SideContent = ({ sideContent, SideComp }) => {
  return (
    <>
      <div
        css={css`
          width: 2px; 
          background-color: #D0D0D0; 

          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            display:none;
          }

        `}
      />
      <div
        css={css`
          width:50%;
  
          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            width:100%;
          }

        `}>
        <SideComp side={sideContent} />
      </div>
    </>
  )
}

export { SideContent };
