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

const COMPONENT_MAP = {
  "ReturnAPIKey": ReturnAPIKey,
  "ReturnAllowedOrigins": ReturnAllowedOrigins,
  "ReturnClientId": ReturnClientId,
  "ReturnClientSecret": ReturnClientSecret,
  "ReturnOrganizationName": ReturnOrganizationName,
  "ReturnScopes": ReturnScopes,
  "CardImsOrgID": CardImsOrgID
};

const ReturnCredentialDetails = ({
  clientDetails,
  apiKeyDetails,
  clientIdDetails,
  clientSecretDetails,
  organizationDetails,
  scopesDetails,
  allowedOriginsDetails,
  organizationName,
  allowedOrigins,
  response,
  imsOrgID,
  returnFields
}) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  const returnCompDetails = {
    "ReturnAPIKey": {
      heading: apiKeyDetails?.heading,
      apiKey: response?.workspaces[0]?.credentials[0]?.clientId,
    },
    "ReturnAllowedOrigins": {
      heading: allowedOrigins?.heading,
      allowedOrigins: allowedOriginsDetails,
    },
    "ReturnClientId": {
      heading: clientIdDetails?.heading,
      clientId: response?.workspaces[0]?.credentials[0]?.clientId,
    },
    "ReturnClientSecret": {
      returnClientSecret: clientSecretDetails,
      response
    },
    "ReturnOrganizationName": {
      heading: organizationDetails?.heading,
      organization: organizationName?.name
    },
    "ReturnScopes": {
      heading: scopesDetails?.heading,
      scope: scopesDetails?.scope
    },
    "CardImsOrgID": {
      heading: imsOrgID?.heading,
      imsOrgId: selectedOrganization?.code
    }
  };

  return (
    <div css={css`
        display : flex;
        flex-direction : column;  
        gap: 32px;
      `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{clientDetails?.heading}</h4>
      {returnFields?.[ReturnCredentialDetails]?.children.map(({ type }, index) => {
        const Component = COMPONENT_MAP[type?.name];
        return Component ? <Component key={index} val={returnCompDetails[type?.name]} /> : null;
      })}
    </div>
  );
};

export { ReturnCredentialDetails };
