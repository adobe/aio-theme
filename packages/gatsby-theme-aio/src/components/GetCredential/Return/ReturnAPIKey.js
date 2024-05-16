import React from 'react';
import { ReturnCredentialsData } from './ReturnCredentialsData';

const ReturnAPIKey = ({ returnClientDetails, credentialKey, value, index, setTooltipOpen, handleLeave, handleCopy }) => {
  return (
    <ReturnCredentialsData credentialKey={credentialKey} value={value} index={index} setTooltipOpen={setTooltipOpen} handleLeave={handleLeave} handleCopy={handleCopy} />
  )
}

export { ReturnAPIKey }