import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnOrganizationName = ({ returnCredentialDetails, returnOrganizationName, organization }) => {
  return (
    <ShowCard heading={returnOrganizationName?.heading} value={organization} isOraganization />
  )
}

export { ReturnOrganizationName };
