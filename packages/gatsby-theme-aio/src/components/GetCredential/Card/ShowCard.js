import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { CopyIcon } from '../Icons';
import { ActionButton, ProgressCircle, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
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
  const { selectedOrganization } = useContext(GetCredentialContext);

  const handleCreateClientSecret = async () => {
    setShowClientSecret('loading');
    const secrets = await getCredentialSecrets(response, selectedOrganization);
    navigator.clipboard.writeText(secrets?.clientSecret);
    setShowClientSecret(secrets);
  };

  const handleSecretCopyCode = (copiedVal) => {
    setIsCopiedTooltip(true)
    navigator.clipboard.writeText(copiedVal);
  }

  useEffect(() => {
    setShowClientSecret(null)
  }, [response])

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
            <ActionButton
              onPress={() => { handleCreateClientSecret() }} data-cy="retrieve-client-secret">
              {buttonLabel}
            </ActionButton>
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
              <TooltipTrigger delay={0}>
                <ActionButton onPress={() => handleSecretCopyCode(showClientSecret?.clientSecret)}  data-cy="copy-client-secret">
                  <CopyIcon />
                </ActionButton>
                <Tooltip>Copy</Tooltip>
              </TooltipTrigger>
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
            css={css`
              position: relative;
              display: ${isOraganization ? 'none' : 'block'};
            `}>
            <TooltipTrigger delay={0}>
              <ActionButton onPress={() => handleSecretCopyCode(value)} data-cy={`${heading}-copyIcon`}>
                <CopyIcon />
              </ActionButton>
              <Tooltip>Copy</Tooltip>
            </TooltipTrigger>
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
