import React from 'react'
import ShowCard from './ShowCard'

const CardClientId = ({ cardClientId, clientId }) => {
  return (
    <ShowCard heading={cardClientId?.heading} value={clientId} />
  )
}

export { CardClientId }
