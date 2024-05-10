import React from 'react';
import { css } from "@emotion/react";
import { CopyIcon } from '../FormFields';
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';

const ShowCard = ({ heading, value, isClientSecret, buttonLabel, isOraganization }) => {

  return (
    <div
      css={css`
          display:flex;
          flex-direction:column;
          gap:8px;
          button {
            cursor : pointer !important;
          }
        `}
    >
      <p className="spectrum-Body spectrum-Body--sizeS">{heading}</p>
      <div
        css={css` 
            display:flex;
            align-items: center;
            gap: 24px; 
          `}>


        {isClientSecret &&
          <div css={css`button{cursor : pointer}`}>
            <ActionButton>{buttonLabel}</ActionButton>
          </div>
        }

        {value && <p className="spectrum-Body spectrum-Body--sizeS"
          css={css`
              font-family: Source Code Pro,Monaco,monospace;
              white-space: normal;
              overflow-wrap: anywhere;
              max-width: 300px;
            `}
        >{value}</p>
        }

        {!isClientSecret &&

          <div css={css`
            position:relative; 
            display:${isOraganization ? "none" : "block"} `
          }>
            <TooltipTrigger delay={0}>
              <ActionButton onPress={() => navigator.clipboard.writeText(value)}><CopyIcon /></ActionButton>
              <Tooltip>Copy</Tooltip>
            </TooltipTrigger>
          </div>

        }

      </div>
    </div>
  )
}

export default ShowCard