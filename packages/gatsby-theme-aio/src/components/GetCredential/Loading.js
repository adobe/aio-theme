import React, {useEffect, useRef} from 'react';
import { css } from "@emotion/react";

const Loading = ({
  credentials
}) => {
  const divRef = useRef(null);
  useEffect(() =>{
    if(divRef.current){
      divRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [])
  return (
    <>
      {credentials?.heading && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentials?.heading}</h3>}
      <div css={css`
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          gap:10px;
        `}>
        <div className="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--large">
          <div className="spectrum-ProgressCircle-track"></div>
          <div className="spectrum-ProgressCircle-fills">
            <div className="spectrum-ProgressCircle-fillMask1">
              <div className="spectrum-ProgressCircle-fillSubMask1">
                <div className="spectrum-ProgressCircle-fill"></div>
              </div>
            </div>
            <div className="spectrum-ProgressCircle-fillMask2">
              <div className="spectrum-ProgressCircle-fillSubMask2">
                <div className="spectrum-ProgressCircle-fill"></div>
              </div>
            </div>
          </div>
        </div>
        <div ref={divRef}
          css={css`
            font-style: italic;
            font-family: 'adobe-clean';
            color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-600));
          `}
        >Creating credentials...</div>
        <div
          css={css`
              color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-600));
            `}
        >This process may take a few moments. Once complete, you download will start.</div>
      </div>
    </>
  )
}

export { Loading };

