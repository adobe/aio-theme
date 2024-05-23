import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Button, ProgressCircle } from '@adobe/react-spectrum';
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import { CopyIcon, generateClientSecrets, generateToken } from '../FormFields';

const AccessToken = ({ accessToken, token, response }) => {

  const [showtoken, setShowToken] = useState(false);
  const [secretToken, setSecretToken] = useState()

  const handleGenerateToken = async () => {
    setShowToken(true);
    const secrets = await generateClientSecrets(response);
    if (secrets) {
      const tokenVal = await generateToken(response?.apiKey, secrets?.clientSecret);
      setSecretToken(tokenVal)
    }
  }

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
          {showtoken ?
            ( secretToken ?
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
                  {secretToken}
                </p>
                <TooltipTrigger delay={0}>
                  <ActionButton onPress={() => navigator.clipboard.writeText(token)}>
                    <CopyIcon />
                  </ActionButton>
                  <Tooltip>Copy</Tooltip>
                </TooltipTrigger>
              </div> : <ProgressCircle size="S" aria-label="Loading…" isIndeterminate />
            ) : (
              accessToken?.buttonLabel && (
                <div
                  css={css`
                  width: fit-content;
                `}>
                  <Button onPress={() => handleGenerateToken()} variant="accent">
                    {accessToken?.buttonLabel}
                  </Button>
                </div>
              )
            )}
        </div>
      )}
    </>
  );
};

export { AccessToken };
