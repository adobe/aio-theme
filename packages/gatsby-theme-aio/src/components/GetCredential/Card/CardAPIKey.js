import React from 'react'
import ShowCard from './ShowCard';

const CardAPIKey = ({ val: { heading, apiKey } }) => {
  return (
    heading && <ShowCard heading={heading} value={apiKey} />
  )
}

export { CardAPIKey };