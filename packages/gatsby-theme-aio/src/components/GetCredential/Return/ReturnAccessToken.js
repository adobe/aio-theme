import React from 'react';
import { AccessToken } from '../Card/AccessToken';

const ReturnAccessToken = ({ accessToken,response }) => {
  return <AccessToken accessToken={accessToken} response={response} />
}

export { ReturnAccessToken }
