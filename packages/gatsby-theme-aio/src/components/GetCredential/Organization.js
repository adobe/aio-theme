import React, { useEffect, useRef, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH, MIN_TABLET_SCREEB_WIDTH } from './FormFields';
import { Popover } from '../Popover';
import { Picker } from '../Picker';
import { Loading } from './Loading';

const Organization = ({
  isShow,
  setOrganizationValue,
  setIsShow,
  allOrganization
}) => {

  const [selectedIndex, setSelectedIndex] = useState();
  const [isModalOpen, setIsModelOpen] = useState(true);

  const organizationRef = useRef();
  const organizationRef2 = useRef();

  const handleClickOutside = (e) => {
    if (organizationRef2.current && !organizationRef.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getValueFromLocalStorage = async () => {

    let organizationObj = JSON.parse(localStorage.getItem("OrgInfo"))
    allOrganization?.forEach((org, index) => {
      if (org.name === organizationObj.name) {
        setSelectedIndex(index)
      }
    })

  }

  useEffect(() => {
    allOrganization?.forEach((organs, index) => {
      if (index === selectedIndex) {
        const orgData = {
          "id": organs?.id,
          "name": organs?.name,
          "orgLen": allOrganization?.length,
          "type": organs?.type
        }
        localStorage.setItem('OrgInfo', JSON.stringify(orgData));
      }
    })
  }, [selectedIndex])

  useEffect(() => {
    setTimeout(() => {
      getValueFromLocalStorage()
    }, [2000])
  }, [])


  const handleClick = (action) => {
    if (action === "save") {
      allOrganization?.forEach((organs, index) => {
        if (index === selectedIndex) {
          setOrganizationValue(organs)
        }
      })
    }
    setIsModelOpen(false)
  }

  return (
    <>
      <div
        ref={organizationRef2}
      >
        <div
          ref={organizationRef}
          aria-label="credentialProject"
          aria-controls="credentialProject"
          aria-expanded={isShow}
          css={css`
            text-decoration-color: blue;
            text-decoration : underline;
            color: blue;  
            display: "inline-block";
            cursor:pointer;
          `
          }>
          <button
            tabIndex="0"
            css={css`
              border: none;
              padding:0;
              font-family:'adobe-clean';
              background: transparent;
              margin-left :10px;
              text-decoration:underline;
              color: var(--spectrum-global-color-gray-800);
              position : relative;
              cursor:pointer;`
            }
            onClick={() => { setIsModelOpen(true) }}
          >
            Change organization?
          </button>
        </div>
      </div>
      <Popover
        id="credentialProject"
        isOpen={isShow}
        css={css`
          width: var(--spectrum-global-dimension-size-6000);
          max-height: var(--spectrum-global-dimension-size-6000);
          height: var(--spectrum-global-dimension-size-4600);
          margin-top: 20px;
          right: 50%;
        `}>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          `}
          onClick={isModalOpen ? (event) => event.stopPropagation() : () => { }}
        >
          <div
            css={css`
              padding : 40px;
              cursor : pointer;
              
              .spectrum-Dialog-content{
                overflow : hidden !important;
              }

            `}
          >
            {allOrganization?.length ?
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
                            height: 20px;
                          }

                          & > div > div {
                            width: 86%;
                            left: 9%;
                            height : 40%;

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

                            padding: 5px;
                            border-radius: 3px;
                            border: 1px solid #D0D0D0 !important;

                          ` }
                      >
                        <Picker
                          isQuiet
                          items={allOrganization?.map((organs, k) => {
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

                    <div className="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter" css={css` gap: 20px; `} >
                      <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--outline spectrum-Button--secondary spectrum-ButtonGroup-item" type="button" onClick={() => { handleClick("cancel") }}>
                        <span className="spectrum-Button-label">Cancel</span>
                      </button>
                      <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--fill spectrum-Button--accent spectrum-ButtonGroup-item" type="button" onClick={() => { handleClick("save") }}>
                        <span className="spectrum-Button-label" >Save</span>
                      </button>
                    </div>
                  </div>

                </section>

              </div>
              :
              <Loading />
            }
          </div>
        </div>
      </Popover>

    </>
  )
}

export { Organization }