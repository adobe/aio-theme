import React from 'react'
import ShowCard from './ShowCard'

const CardClientId = ({ cardClientDetails, cardClientId, clientId }) => {
  return (
    <ShowCard heading={cardClientId?.heading} value={clientId} />
  )
}

export { CardClientId }
