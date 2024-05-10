import React from 'react';
import { css } from "@emotion/react";
import { ReturnCustomComp } from './ReturnCustomComp'
import { ReturnNewCredential } from './ReturnNewCredential'

const RetunrSideComp = ({ retunrSideComp, setIsCreateNewCredential, returnNewCredential, returnCustomComp }) => {
  return (
    <>
      <div
        css={css`
          display:flex;
          gap:30px;
          flex-direction:column;
          width: 100%;
        `}
      >
        <ReturnCustomComp returnCustomComp={returnCustomComp} retunrSideComp={retunrSideComp} />
        <ReturnNewCredential returnNewCredential={returnNewCredential} setIsCreateNewCredential={setIsCreateNewCredential} retunrSideComp={retunrSideComp} />
      </div>
    </>
  )
}

export { RetunrSideComp }