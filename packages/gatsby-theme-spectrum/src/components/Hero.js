import React from 'react';
import {css} from '@emotion/core';
import {Flex} from '@react-spectrum/layout';
import {View} from '@react-spectrum/view';
import '@spectrum-css/typography/dist/index-vars.css';

export default ({heading, text, illustration, background}) => (
  <section css={css`
    height:270px;
    margin-bottom: 32px;
    background-color: ${background};
  `}>
    <Flex height="100%" alignItems="center">
      <View marginStart="size-800">
        <h1
          className="spectrum-Heading--XL"
          css={css`
          margin-bottom:16px;
          color: var(--spectrum-global-color-gray-200);
          `}>
          {heading}
        </h1>
        <p
          className="spectrum-Body--L"
          css={css`
          color: var(--spectrum-global-color-gray-200);
          `}>
          {text}
        </p>
      </View>
      <View>
        <img
          alt=""
          src={illustration}
          css={css`
            min-width: 750px;
            max-height: 210px;
            object-fit: contain;
          `}/>
      </View>
    </Flex>
  </section>
);