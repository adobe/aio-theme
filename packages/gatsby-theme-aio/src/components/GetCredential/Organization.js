import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Picker } from '../Picker';
import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
} from '@adobe/react-spectrum';
import GetCredentialContext from './GetCredentialContext';

const Organization = () => {

  const { allOrganizations, switchOrganization, selectedOrganization } = useContext(GetCredentialContext);

  const [selectedIndex, setSelectedIndex] = useState(allOrganizations.findIndex(org => org.id === selectedOrganization.id));

  return (
    <div
      css={css`
        & > .changeOrg {
          border: none;
          background: transparent;
          padding: 0;
          height: fit-content;
          text-decoration: underline;
          cursor: pointer;
        }
      `}>
      <DialogTrigger>
        <ActionButton UNSAFE_className="changeOrg">Change Organization</ActionButton>
        {close => (
          <Dialog size="M">
            <Heading>Change organization</Heading>
            <Divider />
            <Content>
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

                        & > div > div > ul > li > div > div {
                          height: 20px !important;
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
                  <ButtonGroup>
                    <Button variant="secondary" onPress={close}>
                      Cancel
                    </Button>
                    <Button
                      variant="accent"
                      onPress={() => {
                        close();
                        switchOrganization(allOrganizations[selectedIndex]);
                      }}>
                      Change organization
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Content>
          </Dialog>
        )}
      </DialogTrigger>
    </div>
  );
};

export { Organization };
