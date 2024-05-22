import React from 'react';
import { css } from "@emotion/react";
import { LinkOut, MIN_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH } from '../FormFields';

const ReturnDevConsoleLink = ({ previousProjectsDetails, returnDevConsoleLink, selectedIndex }) => {
  return (
    <div css={css`
        display : flex;
        flex-direction : column;
        gap:16px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnDevConsoleLink?.heading}</h4>

      <div css={css`display:flex;`}>
        <div>
          <p className="spectrum-Body spectrum-Body--sizeS"
            css={css`
              font-family: Source Code Pro,Monaco,monospace;
              white-space: normal;
              overflow-wrap: anywhere;
              max-width: 300px;
              color: #0265DC;
            `}
          >{previousProjectsDetails?.[selectedIndex].name}</p></div>
        <div css={
          css`
              margin-left:10px;
              cursor : pointer;
              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                display:none;
              }
            }`
        }><LinkOut /></div>
      </div>
    </div>
  )
}

export { ReturnDevConsoleLink };
