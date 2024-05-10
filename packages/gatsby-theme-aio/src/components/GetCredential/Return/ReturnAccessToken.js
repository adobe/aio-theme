import React from 'react';
import { css } from "@emotion/react";

const ReturnAccessToken = ({ returnAccessToken }) => {
  return (
    <div css={css`
      display : flex;
      flex-direction : column;
      gap:16px;
    `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnAccessToken?.heading}</h4>
      <button css={css`width: 180px;`} className="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM">
        <span className="spectrum-Button-label">{returnAccessToken?.buttonLabel}</span>
      </button>
    </div>
  )
}

export { ReturnAccessToken }
