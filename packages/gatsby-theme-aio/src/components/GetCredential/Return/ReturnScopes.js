import React from 'react'
import { ReturnCredentialsData } from './ReturnCredentialsData'

const ReturnScopes = ({ returnClientDetails, returnScopes, allowedOrigins }) => {
  return (
    <ReturnCredentialsData heading={returnScopes?.heading} value={allowedOrigins} />
  )
}


export { ReturnScopes }