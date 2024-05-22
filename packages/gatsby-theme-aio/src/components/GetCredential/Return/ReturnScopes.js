import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnScopes = ({ returnCredentialDetails, returnScopes, allowedOrigins }) => {
  return (
    <ShowCard heading={returnScopes?.heading} value={allowedOrigins} />
  )
}

export { ReturnScopes };
