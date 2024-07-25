import React, { useEffect, useRef } from 'react';
import { css } from "@emotion/react";
import { ProgressCircle } from '../ProgressCircle';

const Loading = ({
  credentials,
  downloadStatus,
  isCreateCredential,
  initialLoading
}) => {
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [])

  return (
    <>
      {credentials?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentials?.title}</h3>}
      <div css={css`
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          gap:10px;
        `}
          data-cy="loader">
        <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        {initialLoading &&
          <div ref={divRef}
            css={css`
            font-style: italic;
            font-family: 'adobe-clean';
            color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-600));
          `}
          >
            {"Loading..."}
          </div>}
        <div ref={divRef}
          css={css`
            font-style: italic;
            font-family: 'adobe-clean';
            color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-600));
          `}
        >
          {isCreateCredential && "Creating credentials..."}
        </div>
        {downloadStatus &&
          <div
            css={css`
              color: var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-600));
            `}
          >This process may take a few moments. Once complete, your download will start.</div>
        }
      </div>
    </>
  )
}

export { Loading };
