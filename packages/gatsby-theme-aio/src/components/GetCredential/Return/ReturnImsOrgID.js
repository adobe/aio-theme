import React from 'react';
import ShowCard from '../Card/ShowCard';

const ReturnImsOrgID = ({ returnImsOrgID , imsOrgId , value}) => {
  return <ShowCard heading={returnImsOrgID?.heading} value={value} />;
};

export { ReturnImsOrgID };
