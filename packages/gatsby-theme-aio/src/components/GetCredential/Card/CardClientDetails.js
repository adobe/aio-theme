import React from 'react'
import { css } from "@emotion/react";
import { CardAPIKey } from './CardAPIKey';
import { CardClientId } from './CardClientId';
import { CardAllowedOrigins } from './CardAllowedOrigins';
import { CardClientSecret } from './CardClientSecret';
import { CardOrganizationName } from './CardOrganizationName';
import { CardScopes } from './CardScopes';

const CardClientDetails = ({ clientDetails, clientIdDetails, clientSecretDetails, organizationDetails, scopesDetails, apiKeyDetails, allowedOriginsDetails, organizationName, allowedOrigins, response }) => {

  return (
    <div css={css`
          display : flex;
          flex-direction : column;
          gap: 32px;
        `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading}</h4>
      {apiKeyDetails && <CardAPIKey cardClientDetails={clientDetails} cardAPIKey={apiKeyDetails} apiKey={response?.['apiKey']} />}
      {clientIdDetails && <CardClientId cardClientDetails={clientDetails} cardClientId={clientIdDetails} clientId={response?.['apiKey']} />}
      {allowedOrigins && <CardAllowedOrigins cardClientDetails={clientDetails} cardAllowedOrigins={allowedOrigins} allowedOrigins={allowedOriginsDetails} />}
      {clientSecretDetails && <CardClientSecret cardClientDetails={clientDetails} cardClientSecret={clientSecretDetails} response={response} />}
      {organizationDetails && <CardOrganizationName cardClientDetails={clientDetails} cardOrganizationName={organizationDetails} organization={organizationName?.name} />}
      {scopesDetails && <CardScopes cardClientDetails={clientDetails} cardScopes={scopesDetails} />}
    </div>
  )
}

export { CardClientDetails };
