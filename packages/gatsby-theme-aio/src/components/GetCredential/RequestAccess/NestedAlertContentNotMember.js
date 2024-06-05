import React from 'react';
import { NestedAlertContentEdgeCase } from './NestedAlertContentEdgeCase';

const NestedAlertContentNotMember = ({content}) => {

  return (
    <>
      <NestedAlertContentEdgeCase content={content} />
    </>
  );
};

export { NestedAlertContentNotMember };
