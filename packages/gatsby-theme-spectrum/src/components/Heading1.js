import React from 'react'; 
import '@spectrum-css/typography/dist/index-vars.css';

export default ({children, ...props}) => (
  <h1 {...props} className="spectrum-Heading--XXXL">
    {children}
  </h1>
);