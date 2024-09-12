import React from 'react'
import ShowCard from './ShowCard';

const CardOrganizationName = ({ val: { heading, organization } }) => {
  return (
    heading && <ShowCard heading={heading} value={organization} isOraganization />
  )
}

export { CardOrganizationName };
