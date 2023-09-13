import React from 'react';
import { ContextHelp } from './ContextHelp';
import { css } from "@emotion/react";
import classNames from "classnames";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

export const CommonFields = ({ isFormValue, fields, children, formData, isRed }) => {

  const { label, range, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading, description, className, required } = fields;

  return (
    <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`} className={classNames(className)} >
      <div className="spectrum-Textfield spectrum-Textfield--sizeM"
        css={css`
            display:flex;
            justify-content:space-between;
            position:relative;
            width: ${isFormValue?.length ? "95%" : "100%"};  
          `}
      >
        <div css={css` display:flex; gap:3px; `} >
          {label && <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
            css={css` color: var(--spectrum-global-color-gray-700)`}
          >
            {label}
          </label>}
          {required && <span css={css`font-size: 1.2rem;`}>*</span>}
        </div>
        {range && <span id="character-count-2" className="spectrum-Textfield-characterCount"
          css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-700)) `}>
          {formData['CredentialName'] ? range - formData['CredentialName']?.length : range}
        </span>}
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap:10px;
        `}>
        {children}
        {isFormValue?.length ?
          <div css={css` cursor:pointer; width:20px; height:20px; `} >
            {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
          </div> : null
        }
      </div>
      {description && <div className="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--neutral">
        <p className="spectrum-Body spectrum-Body--sizeXS"
          css={css`
              color : ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-700)"};
              width: ${isFormValue?.length ? "95%" : "100%"};
            `}>
          {description}
        </p>
      </div>
      }
    </div>
  )
}

export const AlertIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <rect id="Canvas" fill="rgb(211, 21, 16)" opacity="0" width="18" height="18" />
      <path fill="rgb(211, 21, 16)" d="M8.5635,1.2895.2,16.256A.5.5,0,0,0,.636,17H17.364a.5.5,0,0,0,.436-.744L9.4365,1.2895a.5.5,0,0,0-.873,0ZM10,14.75a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,14.75v-1.5A.25.25,0,0,1,8.25,13h1.5a.25.25,0,0,1,.25.25Zm0-3a.25.25,0,0,1-.25.25H8.25A.25.25,0,0,1,8,11.75v-6a.25.25,0,0,1,.25-.25h1.5a.25.25,0,0,1,.25.25Z" />
    </svg>
  )
}

export const MIN_MOBILE_WIDTH = "320px";
export const MAX_MOBILE_WIDTH = "767px";
export const MAX_TABLET_SCREEN_WIDTH = "1024px";

export const CopyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
      <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><rect height="1" rx="0.25" width="1" x="16" y="11" />
      <rect height="1" rx="0.25" width="1" x="16" y="9" />
      <rect height="1" rx="0.25" width="1" x="16" y="7" />
      <rect height="1" rx="0.25" width="1" x="16" y="5" />
      <rect height="1" rx="0.25" width="1" x="16" y="3" />
      <rect height="1" rx="0.25" width="1" x="16" y="1" />
      <rect height="1" rx="0.25" width="1" x="14" y="1" />
      <rect height="1" rx="0.25" width="1" x="12" y="1" />
      <rect height="1" rx="0.25" width="1" x="10" y="1" />
      <rect height="1" rx="0.25" width="1" x="8" y="1" />
      <rect height="1" rx="0.25" width="1" x="6" y="1" />
      <rect height="1" rx="0.25" width="1" x="6" y="3" />
      <rect height="1" rx="0.25" width="1" x="6" y="5" />
      <rect height="1" rx="0.25" width="1" x="6" y="7" />
      <rect height="1" rx="0.25" width="1" x="6" y="9" />
      <rect height="1" rx="0.25" width="1" x="6" y="11" />
      <rect height="1" rx="0.25" width="1" x="8" y="11" />
      <rect height="1" rx="0.25" width="1" x="10" y="11" />
      <rect height="1" rx="0.25" width="1" x="12" y="11" />
      <rect height="1" rx="0.25" width="1" x="14" y="11" />
      <path d="M5,6H1.5a.5.5,0,0,0-.5.5v10a.5.5,0,0,0,.5.5h10a.5.5,0,0,0,.5-.5V13H5.5a.5.5,0,0,1-.5-.5Z" />
    </svg>
  )
};

export const LinkOut = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
      <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path d="M16.5,9h-1a.5.5,0,0,0-.5.5V15H3V3H8.5A.5.5,0,0,0,9,2.5v-1A.5.5,0,0,0,8.5,1h-7a.5.5,0,0,0-.5.5v15a.5.5,0,0,0,.5.5h15a.5.5,0,0,0,.5-.5v-7A.5.5,0,0,0,16.5,9Z" />
      <path d="M16.75,1H11.377A.4.4,0,0,0,11,1.4a.392.392,0,0,0,.1175.28l1.893,1.895L9.4895,7.096a.5.5,0,0,0-.00039.70711l.00039.00039.707.707a.5.5,0,0,0,.707,0l3.5215-3.521L16.318,6.882A.39051.39051,0,0,0,16.6,7a.4.4,0,0,0,.4-.377V1.25A.25.25,0,0,0,16.75,1Z" />
    </svg>
  )
};

const zip = new JSZip();

const createZipFile = (jsonToInject) => {
  zip.file('credential.json', JSON.stringify(jsonToInject, null, 2));

  zip.generateAsync({ type: 'blob' }).then(function (blob) {
    saveAs(blob, 'sample.zip');
  });
}

export const downloadAndModifyZip = async (zipFileURL) => {
  const token = window.adobeIMS?.getTokenFromStorage()?.token;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      "x-api-key": "UDPWeb1"
    }
  };

  const response = await fetch(zipFileURL, options);
  const organization = await response.json();

  if (response.status === 200) {
    JSZipUtils.getBinaryContent(zipFileURL, function () {
      createZipFile(organization);
    });
  }
}

export const KeyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 18 18" width="32" fill="var(--spectrum-global-color-gray-700)">
      <rect id="Canvas" fill="var(--spectrum-global-color-gray-700)" opacity="0" width="18" height="18" /><path d="M17.761,4.3875,14.53,1.156a.75.75,0,0,0-1.06066-.00034L13.469,1.156,6.5885,8.0365A4.45,4.45,0,0,0,4.5,7.5,4.5,4.5,0,1,0,9,12a4.45,4.45,0,0,0-.5245-2.0665l3.363-3.363,1.87,1.87a.375.375,0,0,0,.53033.00017L14.239,8.4405l1.672-1.672L13.776,4.633l.6155-.6155,2.135,2.1355L17.761,4.918A.37543.37543,0,0,0,17.761,4.3875ZM3.75,14.25a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,3.75,14.25Z" />
    </svg>
  )
}

export const getOrganization = async (setOrganizationValue) => {
  try {
    const token = window.adobeIMS?.getTokenFromStorage()?.token;

    if (token) {
      const response = await fetch("/console/api/organizations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "x-api-key": "UDPWeb1"
        }
      });
      const organization = await response.json();

      if (setOrganizationValue) {
        setOrganizationValue(organization[0]);
      }
      localStorage.setItem('OrgID', btoa(JSON.stringify(organization[0])));
      return organization;
    }

  } catch (error) {
    console.error('Error:', error);
  }
}