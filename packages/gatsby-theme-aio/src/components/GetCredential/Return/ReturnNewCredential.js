import React from 'react';
import { css } from "@emotion/react";

const ReturnNewCredential = ({ returnNewCredential, setIsCreateNewCredential, returnSideComp }) => {

  return (
    <div
      css={css`
        display:flex;
        gap:16px;
        flex-direction:column;
        width: 100%;
      `}
    >
      <h3 className='spectrum-Heading spectrum-Heading--sizeM'>{returnNewCredential?.heading}</h3>
      <button className="spectrum-Button spectrum-Button--fill spectrum-Button--primary spectrum-Button--sizeM"
        onClick={() => setIsCreateNewCredential(true)}
        css={css`
          width : 180px;
          height : 32px;
        `}
        data-cy="create-new-credential"
      >
        <span className="spectrum-Button-label">{returnNewCredential?.buttonLabel}</span>
      </button>

    </div>
  )
}

export { ReturnNewCredential };
