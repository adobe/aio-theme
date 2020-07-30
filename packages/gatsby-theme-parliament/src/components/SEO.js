import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const SEO = ({ title, description }) => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  </HelmetProvider>
);
