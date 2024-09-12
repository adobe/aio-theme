import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnAllowedOrigins = ({ val: { allowedOrigins, heading } }) => {
  return (
    heading && <ShowCard heading={heading} value={allowedOrigins} />
  )
}

export { ReturnAllowedOrigins };
