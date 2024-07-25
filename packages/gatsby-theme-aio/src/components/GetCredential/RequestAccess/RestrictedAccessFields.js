import React, { useContext } from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { css } from "@emotion/react";
import { InlineNestedAlert } from "../../InlineNestedAlert";
import { OrganizationAccessDetails } from "./OrganizationAccessDetails";
import { OrganizationAccessDetailsNoProduct } from "./OrganizationAccessDetailsNoProduct";
import { OrganizationAccessDetailsType1User } from "./OrganizationAccessDetailsType1User";
import { OrganizationAccessDetailsNotMember } from "./OrganizationAccessDetailsNotMember";
import { OrganizationAccessDetailsNotSignUp } from "./OrganizationAccessDetailsNotSignUp";
import GetCredentialContext from "../GetCredentialContext";

const RestrictedAccess = ({ restrictedAccess, organizationAccessDetailsEdgeCase , productName}) => {
  let products = restrictedAccess?.children?.props;
  let childProps = {};
  const { selectedOrganization, template } = useContext(GetCredentialContext);
  let disEntitledReason = template?.disEntitledReasons[0];

  if (Array.isArray(organizationAccessDetailsEdgeCase?.children)) {
    organizationAccessDetailsEdgeCase?.children?.forEach(({ type, props }) => {
      childProps[type] = props;
    });
  }

  const render = () => {
    if (selectedOrganization?.type === "developer" && childProps[OrganizationAccessDetailsType1User]) {
      return <OrganizationAccessDetailsType1User productName={productName} content={childProps[OrganizationAccessDetailsType1User]} />
    }
    else if (disEntitledReason === "USER_MISSING_PUBLIC_BETA") {
      return <OrganizationAccessDetailsNotSignUp productName={productName} content={childProps[OrganizationAccessDetailsNotSignUp]} />
    }
    else if (disEntitledReason === "ORG_MISSING_FIS") {
      return <OrganizationAccessDetailsNoProduct productName={productName} content={childProps[OrganizationAccessDetailsNoProduct]} />
    }
    else if (template?.canRequestAccess) {
      return <OrganizationAccessDetails productName={productName} restrictedAccess={restrictedAccess} products={products} />
    }
    else {
      return <OrganizationAccessDetailsNotMember productName={productName} content={childProps[OrganizationAccessDetailsNotMember]} />
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