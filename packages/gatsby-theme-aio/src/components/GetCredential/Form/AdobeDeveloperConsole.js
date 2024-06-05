import React from 'react';
import { css } from "@emotion/react";

const AdobeDeveloperConsole = ({ formData, handleChange, adobeDeveloperConsole }) => {
  return (
    <div css={css`display: flex; gap: 10px;`}>
      <input type="checkbox" css={css`accent-color: #5b5a5a;transform: scale(1.1);`} checked={formData['Agree']} onChange={(e) => handleChange(e, 'Agree')} />
      <p css={css`color:var(--spectrum-global-color-gray-800);margin:0;display:inline-flex;gap:5px;`}  className="spectrum-Body spectrum-Body--sizeS">{adobeDeveloperConsole?.label}
        <a
          href={adobeDeveloperConsole?.href}
          css={css`
              color:rgb(0, 84, 182);
              &:hover {adobeDeveloperConsole
                color: rgb(2, 101, 220);
              }
            `}
          target="_blank" rel="noreferrer">{adobeDeveloperConsole?.linkText}</a>.
      </p>
    </div>
  )
}

export { AdobeDeveloperConsole };
