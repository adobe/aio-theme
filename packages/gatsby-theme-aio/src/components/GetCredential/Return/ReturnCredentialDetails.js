import React from 'react';
import { css } from '@emotion/react';
import { ReturnAPIKey } from './ReturnAPIKey';
import { ReturnAllowedOrigins } from './ReturnAllowedOrigins';
import { ReturnClientId } from './ReturnClientId';
import { ReturnClientSecret } from './ReturnClientSecret';
import { ReturnOrganizationName } from './ReturnOrganizationName';
import { ReturnScopes } from './ReturnScopes';

const ReturnCredentialDetails = ({ returnCredentialDetails, returnClientId, returnClientSecret, returnOrganizationName, returnScopes, apiKey, allowedOrigins, organization, returnAPIKey, clientId, returnAllowedOrigins , clientSecret }) => {

  return (
    <div css={css`
        display : flex;
        flex-direction : column;
        gap: 32px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnCredentialDetails?.heading}</h4>
      {returnAPIKey && <ReturnAPIKey returnCredentialDetails={returnCredentialDetails} returnAPIKey={returnAPIKey} apiKey={apiKey} />}
      {returnAllowedOrigins && <ReturnAllowedOrigins returnCredentialDetails={returnCredentialDetails} allowedOrigins={allowedOrigins} returnAllowedOrigins={returnAllowedOrigins} />}
      {returnClientId && <ReturnClientId returnCredentialDetails={returnCredentialDetails} returnClientId={returnClientId} clientId={clientId} />}
      {returnClientSecret && <ReturnClientSecret returnCredentialDetails={returnCredentialDetails} returnClientSecret={returnClientSecret} clientSecret={clientSecret} />}
      {returnOrganizationName && <ReturnOrganizationName returnCredentialDetails={returnCredentialDetails} returnOrganizationName={returnOrganizationName} organization={organization.name} />}
      {returnScopes && <ReturnScopes returnCredentialDetails={returnCredentialDetails} returnScopes={returnScopes} />}
    </div>
  )
}

export { ReturnCredentialDetails };