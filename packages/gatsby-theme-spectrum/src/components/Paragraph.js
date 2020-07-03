import React from 'react';
import '@spectrum-css/typography/dist/index-vars.css';

export default ({children, ...props}) => (
  <p {...props} className="spectrum-Body--M">{children}</p>
);