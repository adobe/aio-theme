import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";

const RequestAccessSide = ({ side }) => {
  return (
    <>
      <div
        css={css`
          width: 1px;
          background: #d5d5d5;
        `}
      ></div>
      {side}
    </>
  );
};

export { RequestAccessSide };
