import React from 'react'
import ShowCard from './ShowCard';

const CardScopes = ({ cardClientDetails, cardScopes, allowedOrigins }) => {
  return (
    <ShowCard heading={cardScopes?.heading} value={allowedOrigins} />
  )
}
export { CardScopes };
