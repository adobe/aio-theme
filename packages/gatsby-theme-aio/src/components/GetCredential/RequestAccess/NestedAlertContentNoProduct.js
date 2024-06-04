import React from "react";
import { NestedAlertContentEdgeCase } from "./NestedAlertContentEdgeCase";

const NestedAlertContentNoProduct = ({content}) => {

  return (
    <>
      <NestedAlertContentEdgeCase content={content} isNoProduct={true} />
    </>
  );
};

export { NestedAlertContentNoProduct };
