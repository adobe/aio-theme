import React from 'react';
import { AccessToken } from '../Card/AccessToken';

const ReturnAccessToken = ({ accessToken,response, scopesDetails }) => {
  return <AccessToken accessToken={accessToken} response={response} scopesDetails={scopesDetails} />
}

export { ReturnAccessToken }
