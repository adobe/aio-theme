import React, { useContext } from 'react';
import { css } from "@emotion/react";
import { CardAPIKey } from './CardAPIKey';
import { CardClientId } from './CardClientId';
import { CardAllowedOrigins } from './CardAllowedOrigins';
import { CardClientSecret } from './CardClientSecret';
import { CardOrganizationName } from './CardOrganizationName';
import { CardScopes } from './CardScopes';
import { CardImsOrgID } from './CardImsOrgID';
import GetCredentialContext from '../GetCredentialContext';

const CardClientDetails = ({
  clientDetails,
  clientIdDetails,
  clientSecretDetails,
  organizationDetails,
  scopesDetails,
  apiKeyDetails,
  allowedOriginsDetails,
  organizationName,
  allowedOrigins,
  response,
  imsOrgID
}) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  const splitedOrderBy = clientDetails?.orderBy ? clientDetails?.orderBy?.split(',') : [];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 32px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading}</h4>

      {
        splitedOrderBy?.length > 0 ?
          <>
            {splitedOrderBy?.map((list) => {
              if (list === "APIKey") {
                return apiKeyDetails && <CardAPIKey cardClientDetails={clientDetails} cardAPIKey={apiKeyDetails} apiKey={response?.['apiKey']} />
              }
              if (list === "AllowedOrigins") {
                return allowedOrigins && <CardAllowedOrigins cardClientDetails={clientDetails} cardAllowedOrigins={allowedOrigins} allowedOrigins={allowedOriginsDetails} />
              }
              if (list === "ImsOrgID") {
                return imsOrgID && <CardImsOrgID cardClientDetails={clientDetails} cardImsOrgID={imsOrgID} imsOrgId={selectedOrganization?.code} />
              }
              if (list === "OrganizationName") {
                return organizationDetails && <CardOrganizationName cardClientDetails={clientDetails} cardOrganizationName={organizationDetails} organization={organizationName?.name} />
              }
              if (list === "ClientId") {
                return clientIdDetails && <CardClientId cardClientDetails={clientDetails} cardClientId={clientIdDetails} clientId={response?.['apiKey']} />
              }
              if (list === "ClientSecret") {
                return clientSecretDetails && <CardClientSecret cardClientDetails={clientDetails} cardClientSecret={clientSecretDetails} response={response} />
              }
              if (list === "Scopes") {
                return scopesDetails && <CardScopes cardClientDetails={clientDetails} cardScopes={scopesDetails} />
              }
            })}
          </>
          :
          <>
            {apiKeyDetails && (<CardAPIKey cardClientDetails={clientDetails} cardAPIKey={apiKeyDetails} apiKey={response?.['apiKey']} />)}
            {clientIdDetails && (<CardClientId cardClientDetails={clientDetails} cardClientId={clientIdDetails} clientId={response?.['apiKey']} />)}
            {allowedOrigins && (<CardAllowedOrigins cardClientDetails={clientDetails} cardAllowedOrigins={allowedOrigins} allowedOrigins={allowedOriginsDetails} />)}
            {clientSecretDetails && (<CardClientSecret cardClientDetails={clientDetails} cardClientSecret={clientSecretDetails} response={response} />)}
            {organizationDetails && (<CardOrganizationName cardClientDetails={clientDetails} cardOrganizationName={organizationDetails} organization={organizationName?.name} />)}
            {scopesDetails && <CardScopes cardClientDetails={clientDetails} cardScopes={scopesDetails} />}
            {imsOrgID && (<CardImsOrgID cardClientDetails={clientDetails} cardImsOrgID={imsOrgID} imsOrgId={selectedOrganization?.code} />)}
          </>
      }

    </div>
  );
};

export { CardClientDetails };
