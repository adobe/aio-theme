import React from 'react';
import { OrganizationAccessDetailsEdgeCase } from './OrganizationAccessDetailsEdgeCase';

const OrganizationAccessDetailsNotSignUp = ({ content, productName }) => {
  return (
    <>
      <OrganizationAccessDetailsEdgeCase content={content} isNotSignUp={true} productName={productName} />
    </>
  );
};

export { OrganizationAccessDetailsNotSignUp };
