import React from 'react';
import { css } from '@emotion/react';
import { ReturnAPIKey } from './ReturnAPIKey';
import { ReturnAllowedOrigins } from './ReturnAllowedOrigins';
import { ReturnClientId } from './ReturnClientId';
import { ReturnClientSecret } from './ReturnClientSecret';
import { ReturnOrganizationName } from './ReturnOrganizationName';
import { ReturnScopes } from './ReturnScopes';

const ReturnCredentialDetails = ({ clientDetails, clientIdDetails, clientSecretDetails, organizationDetails, scopesDetails, apiKeyDetails, allowedOriginsDetails, organizationName, apiKey, allowedOrigins, clientSecret, clientId, response }) => {

  return (
    <div css={css`
        display : flex;
        flex-direction : column;
        gap: 32px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading}</h4>
      {apiKeyDetails && <ReturnAPIKey returnCredentialDetails={clientDetails} returnAPIKey={apiKeyDetails} apiKey={apiKey} />}
      {allowedOrigins && <ReturnAllowedOrigins returnCredentialDetails={clientDetails} allowedOrigins={allowedOriginsDetails} returnAllowedOrigins={allowedOrigins} />}
      {clientIdDetails && <ReturnClientId returnCredentialDetails={clientDetails} returnClientId={clientIdDetails} clientId={clientId} />}
      {clientSecretDetails && <ReturnClientSecret returnCredentialDetails={clientDetails} returnClientSecret={clientSecretDetails} clientSecret={clientSecret} response={response} />}
      {organizationDetails && <ReturnOrganizationName returnCredentialDetails={clientDetails} returnOrganizationName={organizationDetails} organization={organizationName?.name} />}
      {scopesDetails && <ReturnScopes returnCredentialDetails={clientDetails} returnScopes={scopesDetails} />}
    </div>
  )
}

export { ReturnCredentialDetails };
