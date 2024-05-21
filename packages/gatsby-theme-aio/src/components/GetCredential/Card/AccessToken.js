import React from 'react';
import { css } from "@emotion/react";
import { Button } from '@adobe/react-spectrum';

const AccessToken = ({ accessToken, credential }) => {
  const generateToken = async () => {
    const secretsUrl = `/console/api/organizations/048F5DE85620B4D87F000101@AdobeOrg/integrations/177756/secrets`;
    const token = window.adobeIMS?.getTokenFromStorage()?.token;
    const secretsResponse = await fetch(secretsUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-api-key': window.adobeIMS?.adobeIdData?.client_id,
      }
    });

    const secrets = await secretsResponse.json();
    const secret = secrets.client_secrets[0].client_secret;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: '6aee704f37524a1f985bb06cdf40a612',
        client_secret: secret,
        grant_type: 'client_credentials',
        scope: 'openid, AdobeID, read_organizations, ff_apis, firefly_api'
      })
    };
    
    const tokenResponse = await fetch('/ims/token/v3', options);
    const tokenJson = await tokenResponse.json();
    console.log(tokenJson.access_token);
  }

  return (
    <>
      {accessToken && <div css={css`
        display : flex;
        flex-direction : column;
        gap:16px;
      `}>
        {accessToken?.heading && <h4 className="spectrum-Heading spectrum-Heading--sizeS">{accessToken?.heading}</h4>}
        {accessToken?.buttonLabel &&
          <div css={css`width:fit-content`}>
            <Button onPress={generateToken} variant="accent">{accessToken?.buttonLabel}</Button>
          </div>
        }
      </div>}
    </>
  )
};

export { AccessToken }