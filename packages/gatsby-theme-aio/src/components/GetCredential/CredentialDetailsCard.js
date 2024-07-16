import React from 'react';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { css } from '@emotion/react';
import { AccessToken } from './Card/AccessToken';
import { DevConsoleLink } from './Card/DevConsoleLink';
import { CardClientDetails } from './Card/CardClientDetails';
import { CardClientId } from './Card/CardClientId';
import { CardClientSecret } from './Card/CardClientSecret';
import { CardOrganizationName } from './Card/CardOrganizationName';
import { CardScopes } from './Card/CardScopes';
import { CardAPIKey } from './Card/CardAPIKey';
import { CardAllowedOrigins } from './Card/CardAllowedOrigins';
import { ReturnAccessToken } from './Return/ReturnAccessToken';
import { ReturnDevConsoleLink } from './Return/ReturnDevConsoleLink';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnAPIKey } from './Return/ReturnAPIKey';
import { ReturnAllowedOrigins } from './Return/ReturnAllowedOrigins';
import { ReturnOrganizationName } from './Return/ReturnOrganizationName';
import { KeyIcon, LinkOut } from './Icons';

export const CredentialDetailsCard = ({
  credentialName,
  productList,
  ProductComponent,
  AccessTokenComponent,
  DevConsoleLinkComponent,
  ClientDetailsComponent,
  allowedOriginsDetails,
  organizationName,
  nextButtonLink,
  nextButtonLabel,
  devConsoleLink,
  developerConsoleManage,
  response,
  myCredentialFields,
  returnFields
}) => {

  let accessToken, devConsoleLinkHeading, clientDetails, clientIdDetails, clientSecretDetails, organizationDetails, scopesDetails, apiKeyDetails, allowedOrigins
  if (myCredentialFields) {
    accessToken = myCredentialFields[AccessToken];
    devConsoleLinkHeading = myCredentialFields[DevConsoleLink]?.heading;
    clientDetails = myCredentialFields[CardClientDetails];
    clientIdDetails = myCredentialFields[CardClientId];
    clientSecretDetails = myCredentialFields[CardClientSecret];
    organizationDetails = myCredentialFields[CardOrganizationName];
    scopesDetails = myCredentialFields[CardScopes];
    apiKeyDetails = myCredentialFields[CardAPIKey];
    allowedOrigins = myCredentialFields[CardAllowedOrigins];
  }
  else if (returnFields) {
    accessToken = returnFields?.[ReturnAccessToken];
    devConsoleLinkHeading = returnFields?.[ReturnDevConsoleLink]?.heading;
    clientDetails = returnFields?.[ReturnCredentialDetails];
    clientIdDetails = returnFields?.[ReturnClientId];
    clientSecretDetails = returnFields?.[ReturnClientSecret];
    scopesDetails = returnFields?.[ReturnScopes];
    apiKeyDetails = returnFields?.[ReturnAPIKey];
    organizationDetails = returnFields?.[ReturnOrganizationName];
    allowedOrigins = returnFields?.[ReturnAllowedOrigins];
  }

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
            {accessToken && <AccessTokenComponent accessToken={accessToken} response={response} scopesDetails={scopesDetails} />}

            {devConsoleLinkHeading && (
              <DevConsoleLinkComponent
                devConsoleLinkHeading={devConsoleLinkHeading}
                credentialName={credentialName}
                projectId={response?.projectId ? response?.projectId : response?.id}
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
                allowedOrigins={allowedOrigins}
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
              {nextButtonLabel &&
                <a href={nextButtonLink} target="_blank" rel="noreferrer">
                  <button
                    className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
                    css={css`
                    width: fit-content;
                    margin-top: 10px;
                  `}>
                    <span className="spectrum-Button-label">{nextButtonLabel}</span>
                  </button>
                </a>}
              {developerConsoleManage &&
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
                    <div className='spectrum-Body spectrum-Body--sizeS'>{developerConsoleManage}</div>
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
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
