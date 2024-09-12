import React from 'react'
import ShowCard from '../Card/ShowCard';

const ReturnClientId = ({ val: { heading, clientId } }) => {
  return (
    heading && <ShowCard heading={heading} value={clientId} />
  )
}
export { ReturnClientId };
