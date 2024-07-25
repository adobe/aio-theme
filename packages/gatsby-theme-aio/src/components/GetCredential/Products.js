import React, { useRef, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ActionButton } from "../ActionButton"

const Products = ({ products, product }) => {
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}>
        {products?.label && (
          <label
            for="textfield-m"
            className="spectrum-Body spectrum-Body--sizeS"
            css={css`
              color: var(--spectrum-global-color-gray-700);
            `}>
            {products?.label}{' '}
          </label>
        )}
        <Product productList={product?.productList} />
      </div>
    </div>
  );
};

const Product = ({ productList }) => {
  return <CommonProduct productList={productList} />;
};

const CardProduct = ({ productList }) => {
  return (
    <>
      {productList?.map((product, index) => {
        if (index < 2)
          return (
            <div
              key={index}
              css={css`
                position: relative;
                display: inline-block;
                .tooltip {
                  visibility: hidden;
                  background-color: #555;
                  color: #fff;
                  text-align: center;
                  border-radius: 6px;
                  padding: 5px;
                  position: absolute;
                  z-index: 1;
                  bottom: 125%; 
                  left: 50%;
                  transform: translateX(-50%);
                  opacity: 0;
                  transition: opacity 0.3s;
                  white-space: normal; 
                  word-wrap: break-word; 
                  width: 120px;
                  font-size:12px;
                }
                &:hover .tooltip {
                  visibility: visible;
                  opacity: 1;
                }
                .tooltip::after {
                  content: " ";
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  margin-left: -5px;
                  border-width: 5px;
                  border-style: solid;
                  border-color: #555 transparent transparent transparent; /* Arrow pointing down */
                }
              `}
            >
              {product?.icon ? (
                <div className="spectrum-TooltipTrigger spectrum-TooltipTrigger--focus">
                  <button
                    aria-label="Edit Name"
                    className="spectrum-ActionButton"
                    css={css`
                      border: none !important;
                    `}
                  >
                    <img
                      src={product?.icon}
                      alt={product?.label}
                      css={css`
                        width: 35px;
                        cursor: pointer;
                      `}
                    />
                  </button>
                  <span className="tooltip ">{product?.label}</span>
                </div>
              ) : (
                <p className="spectrum-Body spectrum-Body--sizeS">{product?.label}</p>
              )}
            </div>
          );
      })}
    </>
  );
};

const CardProducts = ({ productList }) => {

  return (
    <div
      css={css`
        display: flex;
        gap: 10px;
        align-items: center;
      `}>
      <CardProduct productList={productList} />
      <ModelTrigger productList={productList} />
    </div>
  );
};

const CommonProduct = ({ productList }) => {

  return (
    <>
      {productList &&
        productList?.map((data, index) => {
          if (index < 2)
            return (
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 10px;
                `}>
                <img
                  src={data?.icon}
                  css={css`
                    width: 35px;
                  `}
                />
                <label
                  for="textfield-m"
                  className="spectrum-Body spectrum-Body--sizeS"
                  css={css`
                    color: var(--spectrum-global-color-gray-700);
                  `}>
                  {data?.label}
                </label>
              </div>
            );
        })}

      {productList?.length > 2 && (
        <ModelTrigger productList={productList} />
      )}
    </>
  );
};

const ModelTrigger = ({ productList }) => {

  const [isVisible, setisVisible] = useState(false);
  const buttonRef = useRef();

  const handleClickOutside = e => {
    if (buttonRef?.current?.contains(e.target)) setisVisible(!isVisible);
    else setisVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <>
      <div
        css={css`
          &>button, & > button : active {
            border: none;
            background: transparent !important;
          }
        `}>
        <ActionButton>
          {productList.length - 2 > 0 && (
            <div
              ref={buttonRef}
              aria-expanded={true}
              css={css`
                  text-decoration-color: blue;
                  text-decoration: underline;
                  color: blue;
                  display: 'inline-block';
                  cursor: pointer;
                `}>
              +{productList.length - 2} more
            </div>
          )}
        </ActionButton>
        {isVisible && <div class="spectrum-Examples"
          css={css`
            z-index:20;
            margin-left: -45px;
            margin-top: 20px;
            position: absolute;
            background: white;
            border: 1px solid;
            border-color: var(--spectrum-popover-border-color, var(--spectrum-alias-border-color-dark));
            border-radius: var(--spectrum-alias-border-radius-regular, var(--spectrum-global-dimension-size-50));
            border-style: solid;
            border-width: var(--spectrum-popover-border-size, var(--spectrum-alias-border-size-thin));
            flex-direction: column;
            max-height: 100%;
            display: inline-flex;
            background-color: var(--spectrum-popover-background-color, var(--spectrum-global-color-gray-50));
          `}
        >
          <div class="spectrum-Examples-item">
            <div class="spectrum-Examples-itemGroup">
              <ul class="spectrum-Menu spectrum-Menu--sizeS" role="menu">
                {productList.map((product) => {
                  return (
                    <li class="spectrum-Menu-item" role="menuitem" tabindex="0">
                      <span class="spectrum-Menu-itemLabel">{product.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>}
      </div>
    </>
  )
}

export { Product, Products, CardProducts, CardProduct };
