import React, { useContext, useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Toast } from '../Toast';
import classNames from "classnames";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH, LinkOut, KeyIcon } from './FormFields';
import { ReturnAccessToken } from './Return/ReturnAccessToken';
import { ProjectsDropdown } from './Return/ProjectsDropdown';
import { ReturnDevConsoleLink } from './Return/ReturnDevConsoleLink';
import { ReturnManageDeveloperConsole } from './Return/ReturnManageDeveloperConsole';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnProducts } from './Return/ReturnProducts';
import { ReturnAPIKey } from './Return/ReturnAPIKey';
import { ReturnAllowedOrigins } from './Return/ReturnAllowedOrigins';
import { ReturnOrganizationName } from './Return/ReturnOrganizationName';
import GetCredentialContext from './GetCredentialContext';

const PreviousProject = ({ returnFields, productList }) => {

  const { getCredentialData, selectedOrganization } = useContext(GetCredentialContext);
  const returnProps = getCredentialData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isCopiedTooltip, setCopiedTooltip] = useState('');
  const [token, setToken] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [clientId, setClientId] = useState();

  const previousProjectsDetails = JSON.parse(localStorage.getItem("myCredential"));
  const previousProject = returnProps?.[PreviousProject];
  const projectsDropdown = returnFields?.[ProjectsDropdown];
  const returnAccessToken = returnFields?.[ReturnAccessToken];
  const returnDevConsoleLink = returnFields?.[ReturnDevConsoleLink];
  const returnManageDeveloperConsole = returnFields?.[ReturnManageDeveloperConsole];
  const returnCredentialDetails = returnFields?.[ReturnCredentialDetails];
  const returnClientId = returnFields?.[ReturnClientId];
  const returnClientSecret = returnFields?.[ReturnClientSecret];
  const returnScopes = returnFields?.[ReturnScopes];
  const returnAPIKey = returnFields?.[ReturnAPIKey];
  const returnOrganizationName = returnFields?.[ReturnOrganizationName];
  const returnAllowedOrigins = returnFields?.[ReturnAllowedOrigins];

  const response = previousProjectsDetails?.[selectedIndex]?.credential;

  useEffect(() => {

    const generateToken = async () => {

      const secretsUrl = `/console/api/organizations/${response?.OrgId}/integrations/${response?.ClientId}/secrets`;
      const token = window.adobeIMS?.getTokenFromStorage()?.token;
      const secretsResponse = await fetch(secretsUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-api-key': window.adobeIMS?.adobeIdData?.client_id,
        },
      });

      const secrets = await secretsResponse.json();
      setClientId(secrets?.client_id)

      const secret = secrets.client_secrets[0].client_secret;
      setClientSecret(secret);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: response?.APIKey,
          client_secret: secret,
          grant_type: 'client_credentials',
          scope: 'openid, AdobeID, read_organizations, ff_apis, firefly_api',
        }),
      };

      const tokenResponse = await fetch('/ims/token/v3', options);
      const tokenJson = await tokenResponse.json();
      setToken(tokenJson.access_token);

    };
    generateToken();

  }, [selectedIndex]);

  return (
    <>
      <div
        className={classNames(previousProject?.className)}
        css={css`
          display : flex;
          flex-direction : column;
          gap:24px;
        `}>
        {previousProject?.title && <h3 className='spectrum-Heading spectrum-Heading--sizeM'>{previousProject?.title}</h3>}

        {previousProject?.paragraph && <p className="spectrum-Body spectrum-Body--sizeL">{previousProject?.paragraph}</p>}

        {returnManageDeveloperConsole && <ReturnManageDeveloperConsole returnManageDeveloperConsole={returnManageDeveloperConsole} />}

        {projectsDropdown && <ProjectsDropdown projectsDropdown={projectsDropdown} previousProjectsDetails={previousProjectsDetails} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />}

        {/* ----------- credential form ------------  */}

        <div
          css={css`
            background: white;
            border-radius: 8px;
            width: 90%;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              width:100%;
            }

          `}
        >
          <div
            css={css`
              padding: 5%;
              display:flex;
              flex-direction:column;
              gap:24px;
              border: 1px solid var(--spectrum-global-color-gray-200);
              border-radius: 8px;
            `}
          >
            <div
              css={css`
                  display:flex;
                  gap:20px;
                  align-items:flex-start;
                  position : relative;
                `}
            >
              <KeyIcon />
              <div
                css={css`
                    display : flex ;
                    flex-direction : column;
                    gap: 8px;
                  `}
              >
                <h3 className="spectrum-Heading spectrum-Heading--sizeM">
                  {previousProjectsDetails?.[selectedIndex].name}
                </h3>

                {productList && <ReturnProducts productList={productList} />}

              </div>
            </div>

            <hr
              css={css`
                  margin:0;
                  border: none;
                  border-top: 1px solid #D0D0D0 !important;
                `}
            />
            <div
              css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 32px;
                `}
            >

              {returnAccessToken && <ReturnAccessToken returnAccessToken={returnAccessToken} credential={previousProjectsDetails?.[selectedIndex]} token={token} />}

              {returnDevConsoleLink && <ReturnDevConsoleLink returnDevConsoleLink={returnDevConsoleLink} previousProjectsDetails={previousProjectsDetails} selectedIndex={selectedIndex} />}

              {returnCredentialDetails && (
                <ReturnCredentialDetails
                  returnCredentialDetails={returnCredentialDetails}
                  returnClientId={returnClientId}
                  returnClientSecret={returnClientSecret}
                  returnOrganizationName={returnOrganizationName}
                  returnScopes={returnScopes}
                  apiKey={response?.["APIKey"]}
                  allowedOrigins={response?.['AllowedOrigins']}
                  organization={selectedOrganization}
                  returnAPIKey={returnAPIKey}
                  returnAllowedOrigins={returnAllowedOrigins}
                  clientSecret={clientSecret}
                  clientId={clientId}
                />)}

              <div
                css={css`
                    display:flex;
                    gap:24px;
                    align-items: end;

                    @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                      flex-direction:column;
                      align-items:start;
                    }
                  `}
              >
                <a href="/credentials/nextsteps" target="_blank" rel="noreferrer">
                  <button
                    className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
                    css={css`width:fit-content;margin-top:10px`}>
                    <span className="spectrum-Button-label">Next steps</span>
                  </button>
                </a>
                <a href="/console/project" target="_blank" rel="noreferrer"
                  css={css`
                      color: var(--spectrum-global-color-gray-800);
                      margin: 2px 0;
                      &:hover {
                        color: var(--spectrum-global-color-gray-900);
                      }
                    `}
                >
                  <div css={css`display:flex;`}>
                    <div>Manage on Developer Console</div>
                    <div css={
                      css`
                        margin-left:10px;
                        @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                          display:none;
                        }
                      }`
                    }><LinkOut /></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      {isCopiedTooltip && <Toast variant='success' message="Copied to clipboard" disable={1000} customDisableFunction={setCopiedTooltip} />}
    </>

  )
};

export { PreviousProject };
