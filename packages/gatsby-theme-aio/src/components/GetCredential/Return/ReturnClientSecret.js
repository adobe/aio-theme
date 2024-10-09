import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnClientSecret = ({ returnClientSecret, response }) => {
  return (
    <ShowCard heading={returnClientSecret?.heading} isClientSecret buttonLabel={returnClientSecret?.buttonLabel} response={response} />
  )
}

export { ReturnClientSecret };
