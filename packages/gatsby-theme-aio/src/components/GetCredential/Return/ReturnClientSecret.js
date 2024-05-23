import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnClientSecret = ({ returnCredentialDetails, returnClientSecret, clientSecret, response }) => {
  return (
    <ShowCard heading={returnClientSecret?.heading} isClientSecret buttonLabel={returnClientSecret?.buttonLabel} clientSecret={clientSecret} response={response} />
  )
}

export { ReturnClientSecret };
