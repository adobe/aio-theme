import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { ReturnAPIKey } from './ReturnAPIKey';
import { ReturnAllowedOrigins } from './ReturnAllowedOrigins';
import { ReturnClientId } from './ReturnClientId';
import { ReturnClientSecret } from './ReturnClientSecret';
import { ReturnOrganizationName } from './ReturnOrganizationName';
import { ReturnScopes } from './ReturnScopes';
import GetCredentialContext from '../GetCredentialContext';
import { CardImsOrgID } from '../Card/CardImsOrgID';

const ReturnCredentialDetails = ({ clientDetails, clientIdDetails, clientSecretDetails, organizationDetails, scopesDetails, apiKeyDetails, allowedOriginsDetails, organizationName, allowedOrigins, response, imsOrgID }) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  const splitedOrderBy = clientDetails?.orderBy ? clientDetails?.orderBy?.split(',') : [];

return (
  <div css={css`
        display : flex;
        flex-direction : column;  
        gap: 32px;
      `}>

    <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading} </h4>
    {
      splitedOrderBy?.length > 0 ?
        <>
          {splitedOrderBy?.map((list) => {
            if (list === "APIKey") {
              return apiKeyDetails && <ReturnAPIKey returnCredentialDetails={clientDetails} returnAPIKey={apiKeyDetails} apiKey={response?.workspaces[0]?.credentials[0]?.clientId} />
            }
            if (list === "AllowedOrigins") {
              return allowedOrigins && <ReturnAllowedOrigins returnCredentialDetails={clientDetails} allowedOrigins={allowedOriginsDetails} returnAllowedOrigins={allowedOrigins} />
            }
            if (list === "ImsOrgID") {
              return imsOrgID && <CardImsOrgID returnCredentialDetails={clientDetails} cardImsOrgID={imsOrgID} imsOrgId={selectedOrganization?.code} />
            }
            if (list === "OrganizationName") {
              return organizationDetails && <ReturnOrganizationName returnCredentialDetails={clientDetails} returnOrganizationName={organizationDetails} organization={organizationName?.name} />
            }
            if (list === "ClientId") {
              return clientIdDetails && <ReturnClientId returnCredentialDetails={clientDetails} returnClientId={clientIdDetails} clientId={response?.workspaces[0]?.credentials[0]?.clientId} />
            }
            if (list === "ClientSecret") {
              return clientSecretDetails && <ReturnClientSecret returnCredentialDetails={clientDetails} returnClientSecret={clientSecretDetails} response={response} />
            }
            if (list === "Scopes") {
              return scopesDetails && <ReturnScopes returnCredentialDetails={clientDetails} returnScopes={scopesDetails} />
            }
          })}
        </> :
        <>
          {apiKeyDetails && <ReturnAPIKey returnCredentialDetails={clientDetails} returnAPIKey={apiKeyDetails} apiKey={response?.workspaces[0]?.credentials[0]?.clientId} />}
          {allowedOrigins && <ReturnAllowedOrigins returnCredentialDetails={clientDetails} allowedOrigins={allowedOriginsDetails} returnAllowedOrigins={allowedOrigins} />}
          {clientIdDetails && <ReturnClientId returnCredentialDetails={clientDetails} returnClientId={clientIdDetails} clientId={response?.workspaces[0]?.credentials[0]?.clientId} />}
          {clientSecretDetails && <ReturnClientSecret returnCredentialDetails={clientDetails} returnClientSecret={clientSecretDetails} response={response} />}
          {organizationDetails && <ReturnOrganizationName returnCredentialDetails={clientDetails} returnOrganizationName={organizationDetails} organization={organizationName?.name} />}
          {scopesDetails && <ReturnScopes returnCredentialDetails={clientDetails} returnScopes={scopesDetails} />}
          {imsOrgID && <CardImsOrgID returnCredentialDetails={clientDetails} cardImsOrgID={imsOrgID} imsOrgId={selectedOrganization?.code} />}

        </>
    }

  </div>
)
}

export { ReturnCredentialDetails };
