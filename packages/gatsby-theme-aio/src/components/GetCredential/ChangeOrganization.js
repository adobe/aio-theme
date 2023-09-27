import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { getOrganization, MAX_MOBILE_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { Picker } from '../Picker'

const ChangeOrganization = ({ setModalOpen, redirectToBeta, setRedirectBetaProgram, setAlertShow, setOrganization, setOrganizationValue }) => {

  const [organization, setOrgans] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {

    const orgInfo = localStorage?.getItem('OrgInfo');
    getOrganization().then((data) => {
      setOrgans(data);
      data?.map((value, index) => {
        const orgData = JSON.parse(orgInfo);
        if (value?.id == orgData?.id) {
          setSelectedIndex(index)
        }
      })
    });

  }, []);

  const handleRedirect = () => {
    setAlertShow(true);
    handleModal()
  };

  const handleModal = () => {
    setRedirectBetaProgram(false);
    setModalOpen(false);
  };

  useEffect(() => {
    setOrganization(true);
    organization.forEach((organs, index) => {
      if (index === selectedIndex) {
        setOrganizationValue(organs)
        const orgData = {
          "id": organs?.id,
          "name": organs?.name,
          "orgLen": organization?.length,
          "type":organs?.type
        }
        localStorage.setItem('OrgInfo', JSON.stringify(orgData));
      }
    })
  }, [selectedIndex])

  return (
    <>
      {!redirectToBeta &&
        <div className="spectrum-Modal-wrapper spectrum-CSSExample-dialog"
          css={css`
            width: 100%;
            height: 100%;
            background-color: gray;
            visibility: visible;
          `}
        >
          {organization?.length === 0 ?
            <div className="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--large">
              <div className="spectrum-ProgressCircle-track"></div>
              <div className="spectrum-ProgressCircle-fills">
                <div className="spectrum-ProgressCircle-fillMask1">
                  <div className="spectrum-ProgressCircle-fillSubMask1">
                    <div className="spectrum-ProgressCircle-fill"></div>
                  </div>
                </div>
                <div className="spectrum-ProgressCircle-fillMask2">
                  <div className="spectrum-ProgressCircle-fillSubMask2">
                    <div className="spectrum-ProgressCircle-fill"></div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="spectrum-Modal is-open" data-testid="modal">
              <section className="spectrum-Dialog spectrum-Dialog--medium spectrum-Dialog--confirmation" role="alertdialog" tabIndex="-1" aria-modal="true"
                css={
                  css`
                    width: calc(var(--spectrum-dialog-confirm-large-width) - 60px);

                    @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_MOBILE_WIDTH}){
                      width: 100px;
                    }

                  `}
              >
                <div className="spectrum-Dialog-grid">
                  <h1 className="spectrum-Dialog-heading spectrum-Dialog-heading--noHeader">Change organization</h1>
                  <hr className="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider" />
                  <section className="spectrum-Dialog-content">
                    <div
                      css={css`
                      display:flex;
                      flex-direction:column;
                      gap:20px;
                    `}
                    >
                      <div>
                        An organization is the entity that functions like a log-in company that spans all Adobe products and applications. Most often, an organization is your company name.However, a company can have many organizations. Change the organization here.
                      </div>
                      <div
                        css={css`
                        display : flex; 
                        flex-direction:column;
                      `}>
                        <div className="spectrum-Textfield spectrum-Textfield--sizeM">
                          <p
                            css={css`color: var(--spectrum-global-color-gray-600);margin:0;`}>
                            Organization
                          </p>
                        </div>

                        <div
                          css={css`
                        
                          & > div > .spectrum-Picker {
                            width: 100% !important;
                          }

                          & > div > div {
                            width: 86%;
                            left: 7%;
                            height : 40%;
                          }

                            padding: 5px;
                            border-radius: 3px;
                            border: 1px solid #D0D0D0 !important;

                          ` }
                        >
                          <Picker
                            isQuiet
                            items={organization.map((organs, k) => {
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

                      </div>
                      <div
                        css={css`
                          display: flex;
                          gap: 5px;
                        `}
                      >
                        <span>Can't find your organization?</span>
                        <a href="https://some_help_link"
                          target="_blank"
                          rel="noreferrer"
                          css={css`
                          color:rgb(0, 84, 182);
                          &:hover {
                            color: rgb(2, 101, 220);
                          }`
                          }
                        >Learn more about organizations.</a>
                      </div>
                    </div>
                  </section>

                  <div className="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter" css={css` gap: 20px; `} >
                    <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--outline spectrum-Button--secondary spectrum-ButtonGroup-item" type="button" onClick={handleModal} >
                      <span className="spectrum-Button-label">Cancel</span>
                    </button>
                    <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--fill spectrum-Button--accent spectrum-ButtonGroup-item" type="button" onClick={handleRedirect} >
                      <span className="spectrum-Button-label" >Save</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          }
        </div>
      }
    </>
  )
}

export { ChangeOrganization };

