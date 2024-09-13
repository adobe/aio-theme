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

const COMPONENT_MAP = {
  "CardAPIKey": CardAPIKey,
  "CardAllowedOrigins": CardAllowedOrigins,
  "CardClientId": CardClientId,
  "CardClientSecret": CardClientSecret,
  "CardOrganizationName": CardOrganizationName,
  "CardScopes": CardScopes,
  "CardImsOrgID": CardImsOrgID
};

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
  imsOrgID,
  myCredentialFields
}) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  const cardCompDetails = {
    "CardAPIKey": {
      heading: apiKeyDetails?.heading,
      apiKey: response?.['apiKey']
    },
    "CardAllowedOrigins": {
      heading: allowedOrigins?.heading,
      allowedOrigins: allowedOriginsDetails,
    },
    "CardClientId": {
      heading: clientIdDetails?.heading,
      clientId: response?.['apiKey']
    },
    "CardClientSecret": {
      cardClientSecret: clientSecretDetails,
      response
    },
    "CardOrganizationName": {
      heading: organizationDetails?.heading,
      organization: organizationName?.name
    },
    "CardScopes": {
      heading: scopesDetails?.heading,
      scope: scopesDetails?.scope
    },
    "CardImsOrgID": {
      heading: imsOrgID?.heading,
      imsOrgId: selectedOrganization?.code
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 32px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading}</h4>
      {myCredentialFields?.[CardClientDetails]?.children.map(({ type }, index) => {
        const Component = COMPONENT_MAP[type?.name];
        return Component ? <Component key={index} val={cardCompDetails[type?.name]} /> : null;
      })}
    </div>
  );
};

export { CardClientDetails };
