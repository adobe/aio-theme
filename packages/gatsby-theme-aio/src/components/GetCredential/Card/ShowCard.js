import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { CopyIcon } from '../Icons';
import { ActionButton } from "../../ActionButton";
import { ProgressCircle } from "../../ProgressCircle";
import { Toast } from '../../Toast';
import GetCredentialContext from '../GetCredentialContext';
import { getCredentialSecrets } from '../Service';

const ShowCard = ({
  heading,
  value,
  isClientSecret,
  buttonLabel,
  isOraganization,
  response
}) => {

  const [showClientSecret, setShowClientSecret] = useState(null);
  const [isCopiedTooltip, setIsCopiedTooltip] = useState(false);
  const [isHoveringCopyButton, setIsHoveringCopyButton] = useState(false);
  const { selectedOrganization } = useContext(GetCredentialContext);

  const handleCreateClientSecret = async () => {
    setShowClientSecret('loading');
    const secrets = await getCredentialSecrets(response, selectedOrganization);
    navigator.clipboard.writeText(secrets?.clientSecret);
    setShowClientSecret(secrets);
  };

  const handleSecretCopyCode = (copiedVal) => {
    setIsCopiedTooltip(true);
    navigator.clipboard.writeText(copiedVal);
    setTimeout(() => setIsCopiedTooltip(false), 1000); // Hide tooltip after 1 second
  }

  useEffect(() => {
    setShowClientSecret(null);
  }, [response]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
        button {
          cursor: pointer !important;
        }
      `}>
      <p className="spectrum-Body spectrum-Body--sizeS">{heading}</p>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 24px;
        `}>
        {isClientSecret && (
          showClientSecret === null ? (
            <div onClick={() => { handleCreateClientSecret() }}
              css={css`
                & > button {
                  border: 1px solid rgba(177, 177, 177) !important;
                  padding: 4px !important;
                  border-radius: 2px !important;
                }
              `}>
              <ActionButton>{buttonLabel}</ActionButton>
            </div>
          ) : showClientSecret === 'loading' ? (
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
                `}>
                {showClientSecret?.clientSecret}
              </p>
              <div
                css={css`
                  position: relative;
                `}>
                <div onMouseEnter={() => setIsHoveringCopyButton(true)}
                  css={css`
                    & > button {
                      border: 1px solid rgba(177, 177, 177) !important;
                      padding: 4px !important;
                      border-radius: 2px !important;
                    }
                  `}
                  onMouseLeave={() => setIsHoveringCopyButton(false)} onClick={() => { handleSecretCopyCode(showClientSecret?.clientSecret) }}>
                  <ActionButton > <CopyIcon /> </ActionButton>
                </div>
                {isHoveringCopyButton && (
                  <div
                    className="spectrum-Tooltip spectrum-Tooltip--top is-open"
                    css={css`
                      position: absolute;
                      top: -25px; 
                      transform: translateX(-50%);
                      width: 40px;
                      left: -5px;
                    `}
                  >
                    <div className="spectrum-Tooltip-label">Copy</div>
                    <div className="spectrum-Tooltip-tip"></div>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {value && (
          <p
            className="spectrum-Body spectrum-Body--sizeS"
            css={css`
              font-family: Source Code Pro, Monaco, monospace;
              white-space: normal;
              overflow-wrap: anywhere;
              max-width: 300px;
            `}>
            {value}
          </p>
        )}

        {!isClientSecret && (
          <div
            onMouseEnter={() => setIsHoveringCopyButton(true)}
            onMouseLeave={() => setIsHoveringCopyButton(false)}
            css={css`
              position: relative;
              display: ${isOraganization ? 'none' : 'block'};
            `}>
            <div onClick={() => { handleSecretCopyCode(value) }}
              css={css`
                & > button {
                  border: 1px solid rgba(177, 177, 177) !important;
                  padding: 4px !important;
                  border-radius: 2px !important;
                }
              `}
            >
              <ActionButton> <CopyIcon /> </ActionButton>
            </div>
            {isHoveringCopyButton && (
              <div
                className="spectrum-Tooltip spectrum-Tooltip--top is-open"
                css={css`
                  position: absolute;
                  top: -25px; 
                  transform: translateX(-50%);
                  width: 40px;
                  left: -5px;
                `}
              >
                <div className="spectrum-Tooltip-label">Copy</div>
                <div className="spectrum-Tooltip-tip"></div>
              </div>
            )}
          </div>
        )}
      </div>
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
    </div>
  );
};

export default ShowCard;
