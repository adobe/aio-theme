import React, { useEffect, useRef, useState } from 'react';
import { css } from "@emotion/react";
import { Popover } from '@adobe/gatsby-theme-aio/src/components/Popover';

const CustomPopover = ({ productList }) => {

  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef();

  const handleClickOutside = e => {
    if (iconRef.current.contains(e.target)) setIsOpen(!isOpen);
    else setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <>
      <div
        ref={iconRef}
        aria-label="credentialProject"
        aria-controls="credentialProject"
        aria-expanded={true}
        css={css`
        text-decoration-color: blue;
        text-decoration : underline;
        color: blue;  
        display: "inline-block";
        cursor:pointer;
      `
        }>+{productList.length - 2} more</div>
      <Popover
        id="credentialProject"
        isOpen={isOpen}
        css={css`
          width: var(--spectrum-global-dimension-size-4600);
          max-height: var(--spectrum-global-dimension-size-6000);
          margin-top: 180px;
        `}>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          `}>
          <div
            css={css`
              padding : 10px 0;
              cursor : pointer;
            `}
          >
            {productList.map((product) => {
              return <div css={css`padding:5px;`}>{product.label}</div>
            })}
          </div>
        </div>
      </Popover>
    </>
  )
}

export default CustomPopover