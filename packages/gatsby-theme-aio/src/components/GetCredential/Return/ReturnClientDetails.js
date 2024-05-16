import React from 'react';
import { ReturnAPIKey } from './ReturnAPIKey';
import { ReturnAllowedOrigins } from './ReturnAllowedOrigins';
import { ReturnClientId } from './ReturnClientId';
import { ReturnClientSecret } from './ReturnClientSecret';
import { ReturnOrganizationName } from './ReturnOrganizationName';
import { ReturnScopes } from './ReturnScopes';

const ReturnClientDetails = ({ returnClientDetails, returnClientId, returnClientSecret, returnScopes, apiKey, allowedOrigins }) => {
  return (
    <div>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnClientDetails?.heading}</h4>
      <ReturnAPIKey returnClientDetails={returnClientDetails} />
      <ReturnAllowedOrigins returnClientDetails={returnClientDetails} />
      <ReturnClientId returnClientDetails={returnClientDetails} returnClientId={returnClientId} />
      <ReturnClientSecret returnClientDetails={returnClientDetails} returnClientSecret={returnClientSecret} />
      <ReturnOrganizationName returnClientDetails={returnClientDetails} />
      <ReturnScopes returnClientDetails={returnClientDetails} returnScopes={returnScopes} />
    </div>
  )
}

export { ReturnClientDetails };
