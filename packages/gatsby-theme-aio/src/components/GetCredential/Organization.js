import React, { useContext, useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Picker } from '../Picker';
import { MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH, MIN_TABLET_SCREEB_WIDTH } from './FormFields';
import { ActionButton, Button, ButtonGroup, Content, Dialog, DialogTrigger, Divider, Heading } from '@adobe/react-spectrum';
import { Loading } from './Loading';
import GetCredentialContext from './GetCredentialContext';

const Organization = ({}) => {

  const { allOrganizations, switchOrganization } = useContext(GetCredentialContext);

  const [selectedIndex, setSelectedIndex] = useState();

  const getValueFromLocalStorage = () => {

    let organizationObj = JSON.parse(localStorage.getItem("OrgInfo"));
    if (!organizationObj) {
      localStorage.setItem("OrgInfo", JSON.stringify(allOrganizations[0]));
      organizationObj = allOrganizations[0];
    }
    allOrganizations?.forEach((org, index) => {
      if (org.code === organizationObj.code) {
        setSelectedIndex(index)
      }
    })

  }

  useEffect(() => {
    allOrganizations?.forEach((organs, index) => {
      if (index === selectedIndex) {
        localStorage.setItem('OrgInfo', JSON.stringify(organs));
      }
    })
  }, [selectedIndex])

  useEffect(() => {
    getValueFromLocalStorage()
  }, [allOrganizations])

  const handleClick = (close) => {
    allOrganizations?.forEach((organs, index) => {
      if (index === selectedIndex) {
        switchOrganization(organs)
      }
    })
    close()
  }

  return (
    <div css={css`
      & > .changeOrg{
        border: none;
        background: transparent;
        padding: 0;
        height: fit-content;
        text-decoration: underline;
        cursor : pointer;
      }
    `}>
      <DialogTrigger type="popover" mobileType="tray">
        <ActionButton UNSAFE_className='changeOrg'>Change Organization</ActionButton>
        {(close) => (
          <Dialog size="M">
            <Heading>Change organization</Heading>
            <Divider />
            <Content>
              {allOrganizations?.length ?
                <section className="spectrum-Dialog-content" css={css`overflow:hidden`}>
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
                        className='organization'
                        css={css`
                        
                          & > div > .spectrum-Picker {
                            width: 100% !important;
                            height: 20px;
                          }

                          & > div > .spectrum-Picker > span {
                            white-space : nowrap !important;
                          }

                          & > div > .spectrum-Picker > svg {
                            position: absolute !important;
                            top: 80px !important;
                            left: 150px !important;
                          }

                          & > div > .spectrum-Picker > svg > path:first-of-type {
                            display : none !important;
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

                          & > div > .spectrum-Picker-popover > ul > li > div > div > svg > path:first-of-type {
                            display : none !important;
                          }

                            padding: 5px;
                            border-radius: 3px;
                            border: 1px solid #D0D0D0 !important;

                          ` }
                      >
                        <Picker
                          isQuiet
                          items={allOrganizations?.map((organs, k) => {
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

                    <ButtonGroup alignSelf="end">
                      <Button variant="secondary" onPress={close}>Cancel</Button>
                      <Button autoFocus variant="accent" onPress={() => handleClick(close)} >Save</Button>
                    </ButtonGroup>

                  </div>

                </section>
                :
                <Loading />
              }
            </Content>
          </Dialog>
        )}
      </DialogTrigger>

    </div>
  )
}

export { Organization }