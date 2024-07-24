import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Picker } from '../Picker';
import GetCredentialContext from './GetCredentialContext';

const Organization = () => {

  const { allOrganizations, switchOrganization, selectedOrganization } = useContext(GetCredentialContext);

  const [selectedIndex, setSelectedIndex] = useState(allOrganizations.findIndex(org => org.id === selectedOrganization.id));
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    const underlay = document.querySelector('[data-testid="underlay"]');
    if (underlay) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenDialog]);

  const close = () => {
    setIsOpenDialog(false)
  }

  return (
    <>
      <span css={css`margin-left:10px;cursor:pointer;text-decoration:underline;`} onClick={() => setIsOpenDialog(true)}>Change organization</span>
      {isOpenDialog &&
        <div>
          <div data-testid="underlay" class="spectrum-Underlay spectrum-overlay is-open spectrum-overlay--open" aria-hidden="true" style="overflow: hidden;" />
          <div
            css={css`
              align-items: center;
              box-sizing: border-box;
              display: flex;
              height: var(--spectrum-visual-viewport-height);
              justify-content: center;
              left: 0;
              pointer-events: none;
              position: fixed;
              top: 0;
              transition: visibility 0s linear var(--spectrum-global-animation-duration-100, .13s);
              visibility: hidden;
              width: 100vw;
              z-index: 2;
              height: 100vh;
              --spectrum-visual-viewport-height: 552px;
            `}
          >
            <div className="spectrum-Modal is-open" data-testid="modal" css={css`background-color:white;z-index:2;position : absolute;`}>
              <section className="spectrum-Dialog spectrum-Dialog--medium spectrum-Dialog--confirmation" role="alertdialog" tabIndex="-1" aria-modal="true">
                <div className="spectrum-Dialog-grid">
                  <h1 className="spectrum-Dialog-heading spectrum-Dialog-heading--noHeader">Change organization</h1>
                  <hr className="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider" />
                  <section className="spectrum-Dialog-content">
                    <div
                      css={css`
                      display: flex;
                      flex-direction: column;
                      gap: 48px;
                    `}>
                      <div
                        css={css`
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                      `}>
                        <p
                          className="spectrum-Body spectrum-Body--sizeM"
                          css={css`
                          color: #222222;
                        `}>
                          You are currently in [
                          <span className="spectrum-Heading spectrum-Heading--sizeXS">
                            {allOrganizations[selectedIndex].name}
                          </span>
                          ].
                        </p>
                        <div
                          css={css`
                          width: 246px;
                        `}>
                          <div
                            css={css`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          `}>
                            <p
                              className="spectrum-Body spectrum-Body--sizeXS"
                              css={css`
                              color: #464646;
                            `}>
                              Choose organization
                            </p>
                            <p
                              className="spectrum-Body spectrum-Body--sizeL"
                              css={css`
                              padding-top: 3px;
                              color: #464646;
                            `}>
                              *
                            </p>
                          </div>
                          <div
                            css={css`
                            & > div > button {
                              width: 100%;
                              border-radius: 4px;
                            }

                            & > div > button > svg {
                              width: 10px;
                              height: 10px;
                            }

                            & > div > button {
                              path:nth-child(1) {
                                display: none;
                              }
                            }

                            & > div > div {
                              width: 246px;
                              max-height: 98px;

                              ul:nth-child(1) {
                                svg:nth-child(1) {
                                  width: 10px;
                                  height: 10px;
                                  margin-top: 7px;

                                  path:nth-child(1) {
                                    display: none;
                                  }
                                }
                              }
                            }

                            & > div > div > ul {
                              overflow-x: hidden !important;
                              overflow-y: scroll !important;
                            }

                            & > div > div > ul > li {
                              padding : 0 !important;
                            }

                            & > div > div > ul > li > div > div {
                              height: 20px !important;
                            }

                            & > div > div > ul > li > span > div > p {
                                  white-space: normal;
                                  overflow: visible;
                                  word-wrap: break-word;
                                  width: 185px;
                            }
                          `}>
                            <Picker
                              isQuiet={false}
                              items={allOrganizations.map((organization, k) => {
                                return {
                                  title: organization?.name,
                                  selected: k === selectedIndex,
                                  type: organization?.role === "DEVELOPER" ? 'Developer' : organization?.role === "ADMIN" ? 'System Administrator' : ""
                                };
                              })}
                              onChange={index => {
                                setSelectedIndex(index);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        css={css`
                          & > div {
                            display: flex;
                            justify-content: right;
                            gap: 12px;
                            button {
                              cursor: pointer;
                              margin: 0px !important;
                            }
                          }
                        `}>
                        <div className="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter" css={css` gap: 20px; padding-top:0; `} >


                          <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--outline spectrum-Button--secondary spectrum-ButtonGroup-item" onClick={close}>
                            <span className="spectrum-Button-label">Cancel</span>
                          </button>

                          <button className="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM" onClick={() => {
                            close();
                            switchOrganization(allOrganizations[selectedIndex]);
                          }}>
                            <span className="spectrum-Button-label">Change organization</span>
                          </button>

                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              </section>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export { Organization };
