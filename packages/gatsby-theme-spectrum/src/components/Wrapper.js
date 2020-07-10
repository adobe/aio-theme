import React from 'react';
import '@spectrum-css/vars/dist/spectrum-global.css';
import '@spectrum-css/vars/dist/spectrum-medium.css';
import '@spectrum-css/vars/dist/spectrum-large.css';
import '@spectrum-css/vars/dist/spectrum-light.css';
import '@adobe/focus-ring-polyfill';
import { Grid } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Header } from './Header';
import { SEO } from './SEO';

export default ({ children, pageContext, path }) => (
  <>
    <SEO title={pageContext.frontmatter.title} description={pageContext.frontmatter.description} />
    <div className="spectrum spectrum--medium spectrum--large spectrum--light" lang="en" dir="ltr">
      <View backgroundColor="gray-50">
        <Grid areas={['header', 'main']} rows={['size-800']}>
          <View gridArea="header">
            <Header path={path} />
          </View>
          <View gridArea="main">{children}</View>
        </Grid>
      </View>
    </div>
    }
  </>
);
