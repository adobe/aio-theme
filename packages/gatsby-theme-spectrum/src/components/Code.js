import React from 'react';
import '@spectrum-css/typography/dist/index-vars.css';

export default ({children, ...props}) => (
  <code {...props} className="spectrum-Code4">{children}</code>
)