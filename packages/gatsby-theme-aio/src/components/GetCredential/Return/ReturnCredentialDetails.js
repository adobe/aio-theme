import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { ReturnAPIKey } from './ReturnAPIKey';
import { ReturnAllowedOrigins } from './ReturnAllowedOrigins';
import { ReturnClientId } from './ReturnClientId';
import { ReturnClientSecret } from './ReturnClientSecret';
import { ReturnOrganizationName } from './ReturnOrganizationName';
import { ReturnScopes } from './ReturnScopes';
import { ReturnImsOrgID } from './ReturnImsOrgID';
import GetCredentialContext from '../GetCredentialContext';

const ReturnCredentialDetails = ({ clientDetails, clientIdDetails, clientSecretDetails, organizationDetails, scopesDetails, apiKeyDetails, allowedOriginsDetails, organizationName, allowedOrigins, response, imsOrgID }) => {

  const { selectedOrganization } = useContext(GetCredentialContext)

  return (
    <div css={css`
        display : flex;
        flex-direction : column;  
        gap: 32px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading}</h4>
      {apiKeyDetails && <ReturnAPIKey returnCredentialDetails={clientDetails} returnAPIKey={apiKeyDetails} apiKey={response?.workspaces[0]?.credentials[0]?.clientId} />}
      {allowedOrigins && <ReturnAllowedOrigins returnCredentialDetails={clientDetails} allowedOrigins={allowedOriginsDetails} returnAllowedOrigins={allowedOrigins} />}
      {clientIdDetails && <ReturnClientId returnCredentialDetails={clientDetails} returnClientId={clientIdDetails} clientId={response?.workspaces[0]?.credentials[0]?.clientId} />}
      {clientSecretDetails && <ReturnClientSecret returnCredentialDetails={clientDetails} returnClientSecret={clientSecretDetails} response={response} />}
      {organizationDetails && <ReturnOrganizationName returnCredentialDetails={clientDetails} returnOrganizationName={organizationDetails} organization={organizationName?.name} />}
      {scopesDetails && <ReturnScopes returnCredentialDetails={clientDetails} returnScopes={scopesDetails} />}
      {imsOrgID && <ReturnImsOrgID returnCredentialDetails={clientDetails} returnImsOrgID={imsOrgID} value={selectedOrganization?.code} />}
    </div>
  )
}

export { ReturnCredentialDetails };
