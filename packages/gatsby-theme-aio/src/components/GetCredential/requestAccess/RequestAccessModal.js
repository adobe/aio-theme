import React, { useState } from "react";
import { css } from "@emotion/react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { Picker } from "@adobe/gatsby-theme-aio/src/components/Picker";
import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Heading,
} from "@adobe/react-spectrum";
import FireFly from "../../../../../../example/src/pages/credential/images/firefly.png";

const RequestAccessModal = ({ close, setIsRequested }) => {
  const organizationList = [
    "I need access to this application for my work",
    "reason2",
    "reason3",
    "reason4",
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Dialog size="M">
        <Heading>Request access to an API or service</Heading>
        <Divider />
        <Content>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 48px;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 16px;
              `}
            >
              <p
                className="spectrum-Body spectrum-Body--sizeS"
                css={css`
                  color: #222222;
                `}
              >
                To start using this app or service, you’ll need to submit a
                request.{" "}
                <a
                  css={css`
                    color: #147af3;
                  `}
                  href="#"
                >
                  Learn more about requesting Adobe apps
                </a>
              </p>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                `}
              >
                <h6
                  className="spectrum-Heading spectrum-Heading--sizeXXS"
                  css={css`
                    color: #222222;
                  `}
                >
                  Request access to:
                </h6>
                <div
                  css={css`
                    background: var(--Palette-gray-50, #ffffff);
                    border: 1px solid var(--Palette-gray-300, #d5d5d5);
                    padding: 11px 17px 11px 17px;
                    border-radius: 4px;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      gap: 10px;
                      align-items: center;
                    `}
                  >
                    <img
                      css={css`
                        width: 42px;
                        height: 40px;
                      `}
                      src={FireFly}
                    />
                    <h5
                      className="spectrum-Heading spectrum-Heading--sizeXS"
                      css={css`
                        color: #222222;
                      `}
                    >
                      Firefly Services{" "}
                    </h5>
                  </div>
                </div>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                `}
              >
                <h6
                  className="spectrum-Heading spectrum-Heading--sizeXXS"
                  css={css`
                    color: #222222;
                  `}
                >
                  Let your admin know why you need this app or service
                </h6>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                  `}
                >
                  <p
                    className="spectrum-Body spectrum-Body--sizeXS"
                    css={css`
                      color: #464646;
                    `}
                  >
                    Business reason
                  </p>
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
                        width: calc(100% - 80px);
                        max-height: 98px;

                        ul:nth-child(1) {
                          -ms-overflow-style: none;
                          scrollbar-width: none;
                          ::-webkit-scrollbar {
                            display: none;
                          }

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
                    `}
                  >
                    <Picker
                      isQuiet={false}
                      items={organizationList.map((organization, k) => {
                        return {
                          title: organization,
                          selected: k === selectedIndex,
                        };
                      })}
                      onChange={(index) => {
                        setSelectedIndex(index);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              css={css`
                & > div {
                  display: flex;
                  justify-content: right;
                  gap: 16px;
                  button {
                    cursor: pointer;
                    margin: 0px !important;
                  }
                }
              `}
            >
              <ButtonGroup>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button
                  variant="accent"
                  onPress={() => {
                    close();
                    setIsRequested(true);
                  }}
                >
                  Send request
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Content>
      </Dialog>
    </>
  );
};

export { RequestAccessModal };
