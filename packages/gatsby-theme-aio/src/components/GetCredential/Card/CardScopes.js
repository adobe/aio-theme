import React from 'react'
import ShowCard from './ShowCard';

const CardScopes = ({ val: { heading, scope } }) => {
  return (
    heading && <ShowCard heading={heading} value={scope} />
  )
}
export { CardScopes };
