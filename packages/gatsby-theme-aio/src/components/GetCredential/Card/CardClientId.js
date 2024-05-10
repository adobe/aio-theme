import React from 'react'
import ShowCard from './ShowCard'

const CardClientId = ({ cardClientDetails, cardClientId, apiKey }) => {
  return (
    <ShowCard heading={cardClientId?.heading} value={apiKey} />
  )
}

export { CardClientId }