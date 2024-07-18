import React, { useState } from 'react';
import { css } from "@emotion/react";
import { FormFields } from "../FormFields";
import { Picker } from '../../Picker';

const Download = ({ downloadProp, isFormValue, handleChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      {
        downloadProp?.selectOptions?.length > 1 &&
        <FormFields isFormValue={isFormValue} fields={downloadProp}>
          <div css={css`
              width: 100%;

              & > div{
                position: relative;
              }
            
              & >div> button{
                width: 100%;
              }

              & >div> div{
                width: 100%;
              }
            `}>
            <Picker
              isQuiet={false}
              items={downloadProp?.selectOptions?.map((option, index) => {
                return {
                  title: option?.title,
                  selected: index === selectedIndex,
                };
              })}
              onChange={index => {
                setSelectedIndex(index);
                handleChange(downloadProp?.selectOptions[index], "Download");
              }}
              data-cy="select-download-language"
              id="selectBox"
            />
          </div>
        </FormFields>
      }
    </>

  )
}

export { Download };