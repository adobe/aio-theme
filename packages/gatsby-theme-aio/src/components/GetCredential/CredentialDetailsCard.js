import React from 'react';
import { KeyIcon, LinkOut, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { css } from '@emotion/react';

export const CredentialDetailsCard = ({
  credentialName,
  productList,
  ProductComponent,
  accessToken,
  AccessTokenComponent,
  token,
  devConsoleLinkHeading,
  DevConsoleLinkComponent,
  projectId,
  ClientDetailsComponent,
  clientDetails,
  clientIdDetails,
  clientSecretDetails,
  organizationDetails,
  scopesDetails,
  apiKeyDetails,
  allowedOriginsDetails,
  organizationName,
  apiKey,
  allowedOrigins,
  clientSecret,
  clientId,
  nextButtonLink,
  nextButtonLabel,
  devConsoleLink,
  developerConsoleManage,
  response
}) => {

  return (
    <>
      <div
        css={css`
          background: white;
          border-radius: 8px;
          width: 90%;

          @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
            width: 100%;
          }
        `}>
        <div
          css={css`
            padding: 5%;
            display: flex;
            flex-direction: column;
            gap: 24px;
            border: 1px solid var(--spectrum-global-color-gray-200);
            border-radius: 8px;
          `}>
          <div
            css={css`
              display: flex;
              gap: 20px;
              align-items: flex-start;
            `}>
            <KeyIcon />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
              `}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeM">{credentialName}</h3>
              <div
                css={css`
                  display: flex;
                  gap: 10px;
                  align-items: center;
                `}>
                {productList && <ProductComponent productList={productList} />}
              </div>
            </div>
          </div>

          <hr
            css={css`
              margin: 0;
              border: none;
              border-top: 1px solid #d0d0d0 !important;
            `}
          />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 32px;
            `}>
            {accessToken && <AccessTokenComponent accessToken={accessToken} token={token} response={response} />}

            {devConsoleLinkHeading && (
              <DevConsoleLinkComponent
                devConsoleLinkHeading={devConsoleLinkHeading}
                credentialName={credentialName}
                projectId={projectId}
              />
            )}

            {clientDetails && (
              <ClientDetailsComponent
                clientDetails={clientDetails}
                clientIdDetails={clientIdDetails}
                clientSecretDetails={clientSecretDetails}
                organizationDetails={organizationDetails}
                scopesDetails={scopesDetails}
                apiKeyDetails={apiKeyDetails}
                allowedOriginsDetails={allowedOriginsDetails}
                organizationName={organizationName}
                apiKey={apiKey}
                allowedOrigins={allowedOrigins}
                clientSecret={clientSecret}
                clientId={clientId}
                response={response}
              />
            )}

            <div
              css={css`
                display: flex;
                gap: 24px;
                align-items: end;

                @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
                  flex-direction: column;
                  align-items: start;
                }
              `}>
              <a href={nextButtonLink} target="_blank" rel="noreferrer">
                <button
                  className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
                  css={css`
                    width: fit-content;
                    margin-top: 10px;
                  `}>
                  <span className="spectrum-Button-label">{nextButtonLabel}</span>
                </button>
              </a>
              <a
                href={devConsoleLink}
                target="_blank"
                rel="noreferrer"
                css={css`
                  color: var(--spectrum-global-color-gray-800);
                  margin: 2px 0;
                  &:hover {
                    color: var(--spectrum-global-color-gray-900);
                  }
                `}>
                <div
                  css={css`
                    display: flex;
                  `}>
                  <div>{developerConsoleManage}</div>
                  <div
                    css={css`
                      margin-left:10px;
                      @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                        display:none;
                      }
                    }`}>
                    <LinkOut />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
