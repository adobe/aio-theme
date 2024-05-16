import React, { useContext, useState } from "react";
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
import GetCredentialContext from "../GetCredentialContext";

const ChangeOrganizationModal = ({ close }) => {
  const { switchOrganization, allOrganizations, selectedOrganization } = useContext(GetCredentialContext);
  const [selectedIndex, setSelectedIndex] = useState(allOrganizations.findIndex(org => org.id === selectedOrganization.id));

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
            <ChangeOrganizationContent allOrganizations={allOrganizations} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
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
                <Button variant="accent" onPress={() => { close(); switchOrganization(allOrganizations[selectedIndex]) }}>
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
