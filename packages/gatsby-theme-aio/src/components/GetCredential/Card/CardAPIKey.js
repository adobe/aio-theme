import React from 'react'
import ShowCard from './ShowCard';

const CardAPIKey = ({ cardAPIKey, apiKey }) => {
  return (
    <ShowCard heading={cardAPIKey?.heading} value={apiKey} />
  )
}

export { CardAPIKey };