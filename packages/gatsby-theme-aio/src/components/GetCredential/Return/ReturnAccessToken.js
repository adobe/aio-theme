import React from 'react';
import { AccessToken } from '../Card/AccessToken';

const ReturnAccessToken = ({ returnAccessToken, credential, token }) => {
  return <AccessToken accessToken={returnAccessToken} credential={credential} token={token} />
}

export { ReturnAccessToken }
