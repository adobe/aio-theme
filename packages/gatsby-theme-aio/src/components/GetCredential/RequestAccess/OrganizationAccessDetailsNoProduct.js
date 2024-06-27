import React from "react";
import { OrganizationAccessDetailsEdgeCase } from "./OrganizationAccessDetailsEdgeCase";

const OrganizationAccessDetailsNoProduct = ({content}) => {

  return (
    <>
      <OrganizationAccessDetailsEdgeCase content={content} isNoProduct={true} />
    </>
  );
};

export { OrganizationAccessDetailsNoProduct };
