import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnOrganizationName = ({ val: { heading, organization } }) => {
  return (
    heading && <ShowCard heading={heading} value={organization} isOraganization />
  )
}

export { ReturnOrganizationName };
