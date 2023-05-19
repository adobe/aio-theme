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

import React, { useContext, useRef, useEffect, useState } from 'react';
import { withPrefix } from 'gatsby';
import { css } from '@emotion/react';
import { connectToChild } from 'penpal';
import { Footer } from '../Footer';
import PropTypes from 'prop-types';
import Context from '../Context';
import { isExternalLink } from '../../utils';

const Frame = ({ src, height = 'calc(100vh - var(--spectrum-global-dimension-size-800))', location }) => {
  const iframe = useRef(null);
  // some strangeness with ims not being set within context???
  const { ims, isLoadingIms, clientId, APIKey } = useContext(Context);
  let imsHack;
  const [child, setChild] = useState(null);

  // ensures connectToChild is called before the child calls connectToParent
  const [connectionReady, setConnectionReady] = useState(false);

  useEffect(() => {
    if (child) {
      if (iframe.current.clientHeight === 0) {
        child.onHide();
      } else {
        child.onShow();
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    setConnectionReady(false);
    if (iframe != null && !isLoadingIms) {

      // TODO: figure out why ims from context is not being updated so have to use a hacky solution like this
      imsHack = window.adobeIMS;
      const connection = createConnection();

      return () => {
        connection.destroy();
      };
    }
  }, [iframe, isLoadingIms]);

  useEffect(() => {
    if (child) {
      child.onSetClientId(clientId);
      child.onSetAPIKey(APIKey);
    }
  }, [clientId, APIKey]);

  const iframeSrc = isExternalLink(src) ? src : withPrefix(src);

  const createConnection = () => {
    const connection = connectToChild({
      // The iframe to which a connection should be made
      iframe: iframe.current,
      // Manually set origin as auto-detection may fail, as the src of the iframe is set later
      childOrigin: isExternalLink(src) ? new URL(src).origin : window.origin,
      // Methods the parent is exposing to the child
      methods: {
        scrollTop(position = 0) {
          if (document?.scrollingElement) {
            document.scrollingElement.scrollTop = position;
          }
        },
        getURL() {
          return window?.location?.href;
        },
        setURL(url) {
          if (window?.location) {
            window.location = url;
          }
        },
        setHeight(height) {
          iframe.current.style.height = height;
        },
        getIMSAccessToken() {
          if (imsHack?.isSignedInUser()) {
            return imsHack.getAccessToken();
          }

          return null;
        },
        getIMSProfile() {
          if (imsHack?.isSignedInUser()) {
            return imsHack.getProfile();
          }

          return null;
        },
        signIn() {
          if (imsHack && !imsHack.isSignedInUser()) {
            imsHack.signIn();
          }
        },
        signOut() {
          if (imsHack && imsHack.isSignedInUser()) {
            imsHack.signOut();
          }
        },
        getIMSClientId() {
          if (imsHack) {
            return imsHack.adobeIdData.client_id;
          } else {
            return null;
          }
        }
      }
    });

    connection.promise.then((child) => {
      if (iframe.current.clientHeight === 0) {
        child.onHide();
      } else {
        child.onShow();
      }
      setChild(child);
    });

    // Notify that the connection is ready and the iframe src may be set
    setConnectionReady(true);

    return connection;
  };

  return (
    <>
      <iframe
        title="Main content"
        ref={iframe}
        src={connectionReady ? iframeSrc : ''}
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
  height: PropTypes.string,
  location: PropTypes.object
};

export default Frame;
