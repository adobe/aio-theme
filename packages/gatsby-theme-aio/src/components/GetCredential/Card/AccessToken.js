import React from 'react';
import { css } from "@emotion/react";
import { Button } from '@adobe/react-spectrum';

const AccessToken = ({ accessToken }) => {
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
            <Button variant="accent">{accessToken?.buttonLabel}</Button>
          </div>
        }
      </div>}
    </>
  )
};

export { AccessToken }