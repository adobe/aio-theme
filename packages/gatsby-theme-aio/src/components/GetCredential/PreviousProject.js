import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH, MIN_TABLET_SCREEB_WIDTH, LinkOut, KeyIcon, CopyIcon } from './FormFields';
import { Picker } from "../Picker";
import { Toast } from '../Toast';
import CustomPopover from './CustomPopover';
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import classNames from "classnames";

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
                  {/* {formData['CredentialName']} */} {previousProjectsDetails[selectedIndex].name}
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


const ProjectsDropdown = ({ projectsDropdown, previousProjectsDetails, selectedIndex, setSelectedIndex }) => {

  return (

    <div
      css={css`
        display : flex;
        flex-direction : column;
        gap:2px;
    `}
    >
      <p className="spectrum-Body spectrum-Body--sizeS" css={css`color: #464646`}>{projectsDropdown?.label} </p>
      <div
        css={css`
                  
          & > div > .spectrum-Picker {
            width: 100% !important;
            height: 20px;
          }

          & > div > div {
            width: 22%;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_MOBILE_WIDTH}){
              width: 82%;
              left: 15%;
            }

            @media screen and (min-width:${MIN_TABLET_SCREEB_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              width: 91%;
              left: 7%;
            }

          }

          & > div > .spectrum-Picker-popover > ul > li > div > div {
            margin : 0 ;
          }

          & > div > .spectrum-Picker-popover > ul > li > div > div > svg {
            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              margin: 3px;
              padding: 0;
            }
          }

            padding: 8px;
            border-radius: 3px;
            border: 1px solid #909090 !important;
            width: 400px;

          ` }
      >
        <Picker
          isQuiet
          items={previousProjectsDetails.map((organs, k) => {
            return {
              title: organs?.name,
              selected: k === selectedIndex
            }
          })}
          onChange={(index) => {
            setSelectedIndex(index);
          }}
        />
      </div>
      <p className="spectrum-Body spectrum-Body--sizeS" css={css`color: #464646`}>{projectsDropdown?.subHeading}</p>
    </div>
  )
}

const ReturnAccessToken = ({ returnAccessToken }) => {
  return (
    <div css={css`
      display : flex;
      flex-direction : column;
      gap:16px;
    `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnAccessToken?.heading}</h4>
      <button css={css`width: 180px;`} className="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM">
        <span className="spectrum-Button-label">{returnAccessToken?.buttonLabel}</span>
      </button>
    </div>
  )
}

const ReturnDevConsoleLink = ({ previousProjectsDetails, returnDevConsoleLink, selectedIndex }) => {
  return (
    <div css={css`
      display : flex;
      flex-direction : column;
      gap:16px;
    `}>
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnDevConsoleLink?.heading}</h4>

      <div css={css`display:flex;`}>
        <div>
          <p className="spectrum-Body spectrum-Body--sizeS"
            css={css`
            font-family: Source Code Pro,Monaco,monospace;
            white-space: normal;
            overflow-wrap: anywhere;
            max-width: 300px;
            color: #0265DC;
          `}
          >{previousProjectsDetails[selectedIndex].name}</p></div>
        <div css={
          css`
            margin-left:10px;
            cursor : pointer;
            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              display:none;
            }
          }`
        }><LinkOut /></div>
      </div>
    </div>
  )
}

const ReturnProducts = ({ productList }) => {
  return (

    <div
      css={css`
        display : flex;
        gap : 10px; 
        align-items : center;  
      `}
    >
      <ReturnProduct productList={productList} />
      <CustomPopover productList={productList} />
    </div>
  )
}

const ReturnProduct = ({ productList }) => {
  return (
    <>
      {productList.map((product, index) => {
        if (index < 2)
          return (
            <div
              css={css`
                & > button {
                  border : none !important;
                }
              `}
            >
              <TooltipTrigger delay={0}>
                <ActionButton aria-label="Edit Name">
                  <img
                    src={product?.icon}
                    css={css`
                      width: 35px;
                      cursor : pointer;
                    `}
                  />
                </ActionButton>
                <Tooltip>{product?.label}</Tooltip>
              </TooltipTrigger>
            </div>
          )
      })}
    </>
  )
}

const ReturnManageDeveloperConsole = ({ returnManageDeveloperConsole }) => {
  return (
    <div>
      <div css={css`display:flex;`}>
        <a href={returnManageDeveloperConsole?.direction} target="_blank" rel="noreferrer"
          css={css`
            color:#0265DC;
          `}
        >
          {returnManageDeveloperConsole?.label}
        </a>
        <div css={
          css`
            margin-left:10px;
            cursor : pointer;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              display:none;
            }
          
            & > svg > path{
              fill : #0265DC !important;
            }
          `
        }><LinkOut /></div>
      </div>
    </div>
  )
}

const ReturnClientDetails = ({ returnClientDetails }) => {
  return (
    <div>
      <ReturnAPIKey returnClientDetails={returnClientDetails} />
      <ReturnAllowedOrigins returnClientDetails={returnClientDetails} />
      <ReturnClientId returnClientDetails={returnClientDetails} />
      <ReturnClientSecret returnClientDetails={returnClientDetails} />
      <ReturnOrganizationName returnClientDetails={returnClientDetails} />
      <ReturnScopes returnClientDetails={returnClientDetails} />
      <h4 className="spectrum-Heading spectrum-Heading--sizeS">{returnClientDetails?.heading}</h4>
    </div>
  )
}

const ReturnAPIKey = ({ returnClientDetails }) => {
  return (
    <></>
  )
}

const ReturnAllowedOrigins = ({ returnClientDetails }) => {
  return (
    <></>
  )
}

const ReturnClientId = ({ returnClientDetails }) => {
  return (
    <></>
  )
}

const ReturnClientSecret = ({ returnClientDetails }) => {
  return (
    <></>
  )
}

const ReturnScopes = ({ returnClientDetails }) => {
  return (
    <></>
  )
}

const ReturnOrganizationName = ({ returnClientDetails }) => {
  return (
    <></>
  )
}

export { PreviousProject, ProjectsDropdown, ReturnAccessToken, ReturnDevConsoleLink, ReturnProducts, ReturnProduct, ReturnManageDeveloperConsole, ReturnClientId, ReturnClientSecret, ReturnScopes, ReturnOrganizationName, ReturnClientDetails, ReturnAPIKey, ReturnAllowedOrigins };
