import React from "react";
import { css } from "@emotion/react";
import { CopyIcon } from "../FormFields";

const ReturnCredentialsData = ({ credentialKey, value, index, setTooltipOpen, handleLeave, handleCopy }) => {
  return (
    <div
      css={css`
        display:flex;
        flex-direction:column;
        gap:8px;
      `}
    >
      <p className="spectrum-Body spectrum-Body--sizeS">{credentialKey}</p>
      <div
        css={css` 
          display:flex;
          align-items: center;
          gap: 24px; 
        `}>


        {credentialKey === "Client secret" ?
          <button class="spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM"
            css={css`
              cursor : pointer;
              border: 1px solid var(--spectrum-global-color-gray-400);
              border-radius: 3px;
              padding: 3px 6px;
              height:32px;
              background :transparent;
            `}
          >
            <span class="spectrum-ActionButton-label">{value}</span>
          </button> :
          <p className="spectrum-Body spectrum-Body--sizeS"
            css={css`
              font-family: Source Code Pro,Monaco,monospace;
              white-space: normal;
              overflow-wrap: anywhere;
              max-width: 300px;
            `}
          >{value}</p>
        }

        {credentialKey !== "Client secret" &&

          <div css={css`position:relative;display:${credentialKey === "Organization" ? "none" : "block"}`}>
            <button className="spectrum-ActionButton spectrum-ActionButton--sizeM"
              onMouseEnter={() => setTooltipOpen(index)}
              onMouseLeave={handleLeave}
              onClick={() => handleCopy(value, index)}
              css={css`
                border: 1px solid var(--spectrum-global-color-gray-400);
                border-radius: 3px;
                padding: 3px 6px;
              `}
            >
              {<span className="spectrum-ActionButton-label"><CopyIcon /></span>}
            </button>

          </div>

        }

      </div>
    </div>
  )
}
export { ReturnCredentialsData }