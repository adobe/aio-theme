import React from 'react';
import { css } from "@emotion/react";
import classNames from "classnames";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';

const JoinBetaProgram = ({ joinBeta }) => {

  return (
    <div className={classNames(joinBeta?.className)}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        color:var(--spectrum-global-color-gray-800);
        padding-left: var(--spectrum-global-dimension-size-800);
        width: calc(7 * 100% / 12);
        height: 100%;
        text-align: left;

        @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
          padding: 0;
          width: 100%;
        }
      `}
    >
      <h3 className="spectrum-Heading spectrum-Heading--sizeL">{joinBeta.heading}</h3>
      <p
        className="spectrum-Body spectrum-Body--sizeL"
        css={css`
          color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));
        `}
      >{joinBeta.text}</p>
      <a href={joinBeta?.betaProgramLink} target="_blank" rel="noreferrer" >
        <button
          className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
          css={css`width:fit-content;margin-top:10px`}>
          <span className="spectrum-Button-label">{joinBeta?.betaProgramLinkText}</span>
        </button>
      </a>
    </div>
  )
}

export { JoinBetaProgram };
