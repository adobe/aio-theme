import React, { useEffect, useRef, useState } from 'react';
import { css } from "@emotion/react";
import { Popover } from '../Popover';
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import CustomPopover from './CustomPopover';

const Products = ({ products, product }) => {

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        {products?.label &&
          <label
            for="textfield-m"
            className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
            css={css` color: var(--spectrum-global-color-gray-700)`}
          >{products?.label} </label>}
        <Product productList={product?.productList} />
      </div>
    </div>
  )
}

const Product = ({ productList }) => {
  return <CommonProduct productList={productList} />
}

const CardProduct = ({ productList }) => {
  return (
    <>
      {productList?.map((product, index) => {
        if (index < 2)
          return (
            <div
              css={css`
              & > button {
                border : none !important;
              }
            `}
            >
              <TooltipTrigger delay={0}>
                <ActionButton aria-label="Edit Name">
                  <img
                    src={product?.icon}
                    css={css`
                    width: 35px;
                    cursor : pointer;
                  `}
                  />
                </ActionButton>
                <Tooltip>{product?.label}</Tooltip>
              </TooltipTrigger>
            </div>
          )
      })}
    </>
  )
}

const CardProducts = ({ products, product }) => {

  return (
    <div
      css={css`
        display : flex;
        gap : 10px; 
        align-items : center;  
      `}
    >
      <CardProduct productList={product} />
      <CustomPopover productList={product} />
    </div>
  )
}

const CommonProduct = ({ productList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();

  const handleClickOutside = e => {
    if (buttonRef.current.contains(e.target)) setIsOpen(!isOpen);
    else setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <>
      {productList && productList?.map((data, index) => {
        if (index < 3)
          return (
            <div
              css={css`
                  display : flex;
                  align-items : center;
                  gap:10px;
                `}
            >
              <img src={data?.icon} css={css`width: 35px;`} />
              <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                css={css` color: var(--spectrum-global-color-gray-700)`}
              >
                {data?.label}
              </label>
            </div>
          )
      })}

      <div
        css={css`
            display : flex;
            align-items : center;
            gap:10px;
            position : relative;
          `}
      >
        <div css={css`width: 35px;`} />
        <label for="textfield-m" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
          css={css` color: var(--spectrum-global-color-gray-700)`}
        >
          <div
            ref={buttonRef}
            aria-label="productList"
            aria-controls="productList"
            aria-expanded={true}
            css={css`
                text-decoration-color: blue;
                text-decoration : underline;
                color: blue;  
                display: "inline-block";
                cursor:pointer;
              `
            }>+{productList?.length - 2} more</div>
        </label>

        <Popover
          id={"productList"}
          isOpen={isOpen}
          css={css`
              width: var(--spectrum-global-dimension-size-4600);
              max-height: var(--spectrum-global-dimension-size-6000);
              top: 15px;
              margin-left: 40px;
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
              {productList?.map((product) => {
                return <div css={css`padding:5px;`}>{product?.label}</div>
              })}
            </div>
          </div>
        </Popover>

      </div>
    </>
  )
}

export { Product, Products, CardProducts, CardProduct };