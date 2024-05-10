import React from 'react'
import ShowCard from './ShowCard';

const CardClientSecret = ({ cardClientDetails, cardClientSecret }) => {
  return (
    <ShowCard heading={cardClientSecret?.heading} isClientSecret buttonLabel={cardClientSecret?.buttonLabel} />
  )
}


export { CardClientSecret };
