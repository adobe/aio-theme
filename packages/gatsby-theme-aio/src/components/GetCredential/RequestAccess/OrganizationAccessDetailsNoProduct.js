import React from "react";
import { OrganizationAccessDetailsEdgeCase } from "./OrganizationAccessDetailsEdgeCase";

const OrganizationAccessDetailsNoProduct = ({ content, productName }) => {

  return (
    <>
      <OrganizationAccessDetailsEdgeCase content={content} isNoProduct={true} productName={productName} />
    </>
  );
};

export { OrganizationAccessDetailsNoProduct };
