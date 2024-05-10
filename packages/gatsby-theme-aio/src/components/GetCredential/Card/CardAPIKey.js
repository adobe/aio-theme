import React from 'react'
import { css } from "@emotion/react";
import ShowCard from './ShowCard';

const CardAPIKey = ({ cardClientDetails, cardAPIKey, apiKey }) => {
  return (
    <ShowCard heading={cardAPIKey?.heading} value={apiKey} />
  )
}

export { CardAPIKey };