import React from 'react';
import { OrganizationAccessDetailsEdgeCase } from './OrganizationAccessDetailsEdgeCase';

const OrganizationAccessDetailsNotSignUp = ({ content }) => {
  return (
    <>
      <OrganizationAccessDetailsEdgeCase content={content} isNotSignUp={true}/>
    </>
  );
};

export { OrganizationAccessDetailsNotSignUp };
