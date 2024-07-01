import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button, ProgressCircle } from '@adobe/react-spectrum';
import GetCredentialContext from '../GetCredentialContext';
import { generateToken, getCredentialSecrets } from '../Service';

const AccessToken = ({ accessToken, response, scopesDetails }) => {

  const [credentialToken, setCredentialToken] = useState(null);
  const { selectedOrganization } = useContext(GetCredentialContext);

  const handleGenerateToken = async () => {
    setCredentialToken('loading');
    const secrets = await getCredentialSecrets(response, selectedOrganization);
    if (secrets) {
      let clientId = response?.workspaces ? response?.workspaces[0]?.credentials[0]?.clientId : response?.apiKey
      const tokenVal = await generateToken(clientId, secrets?.clientSecret, scopesDetails);
      navigator.clipboard.writeText(tokenVal);
      setCredentialToken(tokenVal);
    }
  };

  useEffect(() => {
    setCredentialToken(null);
  }, [response])

  return (
    <>
      {accessToken && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}>
          {accessToken?.heading && (
            <h4 className="spectrum-Heading spectrum-Heading--sizeS">{accessToken?.heading}</h4>
          )}
          {credentialToken === null ? (
            accessToken?.buttonLabel && (
              <div
                css={css`

                  width: fit-content;

                  & > button {
                    background-color : #0265dc !important;
                  }

                `}>
                <Button onPress={() => handleGenerateToken()} variant="accent">
                  {accessToken?.buttonLabel}
                </Button>
              </div>
            )
          ) : (
            credentialToken === 'loading' ? (
              <ProgressCircle size="S" aria-label="Loading…" isIndeterminate />
            ) :
              credentialToken && (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 16px;
                  `}>
                  <p
                    className="spectrum-Body spectrum-Body--sizeS"
                    css={css`
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      color: #000000;
                      width: 320px;
                    `}>
                    {credentialToken}
                  </p>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export { AccessToken };
