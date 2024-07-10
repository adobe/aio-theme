import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnAPIKey = ({ returnCredentialDetails , returnAPIKey, apiKey }) => {
  return (
    <ShowCard heading={returnAPIKey?.heading} value={apiKey} />
  )
}

export { ReturnAPIKey };
