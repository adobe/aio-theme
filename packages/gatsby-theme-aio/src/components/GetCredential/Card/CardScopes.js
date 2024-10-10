import React from 'react'
import ShowCard from './ShowCard';

const CardScopes = ({ cardScopes }) => {
  return (
    <ShowCard heading={cardScopes?.heading} value={cardScopes?.scope} />
  )
}
export { CardScopes };
