import React from 'react';
import { NestedAlertContentEdgeCase } from './NestedAlertContentEdgeCase';

const NestedAlertContentNotSignUp = ({ content }) => {
  return (
    <>
      <NestedAlertContentEdgeCase content={content} isNotSignUp={true}/>
    </>
  );
};

export { NestedAlertContentNotSignUp };
