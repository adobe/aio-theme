/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { useContext, useRef } from 'react';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/react';
import { connectToChild } from 'penpal';
import { Footer } from '../Footer';
import PropTypes from 'prop-types';
import Context from '../Context';
import { isExternalLink } from '../../utils';

const Frame = ({ src, height = 'calc(100vh - var(--spectrum-global-dimension-size-800))' }) => {
  const iframe = useRef(null);
  const { ims } = useContext(Context);

  return (
    <>
      <iframe
        ref={iframe}
        src={isExternalLink(src) ? src : withPrefix(src)}
        onLoad={() => {
          connectToChild({
            // The iframe to which a connection should be made
            iframe: iframe.current,
            // Methods the parent is exposing to the child
            methods: {
              getURL() {
                return location.href;
              },
              setHeight(height) {
                iframe.current.style.height = height;
              },
              getIMSAccessToken() {
                if (ims?.isSignedInUser()) {
                  return ims.getAccessToken();
                }

                return null;
              },
              getIMSProfile() {
                if (ims?.isSignedInUser()) {
                  return ims.getProfile();
                }

                return null;
              },
              signIn() {
                if (ims && !ims.isSignedInUser()) {
                  ims.signIn();
                }
              },
              signOut() {
                if (ims && ims.isSignedInUser()) {
                  ims.signOut();
                }
              }
            }
          });
        }}
        css={css`
          display: block;
          height: ${height};
          width: 100%;
          border: none;
        `}
      />

      <Footer />
    </>
  );
};

Frame.propTypes = {
  src: PropTypes.string,
  height: PropTypes.string
};

export default Frame;
