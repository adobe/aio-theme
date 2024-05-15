import React from "react";
import { css } from "@emotion/react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Heading,
} from "@adobe/react-spectrum";
import { ChangeOrganizationContent } from "./ChangeOrganizationContent";

const ChangeOrganizationModal = ({ close }) => {
  return (
    <>
      <Dialog size="M">
        <Heading>Change organization</Heading>
        <Divider />
        <Content>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 48px;
            `}
          >
            <ChangeOrganizationContent close={close} />
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
              `}
            >
              <ButtonGroup>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button variant="accent" onPress={close}>
                  Change organization
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Content>
      </Dialog>
    </>
  );
};

export { ChangeOrganizationModal };
