import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Toast } from '../Toast';
import classNames from "classnames";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH, LinkOut, KeyIcon, CopyIcon } from './FormFields';
import { ReturnAccessToken } from './Return/ReturnAccessToken';
import { ProjectsDropdown } from './Return/ProjectsDropdown';
import { ReturnDevConsoleLink } from './Return/ReturnDevConsoleLink';
import { ReturnManageDeveloperConsole } from './Return/ReturnManageDeveloperConsole';
import ReturnClientDetails from './Return/ReturnClientDetails';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnProducts } from './Return/ReturnProducts';

const PreviousProject = ({ returnProps, returnFields, productList }) => {

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

              {returnClientDetails && <ReturnClientDetails returnClientDetails={returnClientDetails} />}

              {previousCredential?.credential?.map(({ key, value }, index) => {
                return (
                  <>
                    {value &&
                      <>
                        <div
                          css={css`
                              display:flex;
                              flex-direction:column;
                              gap:8px;
                            `}
                        >
                          <p className="spectrum-Body spectrum-Body--sizeS">{key}</p>
                          <div
                            css={css` 
                                display:flex;
                                align-items: center;
                                gap: 24px; 
                              `}>


                            {key === "Client secret" ?
                              <button class="spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM"
                                css={css`
                                    cursor : pointer;
                                    border: 1px solid var(--spectrum-global-color-gray-400);
                                    border-radius: 3px;
                                    padding: 3px 6px;
                                    height:32px;
                                    background :transparent;
                                  `}
                              >
                                <span class="spectrum-ActionButton-label">{value}</span>
                              </button> :
                              <p className="spectrum-Body spectrum-Body--sizeS"
                                css={css`
                                    font-family: Source Code Pro,Monaco,monospace;
                                    white-space: normal;
                                    overflow-wrap: anywhere;
                                    max-width: 300px;
                                  `}
                              >{value}</p>
                            }

                            {key !== "Client secret" &&

                              <div css={css`position:relative;display:${key === "Organization" ? "none" : "block"}`}>
                                <button className="spectrum-ActionButton spectrum-ActionButton--sizeM"
                                  onMouseEnter={() => setTooltipOpen(index)}
                                  onMouseLeave={handleLeave}
                                  onClick={() => handleCopy(value, index)}
                                  css={css`
                                    border: 1px solid var(--spectrum-global-color-gray-400);
                                    border-radius: 3px;
                                    padding: 3px 6px;
                                  `}
                                >
                                  {<span className="spectrum-ActionButton-label"><CopyIcon /></span>}
                                </button>

                              </div>

                            }

                          </div>
                        </div>
                      </>
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
