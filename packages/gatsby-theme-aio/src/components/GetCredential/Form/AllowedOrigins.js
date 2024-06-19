import React from 'react';
import { css } from "@emotion/react";
import { FormFields } from '../FormFields';

const AllowedOrigins = ({ originsProps, isFormValue, type, formData, handleChange }) => {

  const hostnameRegex = /^(localhost:\d{1,5}|(\*\.|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)|\*|(\*\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/;
  const validateAllowedOrigins = formData['AllowedOrigins']?.split(',').map((data) => hostnameRegex.test(data.trim()));
  const isAllowedOriginsValid = validateAllowedOrigins?.every((value) => value === true);
  const isRed = formData["AllowedOrigins"] !== undefined && !isAllowedOriginsValid && formData["AllowedOrigins"]?.length !== 0;

  return (
    <FormFields isFormValue={isFormValue} fields={originsProps} type={type} formData={formData} isRed={isRed} >
      <textarea
        css={css`
            flex: 1;
            padding: 7px;
            height: 50px;
            border-radius: 3px;
            border: 1px solid ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
            resize: none; 
            width: 90%;
            color: #4b4b4b;
            font-family: adobe-clean, Helvetica, Arial, sans-serif;
            &::placeholder {
              color:var(--spectrum-global-color-gray-600);
              font-style: italic;
            }
            &:focus {
              outline: none;
              border-color: ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
            }
            &:hover {
              &::placeholder {
                color:var(--spectrum-global-color-gray-800);
              }
            }
          `}
        value={formData["AllowedOrigins"]}
        placeholder={originsProps?.placeholder}
        onChange={(e) => handleChange(e, "AllowedOrigins")}
        data-cy="add-allowed-origins"
      ></textarea>
    </FormFields>
  )
}

export { AllowedOrigins };
