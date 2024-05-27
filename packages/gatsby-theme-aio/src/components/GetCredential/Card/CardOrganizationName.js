import React from 'react'
import ShowCard from './ShowCard';

const CardOrganizationName = ({ cardOrganizationName, organization }) => {
  return (
    <ShowCard heading={cardOrganizationName?.heading} value={organization} isOraganization />
  )
}

export { CardOrganizationName };
