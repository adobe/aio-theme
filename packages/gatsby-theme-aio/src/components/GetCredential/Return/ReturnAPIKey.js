import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnAPIKey = ({ val: { heading, apiKey } }) => {
  return (
    heading && <ShowCard heading={heading} value={apiKey} />
  )
}

export { ReturnAPIKey };
