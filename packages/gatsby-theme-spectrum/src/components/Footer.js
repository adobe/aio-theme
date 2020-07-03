import React from 'react';
import {css} from '@emotion/core';
import {Flex} from '@react-spectrum/layout';
import {View} from '@react-spectrum/view';
import {Divider} from '@react-spectrum/divider';
import '@spectrum-css/typography/dist/index-vars.css';

export default () => (
  <footer
    className="spectrum-Body--XS"
    css={css`
      margin: 0 32px;
    `}>
    <Divider size="M"/>
    <Flex justifyContent="space-between" alignItems="center">
      <View>
        <ul
          css={css`
            display: inline-flex;
            list-style: none;
            padding: 0;
            & > li {
              margin-right: 32px;
            }
          `}>
          <li>Terms of use</li>
          <li>Privacy policy</li>
          <li>Cookies</li>
          <li>Language: <u>English</u></li>
        </ul>
      </View>
      <View>
        <span>Copyright © {new Date().getFullYear()} Adobe. All rights reserved.</span>
      </View>
    </Flex>
  </footer>
);