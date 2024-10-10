import React from 'react';
import ShowCard from './ShowCard';

const CardImsOrgID = ({ cardImsOrgID, imsOrgId }) => {
  return <ShowCard heading={cardImsOrgID?.heading} value={imsOrgId} />;
};

export { CardImsOrgID };
