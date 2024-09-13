import React from 'react'
import ShowCard from './ShowCard';

const CardAllowedOrigins = ({ val: { heading, allowedOrigins } }) => {
  return (
    heading && <ShowCard heading={heading} value={allowedOrigins} />
  )
}

export { CardAllowedOrigins };
