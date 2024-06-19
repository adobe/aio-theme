import React from 'react';
import { css } from "@emotion/react";
import { MIN_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH } from '../FormFields';
import { LinkOut } from '../Icons';

const ReturnManageDeveloperConsole = ({ returnManageDeveloperConsole }) => {
  return (
    <div>
      <div css={css`display:flex;`}>
        <a href={returnManageDeveloperConsole?.direction} target="_blank" rel="noreferrer"
          css={css`
            color:#0265DC;
          `}
          data-cy="manage-projects-console"
        >
          {returnManageDeveloperConsole?.label}
        </a>
        <div css={
          css`
            margin-left:10px;
            cursor : pointer;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              display:none;
            }
          
            & > svg > path{
              fill : #0265DC !important;
            }
          `
        }><LinkOut /></div>
      </div>
    </div>
  )
}

export { ReturnManageDeveloperConsole }