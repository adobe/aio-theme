import React from 'react'
import ShowCard from './ShowCard';

const CardClientSecret = ({ cardClientDetails, cardClientSecret, clientSecret }) => {
  return (
    <ShowCard heading={cardClientSecret?.heading} isClientSecret buttonLabel={cardClientSecret?.buttonLabel} clientSecret={clientSecret} />
  )
}

export { CardClientSecret };
