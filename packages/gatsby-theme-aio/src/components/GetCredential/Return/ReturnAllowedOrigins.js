import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnAllowedOrigins = ({ returnCredentialDetails, returnAllowedOrigins, allowedOrigins }) => {
  return (
    <ShowCard heading={returnAllowedOrigins?.heading} value={allowedOrigins} />
  )
}

export { ReturnAllowedOrigins };
