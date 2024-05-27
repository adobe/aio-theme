import React from 'react';
import { css } from '@emotion/react';
import {
  ActionButton,
  Item,
  Menu,
  MenuTrigger,
  Tooltip,
  TooltipTrigger,
} from '@adobe/react-spectrum';

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
            className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
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
              css={css`
                & > button {
                  border: none !important;
                }
              `}>
              {product?.icon ? (
                <TooltipTrigger delay={0}>
                  <ActionButton aria-label="Edit Name">
                    <img
                      src={product?.icon}
                      css={css`
                        width: 35px;
                        cursor: pointer;
                      `}
                    />
                  </ActionButton>
                  <Tooltip>{product?.label}</Tooltip>
                </TooltipTrigger>
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
      <div
        css={css`
          &>button, & > button : active {
            border: none;
            background: transparent !important;
          }
        `}>
        <MenuTrigger>
          <ActionButton>
            {productList.length - 2 > 0 && (
              <div
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
          <Menu items={productList}>{item => <Item key={item.label}>{item.label}</Item>}</Menu>
        </MenuTrigger>
      </div>
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
                  className="spectrum-FieldLabel spectrum-FieldLabel--sizeM"
                  css={css`
                    color: var(--spectrum-global-color-gray-700);
                  `}>
                  {data?.label}
                </label>
              </div>
            );
        })}

      {productList?.length > 2 && (
        <div
          css={css`
            &>button, & > button : active {
              border: none;
              background: transparent !important;
            }
          `}>
          <MenuTrigger>
            <ActionButton>
              {productList?.length - 2 > 0 && (
                <div
                  aria-expanded={true}
                  css={css`
                    text-decoration-color: blue;
                    text-decoration: underline;
                    color: blue;
                    display: 'inline-block';
                    cursor: pointer;
                  `}>
                  +{productList?.length - 2} more
                </div>
              )}
            </ActionButton>
            <Menu items={productList}>{item => <Item key={item.label}>{item.label}</Item>}</Menu>
          </MenuTrigger>
        </div>
      )}
    </>
  );
};

export { Product, Products, CardProducts, CardProduct };
