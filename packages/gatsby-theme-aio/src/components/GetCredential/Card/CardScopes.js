import React from 'react'
import ShowCard from './ShowCard';

const CardScopes = ({ cardScopes, allowedOrigins }) => {
  return (
    <ShowCard heading={cardScopes?.heading} value={allowedOrigins} />
  )
}
export { CardScopes };
