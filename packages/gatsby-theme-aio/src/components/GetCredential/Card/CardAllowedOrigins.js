import React from 'react'
import ShowCard from './ShowCard';

const CardAllowedOrigins = ({ cardClientDetails, cardAllowedOrigins, allowedOrigins }) => {
  return (
    <ShowCard heading={cardAllowedOrigins?.heading} value={allowedOrigins} />
  )
}


export { CardAllowedOrigins };