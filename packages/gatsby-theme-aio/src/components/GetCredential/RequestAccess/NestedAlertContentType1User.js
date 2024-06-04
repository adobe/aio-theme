import React from 'react';
import { NestedAlertContentEdgeCase } from './NestedAlertContentEdgeCase';

const NestedAlertContentType1User = ({content}) => {
  return (
    <>
      <NestedAlertContentEdgeCase content={content} />
    </>
  );
};

export { NestedAlertContentType1User };
