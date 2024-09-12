import React from 'react';
import ShowCard from './ShowCard';

const CardImsOrgID = ({ val: { heading, imsOrgId } }) => {
  return heading && <ShowCard heading={heading} value={imsOrgId} />
};

export { CardImsOrgID };
