import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import classNames from "classnames";
import { SideContent } from './CredentialForm';
import { CopyIcon, downloadAndModifyZip, getOrganization, KeyIcon, LinkOut, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './CommonFields';

const MyCredential = ({
  credentialProps,
  setShowCreateForm,
  setShowCredential
}) => {

  const [isTooltipOpen, setTooltipOpen] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [organization, setOrganizationValue] = useState({});

  useEffect(() => {
    const OrgID = localStorage?.getItem('OrgID');
    if (OrgID) {
      setOrganizationValue(JSON.parse(atob(OrgID)))
    }
    else {
      getOrganization(setOrganizationValue);
    }
  }, [])

  const card = credentialProps.MyCredential;
  let domain;
  const apiKey = localStorage?.getItem('apiKey');
  if (apiKey !== "null" || apiKey !== null && apiKey) {
    domain = JSON.parse(atob(apiKey));
  }

  const { response, credentialName, Credential } = domain || {};

  const handleCopy = (value) => {
    setIsCopied(true);
    navigator.clipboard.writeText(value);
  };

  const handleRestart = () => {
    setShowCreateForm(true);
    setShowCredential(false);
    localStorage.removeItem('apiKey');
  }

  const handleLeave = () => {
    setTooltipOpen(null);
    setIsCopied(false)
  }

  return (
    <div
      className={classNames(card?.className)}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      {card?.title &&
        <h2
          className="spectrum-Heading spectrum-Heading--sizeL"
          css={css`
            font-weight:700;
            color:var(--spectrum-global-color-gray-900);
          `}
        >{card?.title}</h2>}
      {card?.paragraph &&
        <p
          className="spectrum-Body spectrum-Body--sizeL"
          css={css`
            width: 50%;
            color:var(--spectrum-global-color-gray-900);
            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}) {
              width: 100% ;
            }
          `}>
          {card?.paragraph}
        </p>
      }
      <p
        className="spectrum-Body spectrum-Body--sizeS"
        css={css`
          color:var(--spectrum-global-color-gray-900);
        `}
      >
        Download not working?
        <span
          css={css`
            margin-left: 10px;
            cursor:pointer;
            text-decoration:underline;
            color:rgb(0, 84, 182);
            &:hover {
              color: rgb(2, 101, 220);
            }
          `}
          onClick={() => downloadAndModifyZip(`/console/api/organizations/${organization?.id}/projects/${response.projectId}/workspaces/${response.workspaceId}/download`)}
        >
          Restart download
        </span>
      </p>
      <div
        css={css`
          display:flex;
          gap: 35px;
          
          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            flex-direction:column;
          }

        `}
      >
        <div
          css={css`
            display:flex;
            flex-direction : column;
            gap: 35px;
            width:50%;

            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              width:100%;
            }

          `}
        >
          <div
            css={css`
              background: white;
              border-radius: 10px;
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
                border-radius: 10px;
              `}
            >
              <div
                css={css`
                  display:flex;
                  gap:20px;
                  align-items:center;
                `}
              >
                <KeyIcon />
                <h3 className="spectrum-Heading spectrum-Heading--sizeM">{credentialName}</h3>
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
                {Credential?.map(({ key, value }, index) => {
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
                            <h4 className="spectrum-Heading spectrum-Heading--sizeS">{key}</h4>
                            <div
                              css={css` 
                                display:flex;
                                align-items: center;
                                gap: 24px; 
                              `}>
                              <p className="spectrum-Body spectrum-Body--sizeS"
                                css={css`
                                  font-family: Source Code Pro,Monaco,monospace;
                                  white-space: normal;
                                  overflow-wrap: anywhere;
                                  max-width: 300px;
                                `}
                              >{value}</p>

                              <div css={css`position:relative;display:${key === "Organization" ? "none" : "block"}`}>
                                <button className="spectrum-ActionButton spectrum-ActionButton--sizeM"
                                  onMouseEnter={() => setTooltipOpen(index)}
                                  onMouseLeave={handleLeave}
                                  onClick={() => handleCopy(value)}
                                  css={css`
                                    border: 1px solid var(--spectrum-global-color-gray-400);
                                    border-radius: 3px;
                                    padding: 3px 6px;
                                  `}
                                >
                                  <span className="spectrum-ActionButton-label"><CopyIcon /></span>
                                </button>

                                {isTooltipOpen === index && (
                                  <span
                                    className="spectrum-Tooltip spectrum-Tooltip--top is-open"
                                    css={css`
                                      position: absolute;
                                      bottom: 25px;
                                      top: unset;
                                      white-space: nowrap;
                                    `}
                                  >
                                    <span className="spectrum-Tooltip-label">{isCopied ? "Copied" : "Copy"}</span>
                                    <span className="spectrum-Tooltip-tip"></span>
                                  </span>
                                )}
                              </div>
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
                  <a href={card?.nextStepsHref}>
                    <button
                      className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
                      css={css`width:fit-content;margin-top:10px`}>
                      <span className="spectrum-Button-label">{card?.nextStepsLabel}</span>
                    </button>
                  </a>
                  <a href={card?.devConsoleDirection}
                    css={css`
                      color: var(--spectrum-global-color-gray-800);
                      &:hover {
                        color: var(--spectrum-global-color-gray-900);
                      }
                    `}
                  >{card?.developerConsoleManage}
                    <span css={
                      css`
                        margin-left:10px;
                        @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                          display:none;
                        }
                      }`
                    }><LinkOut /></span></a>
                </div>
              </div>
            </div>
          </div>
          <div
            css={css`
              display:flex;
              flex-direction:column;
              gap:8px;
              width: 80%;
            `}
          >
            <h4 className="spectrum-Heading spectrum-Heading--sizeXS"
              css={css`
                font-weight:700;
                color:var(--spectrum-global-color-gray-900);
              `}
            >Need another credential</h4>
            <p className="spectrum-Body spectrum-Body--sizeS">
              <span onClick={handleRestart}
                css={css`
                  color:var(--spectrum-global-color-gray-800);
                  text-decoration:underline;
                  cursor:pointer;
                  &:hover {
                    color:var(--spectrum-global-color-gray-900)
                  }
                `
                }>
                Restart and create a new credential
              </span>
            </p>
          </div>
        </div>
        {card?.children ? <SideContent sideContent={card?.children?.props?.children} /> : null}
      </div>
    </div>
  )
}

export { MyCredential }
