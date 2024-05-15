import React from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import {
  Content,
  Dialog,
} from "@adobe/react-spectrum";

const RequestAccessModal = () => {

  return (
    <>
      <Dialog size="M">
        <Content>
          <iframe width="396px" src="https://developer.adobe.com/firefly-services/docs/guides/" />
        </Content>
      </Dialog>
    </>
  );
};

export { RequestAccessModal };
