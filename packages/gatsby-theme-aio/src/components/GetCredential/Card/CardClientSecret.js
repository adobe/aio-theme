import React from 'react'
import ShowCard from './ShowCard';

const CardClientSecret = ({ val : { cardClientSecret, response }}) => {
  return (
    cardClientSecret && <ShowCard heading={cardClientSecret?.heading} isClientSecret buttonLabel={cardClientSecret?.buttonLabel} response={response} />
  )
}

export { CardClientSecret };
