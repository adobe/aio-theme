import React from 'react'
import { ReturnCredentialsData } from './ReturnCredentialsData'

const ReturnClientSecret = ({ returnClientDetails, returnClientSecret }) => {
  return (
    <ReturnCredentialsData heading={returnClientSecret?.heading} isClientSecret buttonLabel={returnClientSecret?.buttonLabel} />
  )
}

export { ReturnClientSecret };
