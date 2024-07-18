import React from 'react';
import { css } from "@emotion/react";
import { FormFields } from "../FormFields";
import { AlertIcon } from '../Icons';

const CredentialName = ({ nameProps, isFormValue, formData, handleChange }) => {

  const credentialNameRegex = /^(?=[A-Za-z0-9\s]{6,}$)[A-Za-z0-9\s]*$/;
  const inValidName = !credentialNameRegex.test(formData['CredentialName'])
  const isRed = formData["CredentialName"]?.length !== 0 && inValidName;
  return (
    <FormFields isFormValue={isFormValue} fields={nameProps} formData={formData} isRed={isRed}>
      <div css={css`position:relative; display:inline-block; width: 100%`}>
        <input
          type="text"
          css={css`
              padding: 7px;
              border-radius: 3px;
              width: 97%;
              border: 1px solid ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
               &::placeholder {
                 font-style: italic; 
                 color: var(--spectrum-global-color-gray-400); 
                }
               &:focus {
                outline: none;
                border-color: ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
              }
            `}
          value={formData["CredentialName"]}
          onChange={(e) => handleChange(e, "CredentialName")}
          placeholder={nameProps?.placeholder}
          maxLength={nameProps?.range}
        />
        <span css={css`display : ${formData["CredentialName"]?.length < 6 && formData["CredentialName"]?.length !== 0 ? "block" : "none"}`}><AlertIcon /></span>
      </div>
    </FormFields>
  )
}

export { CredentialName }
