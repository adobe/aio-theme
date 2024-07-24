import React from 'react';
import { OrganizationAccessDetailsEdgeCase } from './OrganizationAccessDetailsEdgeCase';

const OrganizationAccessDetailsNotMember = ({content , productName}) => {

  return (
    <>
      <OrganizationAccessDetailsEdgeCase content={content}  productName={productName}/>
    </>
  );
};

export { OrganizationAccessDetailsNotMember };
