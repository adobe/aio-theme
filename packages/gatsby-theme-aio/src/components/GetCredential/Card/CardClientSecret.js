import React from 'react'
import ShowCard from './ShowCard';

const CardClientSecret = ({ cardClientSecret, response }) => {
  return (
    <ShowCard heading={cardClientSecret?.heading} isClientSecret buttonLabel={cardClientSecret?.buttonLabel} response={response} />
  )
}

export { CardClientSecret };
