import React from 'react';
import { css } from "@emotion/react";
import { ContextHelp } from "../ContextHelp";

const Downloads = ({ downloadsProp, handleChange, formData }) => {

  const { label, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading } = downloadsProp;

  return (
    <div css={css` display: flex;gap: 10px;align-items: center;`}>
      <input type="checkbox" css={css`accent-color: #5b5a5a;transform: scale(1.1);`} onChange={(e) => handleChange(e, "Downloads")} checked={formData['Downloads']} />
      <p className='spectrum-Body spectrum-Body--sizeS' css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > {label} </p>
      <div css={css`cursor:pointer;display: flex;justify-content: center;align-items: center;`}>
        {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
      </div>
    </div>
  )
}

export { Downloads };
