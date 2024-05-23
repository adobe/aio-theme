import React from 'react';
import { AccessToken } from '../Card/AccessToken';

const ReturnAccessToken = ({ accessToken, token, response }) => {
  return <AccessToken accessToken={accessToken} token={token} response={response} />
}

export { ReturnAccessToken }
