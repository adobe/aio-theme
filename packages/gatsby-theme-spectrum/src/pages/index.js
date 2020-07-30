import React, { useContext } from 'react';
import { withPrefix } from 'gatsby';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Context from '../components/Context';

export default () => {
  const { siteMetadata } = useContext(Context);
  const root = withPrefix(siteMetadata.pages[0].path);

  return (
    <HelmetProvider>
      <Helmet>
        <meta http-equiv="refresh" content={`0; url=${root}`} />
      </Helmet>
    </HelmetProvider>
  );
};
