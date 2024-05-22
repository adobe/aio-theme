import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Button } from '@adobe/react-spectrum';
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import { CopyIcon } from '../FormFields';

const AccessToken = ({ accessToken, token }) => {

  const [showtoken, setShowToken] = useState(false);

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
          {showtoken ? (
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
                {token}
              </p>
              <TooltipTrigger delay={0}>
                <ActionButton onPress={() => navigator.clipboard.writeText(token)}>
                  <CopyIcon />
                </ActionButton>
                <Tooltip>Copy</Tooltip>
              </TooltipTrigger>
            </div>
          ) : (
            accessToken?.buttonLabel && (
              <div
                css={css`
                  width: fit-content;
                `}>
                <Button onPress={() => { setShowToken(true) }} variant="accent">
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
