import React, { useContext } from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { css } from "@emotion/react";
import { InlineNestedAlert } from "../../InlineNestedAlert";
import { NestedAlertContent } from "./NestedAlertContent";
import { NestedAlertContentNoProduct } from "./NestedAlertContentNoProduct";
import { NestedAlertContentType1User } from "./NestedAlertContentType1User";
import { NestedAlertContentNotMember } from "./NestedAlertContentNotMember";
import { NestedAlertContentNotSignUp } from "./NestedAlertContentNotSignUp";
import GetCredentialContext from "../GetCredentialContext";

const RestrictedAccess = ({ restrictedAccess, nestedAlertContentEdgeCase }) => {
  let products = restrictedAccess?.children?.props;
  let childProps = {};
  const { selectedOrganization, template } = useContext(GetCredentialContext);
  let disEntitledReason = template?.disEntitledReasons[0];
  console.log({ selectedOrganization, disEntitledReason });

  if (Array.isArray(nestedAlertContentEdgeCase?.children)) {
    nestedAlertContentEdgeCase?.children?.forEach(({ type, props }) => {
      childProps[type] = props;
    });
  }

  const render = () => {
    if (disEntitledReason === "ORG_MISSING_FIS") {
      return <NestedAlertContentNoProduct content={childProps[NestedAlertContentNoProduct]} />
    }
    else if (disEntitledReason === "USER_MISSING_PUBLIC_BETA") {
      return <NestedAlertContentNotSignUp content={childProps[NestedAlertContentNotSignUp]} />
    }
    else if (selectedOrganization?.type === "developer") {
      return <NestedAlertContentType1User content={childProps[NestedAlertContentType1User]} />
    }
    else {
      return <NestedAlertContent restrictedAccess={restrictedAccess} products={products} />
    }
  };

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

          & > div>svg {
            margin-top: 5px;
          }
        `}
      >
        <InlineNestedAlert variant="info" iconPosition="right">
          {render()}
        </InlineNestedAlert>
      </div>
    </>
  );
};

export { RestrictedAccess };