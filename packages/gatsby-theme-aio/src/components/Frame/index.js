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

import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { connectToChild } from 'penpal';
import { Footer } from '../Footer';
import PropTypes from 'prop-types';
import { ProgressCircle } from '../ProgressCircle';

const Frame = ({ src }) => {
  const [showProgress, setShowProgress] = useState(true);
  const iframe = useRef(null);

  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: ${showProgress ? 'grid' : 'none'};
          place-items: center center;
        `}>
        <ProgressCircle />
      </div>

      <iframe
        ref={iframe}
        src={src}
        onLoad={() => {
          setShowProgress(false);

          connectToChild({
            // The iframe to which a connection should be made
            iframe: iframe.current,
            // Methods the parent is exposing to the child
            methods: {
              setHeight(height) {
                iframe.current.style.height = height;
              },
              getIMSAccessToken() {
                return window.adobeIMS.isSignedInUser() ? window.adobeIMS.getAccessToken() : null;
              },
              getIMSProfile() {
                return window.adobeIMS.isSignedInUser() ? window.adobeIMS.getProfile() : null;
              },
              signIn() {
                if (!window.adobeIMS.isSignedInUser()) {
                  window.adobeIMS.signIn();
                }
              },
              signOut() {
                if (window.adobeIMS.isSignedInUser()) {
                  window.adobeIMS.signOut();
                }
              }
            }
          });
        }}
        css={css`
          height: calc(100vh - var(--spectrum-global-dimension-size-800));
          width: 100%;
          border: none;
        `}
      />

      <Footer />
    </>
  );
};

Frame.propTypes = {
  src: PropTypes.string
};

export default Frame;
