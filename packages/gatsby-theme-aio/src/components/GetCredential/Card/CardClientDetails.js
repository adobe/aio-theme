import React from 'react'
import { css } from "@emotion/react";
import { CardAPIKey } from './CardAPIKey';
import { CardClientId } from './CardClientId';
import { CardAllowedOrigins } from './CardAllowedOrigins';
import { CardClientSecret } from './CardClientSecret';
import { CardOrganizationName } from './CardOrganizationName';
import { CardScopes } from './CardScopes';

const CardClientDetails = ({ cardClientDetails, cardClientId, cardClientSecret, cardOrganizationName, cardScopes, apiKey, allowedOrigins, organization, cardAPIKey, cardAllowedOrigins }) => {
  return (
    <div css={css`
          display : flex;
          flex-direction : column;
          gap: 32px;
        `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{cardClientDetails?.heading}</h4>
      {cardAPIKey && <CardAPIKey cardClientDetails={cardClientDetails} cardAPIKey={cardAPIKey} apiKey={apiKey} />}
      {cardClientId && <CardClientId cardClientDetails={cardClientDetails} cardClientId={cardClientId} />}
      {cardAllowedOrigins && <CardAllowedOrigins cardClientDetails={cardClientDetails} allowedOrigins={allowedOrigins} cardAllowedOrigins={cardAllowedOrigins} />}
      {cardClientSecret && <CardClientSecret cardClientDetails={cardClientDetails} cardClientSecret={cardClientSecret} />}
      {cardOrganizationName && <CardOrganizationName cardClientDetails={cardClientDetails} cardOrganizationName={cardOrganizationName} organization={organization} />}
      {cardScopes && <CardScopes cardClientDetails={cardClientDetails} cardScopes={cardScopes} />}
    </div>
  )
}

export { CardClientDetails }