import React from 'react'
import ShowCard from '../Card/ShowCard';

const ReturnClientId = ({ returnClientId, clientId }) => {
  return (
    <ShowCard heading={returnClientId?.heading} value={clientId} />
  )
}
export { ReturnClientId };
