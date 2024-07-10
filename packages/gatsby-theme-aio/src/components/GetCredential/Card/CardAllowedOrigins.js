import React from 'react'
import ShowCard from './ShowCard';

const CardAllowedOrigins = ({ cardAllowedOrigins, allowedOrigins }) => {
  return (
    <ShowCard heading={cardAllowedOrigins?.heading} value={allowedOrigins} />
  )
}

export { CardAllowedOrigins };
