import React from 'react';
import { css } from "@emotion/react";
import { ReturnCustomComp } from './ReturnCustomComp'
import { ReturnNewCredential } from './ReturnNewCredential'

const ReturnSideComp = ({ returnSideComp, setIsCreateNewCredential, returnNewCredential, returnCustomComp }) => {
  return (
    <>
      <div
        css={css`
          display:flex;
          gap:15px;
          flex-direction:column;
          width: 100%;
        `}
      >
        <ReturnCustomComp returnCustomComp={returnCustomComp} returnSideComp={returnSideComp} />
        <ReturnNewCredential returnNewCredential={returnNewCredential} setIsCreateNewCredential={setIsCreateNewCredential} returnSideComp={returnSideComp} />
      </div>
    </>
  )
}

export { ReturnSideComp }