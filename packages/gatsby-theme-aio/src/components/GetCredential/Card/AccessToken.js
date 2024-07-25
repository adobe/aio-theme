import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { ProgressCircle } from "../../ProgressCircle";
import { Button } from "../../Button";
import { CopyIcon } from '../Icons';
import { Toast } from '../../Toast';
import GetCredentialContext from '../GetCredentialContext';
import { generateToken, getCredentialSecrets } from '../Service';
import { ActionButton } from '../../ActionButton';

const AccessToken = ({ accessToken, response, scopesDetails }) => {
  const [credentialToken, setCredentialToken] = useState(null);
  const { selectedOrganization } = useContext(GetCredentialContext);
  const [isCopiedTooltip, setIsCopiedTooltip] = useState(false);
  const [isHoveringCopyButton, setIsHoveringCopyButton] = useState(false);

  const handleGenerateToken = async () => {
    setCredentialToken('loading');
    const secrets = await getCredentialSecrets(response, selectedOrganization);
    if (secrets) {
      let clientId = response?.workspaces ? response?.workspaces[0]?.credentials[0]?.clientId : response?.apiKey;
      const tokenVal = await generateToken(clientId, secrets?.clientSecret, scopesDetails);
      navigator.clipboard.writeText(tokenVal);
      setCredentialToken(tokenVal);
    }
  };

  const handleSecretCopyCode = (copiedVal) => {
    setIsCopiedTooltip(true);
    navigator.clipboard.writeText(copiedVal);
    setTimeout(() => setIsCopiedTooltip(false), 1000); // Hide tooltip after 1 second
  };

  useEffect(() => {
    setCredentialToken(null);
  }, [response]);

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
                data-cy="generate-token"
                onClick={() => handleGenerateToken()}
                css={css`
                  width: fit-content;
                  & > button {
                    background-color : #0265dc !important;
                  }
                `}>
                <Button variant="accent" style="fill">
                  {accessToken?.buttonLabel}
                </Button>
              </div>
            )
          ) : (
            credentialToken === 'loading' ? (
              <ProgressCircle size="S" aria-label="Loading…" isIndeterminate />
            ) : (
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
                <div
                  data-cy="copy-token"
                  onClick={() => handleSecretCopyCode(credentialToken)}
                  css={css`
                    position: relative;
                    & > button {
                      border: 1px solid rgba(177, 177, 177) !important;
                      padding: 4px !important;
                      border-radius: 2px !important;
                    }
                  `}>
                  <ActionButton
                    onMouseEnter={() => setIsHoveringCopyButton(true)}
                    onMouseLeave={() => setIsHoveringCopyButton(false)}
                  >
                    <CopyIcon />
                  </ActionButton>
                  {isHoveringCopyButton && (
                    <div
                      className="spectrum-Tooltip spectrum-Tooltip--top is-open"
                      css={css`
                        position: absolute;
                        top: -30px;
                        transform: translateX(-50%);
                        background: #333;
                        color: #fff;
                        border-radius: 4px;
                        white-space: nowrap;
                        z-index: 10;
                      `}
                    >
                      <div className="spectrum-Tooltip-label">Copy</div>
                      <div className="spectrum-Tooltip-tip" ></div>
                    </div>
                  )}
                </div >
              </div >
            )
          )}
        </div >
      )}
      {
        isCopiedTooltip && (
          <Toast
            variant="success"
            message="Copied to clipboard"
            disable={1000}
            customDisableFunction={setIsCopiedTooltip}
          />
        )
      }
    </>
  );
};

export { AccessToken };
