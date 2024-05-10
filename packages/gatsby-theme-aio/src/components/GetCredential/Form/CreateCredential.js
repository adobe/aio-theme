import React from 'react';
import { css } from "@emotion/react";

const CreateCredential = ({ createCredential, isValid, setIsCreateNewCredential, isCreateNewCredential }) => {
  return (
    <div css={
      css`
        display : flex;
        gap:16px;
        align-items : center;
      `
    }>
      <button
        id="credentialButton"
        className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
        css={css`width:fit-content;`} onClick={createCredential} disabled={!isValid} >
        <span className="spectrum-Button-label">Create credential</span>
      </button>
      {isCreateNewCredential && <p css={css`text-decoration : underline;margin:0; cursor : pointer;`} onClick={() => setIsCreateNewCredential(false)}>Cancel</p>}
    </div>
  )
}

export { CreateCredential };
