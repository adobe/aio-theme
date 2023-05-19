/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../ActionButton';
// import { Bug, Edit } from '../Icons';
import { css } from '@emotion/react';
// import { getExternalLinkProps } from '../../utils';

const createCredential = async (setCredentialData, setClientId, setAPIKey) => {
  const token = window.adobeIMS?.getTokenFromStorage()?.token;
  if (token) {
    const data = {
      name: Date.now().toString(),
      platform: 'apiKey',
      description: 'created for get credential'
    };
    const response = await fetch("/console/api/organizations/171709/integrations/adobeid", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "x-api-key": "UDPWeb1"
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      setCredentialData(result);
      setClientId(()=> { return result.id});
      setAPIKey(() => { return result.apiKey});
    }
  }
  else {
    console.log('User not logged in');
  }
}

const GetCredential = ({credentialType, setClientId, setAPIKey}) => {
  const [credentialData, setCredentialData] = useState(null);
  if (window.adobeIMS?.isSignedInUser()) {
    return (
      credentialData ? <div>
        Api Key: {credentialData.apiKey} <br />
        Credential Id: {credentialData.id}
      </div> : <div
        css={css`
          display: flex;
        `}>
        <ActionButton
          css={css`
          border-color: var(--spectrum-actionbutton-m-border-color,var(--spectrum-alias-border-color));
          color: var(--spectrum-actionbutton-m-text-color,var(--spectrum-alias-text-color));
          padding: var(--spectrum-global-dimension-size-65)    
          `}
          onClick={() => createCredential(setCredentialData, setClientId, setAPIKey)}>
          Get Credential
        </ActionButton>
      </div>
    );
  }

  return <></>;
};

GetCredential.propTypes = {
  credentialType: PropTypes.string,
  setClientId: PropTypes.func,
  setAPIKey: PropTypes.func,
}

export { GetCredential };
