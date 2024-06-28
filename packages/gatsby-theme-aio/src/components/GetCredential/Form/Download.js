import React from 'react';
import { css } from "@emotion/react";
import { FormFields } from "../FormFields";

const Download = ({ downloadProp, formData, isFormValue, handleChange }) => {
  return (
    <>
      {
        downloadProp?.selectOptions?.length > 1 &&
        <FormFields isFormValue={isFormValue} fields={downloadProp}>
          <select
            css={css`
                font-style: italic;
                font-weight: 500;
                font-family: 'adobe-clean';
                padding: 7px;
                border-radius: 3px;
                border: 1px solid #D0D0D0 !important;
                width:100%;
              `}
            id="selectBox"
            value={formData['Download']}
            onChange={(e) => handleChange(e, "Download")}
            data-cy="select-download-language"
          >
            {downloadProp?.selectOptions?.length > 1 && <option value="" hidden>Select language for your code pickData</option>}
            {downloadProp?.selectOptions?.map((option, index) => (
              <option key={index} data-link={option.href} value={option.title} data-cy={`${option.title}-language`}>{option.title}</option>
            ))}
          </select>
        </FormFields>
      }
    </>

  )
}

export { Download };