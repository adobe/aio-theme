import React from 'react'
import ShowCard from './ShowCard';

const CardOrganizationName = ({ cardClientDetails, cardOrganizationName, organization }) => {
  return (
    <ShowCard heading={cardOrganizationName?.heading} value={organization} isOraganization />
  )
}

export { CardOrganizationName };
