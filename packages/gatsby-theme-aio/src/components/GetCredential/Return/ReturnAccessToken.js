import React from 'react';
import { AccessToken } from '../Card/AccessToken';

const ReturnAccessToken = ({ returnAccessToken, credential }) => {
  return <AccessToken accessToken={returnAccessToken} credential={credential} />
}

export { ReturnAccessToken }
