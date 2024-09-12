import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnClientSecret = ({ val: { returnClientSecret, response } }) => {
  return (
    returnClientSecret && <ShowCard heading={returnClientSecret?.heading} isClientSecret buttonLabel={returnClientSecret?.buttonLabel} response={response} />
  )
}

export { ReturnClientSecret };
