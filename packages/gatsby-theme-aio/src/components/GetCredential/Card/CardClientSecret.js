import React from 'react'
import ShowCard from './ShowCard';

const CardClientSecret = ({ cardClientDetails, cardClientSecret, clientSecret, response }) => {
  return (
    <ShowCard heading={cardClientSecret?.heading} isClientSecret buttonLabel={cardClientSecret?.buttonLabel} clientSecret={clientSecret} response={response} />
  )
}

export { CardClientSecret };
