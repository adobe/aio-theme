import React from 'react'
import ShowCard from './ShowCard'

const CardClientId = ({ val: { heading, clientId } }) => {
  return (
    heading && <ShowCard heading={heading} value={clientId} />
  )
}

export { CardClientId }
