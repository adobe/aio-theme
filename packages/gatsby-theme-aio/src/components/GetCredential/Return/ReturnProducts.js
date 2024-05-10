import React from 'react';
import { css } from "@emotion/react";
import { ReturnProduct } from "./ReturnProduct";
import { ActionButton, Item, Menu, MenuTrigger } from '@adobe/react-spectrum';

const ReturnProducts = ({ productList }) => {
  return (
    <div
      css={css`
          display : flex;
          gap : 10px; 
          align-items : center;  
        `}
    >
      <ReturnProduct productList={productList} />
      <div
        css={css`
          & > button , & > button : active {
            border:none;
            background:transparent !important;
          }`}
      >
        <MenuTrigger>
          <ActionButton>
            <div
              aria-expanded={true}
              css={css`
                text-decoration-color: blue;
                text-decoration : underline;
                color: blue;  
                display: "inline-block";
                cursor:pointer;
              `
              }>+{productList.length - 2} more</div>
          </ActionButton>
          <Menu items={productList}>
            {item => <Item key={item.label}>{item.label}</Item>}
          </Menu>
        </MenuTrigger>
      </div>
    </div>
  )
}

export { ReturnProducts };
