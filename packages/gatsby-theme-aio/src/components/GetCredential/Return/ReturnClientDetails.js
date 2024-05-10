import React from 'react';
import { css } from "@emotion/react";
import { ReturnAPIKey } from './ReturnAPIKey';
import { ReturnAllowedOrigins } from './ReturnAllowedOrigins';
import { ReturnClientId } from './ReturnClientId';
import { ReturnClientSecret } from './ReturnClientSecret';
import { ReturnOrganizationName } from './ReturnOrganizationName';
import { ReturnScopes } from './ReturnScopes';

const ReturnClientDetails = ({ returnClientDetails }) => {
  return (
    <div>
      <ReturnAPIKey returnClientDetails={returnClientDetails} />
      <ReturnAllowedOrigins returnClientDetails={returnClientDetails} />
      <ReturnClientId returnClientDetails={returnClientDetails} />
      <ReturnClientSecret returnClientDetails={returnClientDetails} />
      <ReturnOrganizationName returnClientDetails={returnClientDetails} />
      <ReturnScopes returnClientDetails={returnClientDetails} />
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnClientDetails?.heading}</h4>
    </div>
  )
}

export { ReturnClientDetails };
