import React from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { css } from "@emotion/react";

export const RestrictedAccessProduct = ({ product }) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        {product?.icon && (
          <img
            css={css`
              width: 26px;
              height: 26px;
            `}
            src={product?.icon}
          />
        )}
        {product?.label && (
          <label
            css={css`
              color: #222222;
            `}
            className="spectrum-Body spectrum-Body--sizeS"
          >
            {product?.label}
          </label>
        )}
      </div>
    </>
  );
};