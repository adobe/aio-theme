import React from 'react';
import { Grid } from '@react-spectrum/layout';
import { View } from '@react-spectrum/view';
import { Header } from './Header';
import { theme } from '@react-spectrum/theme-default';
import { Provider } from '@react-spectrum/provider';
import { SEO } from './SEO';

export default ({ children, pageContext, path }) => (
  <>
    <SEO title={pageContext.frontmatter.title} description={pageContext.frontmatter.description} />
    <Provider theme={theme} colorScheme="light" locale="en-US" scale="medium">
      <View backgroundColor="gray-50">
        <Grid areas={['header', 'main']} rows={['size-800']}>
          <View gridArea="header">
            <Header path={path} />
          </View>
          <View gridArea="main">{children}</View>
        </Grid>
      </View>
    </Provider>
    }
  </>
);
