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
import ReturnClientDetails from './Return/ReturnClientDetails';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnProducts } from './Return/ReturnProducts';
import { ReturnAPIKey } from './Return/ReturnAPIKey';
import { ReturnAllowedOrigins } from './Return/ReturnAllowedOrigins';
import { ReturnOrganizationName } from './Return/ReturnOrganizationName';
import GetCredentialContext from './GetCredentialContext';

const PreviousProject = ({ returnFields, productList }) => {
  const { getCredentialData } = useContext(GetCredentialContext);
  const returnProps = getCredentialData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTooltipOpen, setTooltipOpen] = useState(null);
  const [isCopiedTooltip, setCopiedTooltip] = useState('');
  const [previousCredential, setPreviousCredentials] = useState({})

  const previousProjectsDetails = JSON.parse(localStorage.getItem("myCredential"));
  const previousProject = returnProps?.[PreviousProject];
  const projectsDropdown = returnFields?.[ProjectsDropdown];
  const returnAccessToken = returnFields?.[ReturnAccessToken];
  const returnDevConsoleLink = returnFields?.[ReturnDevConsoleLink];
  const returnManageDeveloperConsole = returnFields?.[ReturnManageDeveloperConsole];
  const returnClientDetails = returnFields?.[ReturnClientDetails];
  const returnClientId = returnFields?.[ReturnClientId];
  const returnClientSecret = returnFields?.[ReturnClientSecret];
  const returnScopes = returnFields?.[ReturnScopes];

  const filterSelectedProject = previousProjectsDetails?.filter((data, index) => selectedIndex === index);

  useEffect(() => {
    setPreviousCredentials(filterSelectedProject[0])
  }, [selectedIndex])

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedTooltip(true);
  };

  const handleLeave = () => {
    setTooltipOpen(null);
  };

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
                  {previousProjectsDetails[selectedIndex].name}
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

              {returnAccessToken && <ReturnAccessToken returnAccessToken={returnAccessToken} />}

              {returnDevConsoleLink && <ReturnDevConsoleLink returnDevConsoleLink={returnDevConsoleLink} previousProjectsDetails={previousProjectsDetails} selectedIndex={selectedIndex} />}

              {returnClientDetails && <ReturnClientDetails returnClientDetails={returnClientDetails} returnClientId={returnClientId} returnClientSecret={returnClientSecret} returnScopes={returnScopes} apiKey={response["apiKey"]} allowedOrigins={formData['AllowedOrigins']} />}

              {previousCredential?.credential?.map(({ key, value }, index) => {
                return (
                  <>
                    {value && key == "API Key" &&
                      <ReturnAPIKey credentialKey={key} value={value} index={index} setTooltipOpen={setTooltipOpen} handleLeave={handleLeave} handleCopy={handleCopy} />
                    }
                    {value && key == "Allowed domains" &&
                      <ReturnAllowedOrigins credentialKey={key} value={value} index={index} setTooltipOpen={setTooltipOpen} handleLeave={handleLeave} handleCopy={handleCopy} />
                    }
                    {value && key == "Organization" &&
                      <ReturnOrganizationName credentialKey={key} value={value} index={index} setTooltipOpen={setTooltipOpen} handleLeave={handleLeave} handleCopy={handleCopy} />
                    }
                  </>
                )
              })}
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
