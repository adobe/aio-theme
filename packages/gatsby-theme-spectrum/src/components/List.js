import React from 'react';
import '@spectrum-css/typography/dist/index-vars.css';

export default ({children, ...props}) => (
  <ul {...props} className="spectrum-Body--M">{children}</ul>
);