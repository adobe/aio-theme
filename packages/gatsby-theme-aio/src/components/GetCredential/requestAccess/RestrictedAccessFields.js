import React from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { css } from "@emotion/react";
import { InlineNestedAlert } from "@adobe/gatsby-theme-aio/src/components/InlineNestedAlert";
import { NestedAlertContent } from "./NestedAlertContent";

const RestrictedAccess = ({ restrictedAccess }) => {
  let products = restrictedAccess?.children?.props;

  return (
    <>
      <div
        css={css`
          width: 100%;
          & > div {
            margin: 0px;
            padding: 24px;
            background: transparent;
          }
        `}
      >
        <InlineNestedAlert variant="info" iconPosition="right">
          <NestedAlertContent
            restrictedAccess={restrictedAccess}
            products={products}
          />
        </InlineNestedAlert>
      </div>
    </>
  );
};

export { RestrictedAccess };