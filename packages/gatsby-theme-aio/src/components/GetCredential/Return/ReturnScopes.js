import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnScopes = ({ returnScopes }) => {
  return (
    <ShowCard heading={returnScopes?.heading} value={returnScopes?.scope} />
  )
}

export { ReturnScopes };
