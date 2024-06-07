import React from 'react';
import { ContextHelp } from './ContextHelp';
import { css } from "@emotion/react";
import classNames from "classnames";

export const FormFields = ({ isFormValue, fields, children, formData, isRed }) => {

  const { label, range, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading, description, className, required } = fields;

  return (
    <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`} className={classNames(className)} >
      <div className="spectrum-Textfield spectrum-Textfield--sizeM"
        css={css`
            display:flex;
            justify-content:space-between;
            position:relative;
            width: 100%;  
          `}
      >
        <div css={css` display:flex; gap:3px;font-size:small; `} >
          {label && <label for="textfield-m" className="spectrum-Body spectrum-Body--sizeS"
            css={css` color: var(--spectrum-global-color-gray-700)`}
          >
            {label}
          </label>}
          {required && <span css={css`font-size: 1.2rem;`}>*</span>}
          {isFormValue?.length ?
            <div css={
              css` 
                cursor:pointer; 
                width:20px; 
                height:20px; 
                
                & > div > div > div > button {
                  border: none;
                  margin-left: 4px;
                }
             `} >
              {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
            </div> : null
          }
        </div>
        {range && <span id="character-count-2" className="spectrum-Textfield-characterCount"
          css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700)) `}>
          {formData['CredentialName'] ? range - formData['CredentialName']?.length : range}
        </span>}
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap:10px;
        `}>
        {children}
      </div>
      {description && <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
        <p className="spectrum-Body spectrum-Body--sizeXS"
          css={css`
              color : ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-700)"};
              width: ${isFormValue?.length ? "95%" : "100%"};
            `}>
          {description}
        </p>
      </div>
      }
    </div>
  )
}

export const MIN_MOBILE_WIDTH = "320px";
export const MAX_MOBILE_WIDTH = "767px";
export const MAX_TABLET_SCREEN_WIDTH = "1024px";
export const MIN_TABLET_SCREEB_WIDTH = "768px";
