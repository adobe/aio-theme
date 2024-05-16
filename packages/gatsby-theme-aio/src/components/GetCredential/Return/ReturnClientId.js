import React from 'react'
import { ReturnCredentialsData } from './ReturnCredentialsData'

const ReturnClientId = ({ returnClientDetails, returnClientId, apiKey }) => {
  return (
    <ReturnCredentialsData heading={returnClientId?.heading} value={apiKey} />
  )
}
export { ReturnClientId }