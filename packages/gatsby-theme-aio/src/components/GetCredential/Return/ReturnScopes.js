import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnScopes = ({ val: { heading, scope } }) => {
  return (
    heading && <ShowCard heading={heading} value={scope} />
  )
}

export { ReturnScopes };
