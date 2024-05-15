import React, { useEffect, useRef, useState } from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { css } from "@emotion/react";
import { Popover } from "../../Popover";
import { RestrictedAccessProduct } from "./RestrictedAccessProduct";

export const RestrictedAccessProducts = ({ products }) => {
  let productList = [];
  const [isOpen, setIsOpen] = useState(false);
  const popoverElement = useRef();
  const moreButton = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreButton.current && moreButton.current.contains(event.target)) {
        setIsOpen(true);
      } else if (
        popoverElement.current &&
        !popoverElement.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (Array.isArray(products?.children)) {
    productList = products?.children;
  } else {
    productList.push(products?.children);
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        {products?.label && (
          <p
            className="spectrum-Body spectrum-Body--sizeXS"
            css={css`
              color: #464646;
            `}
          >
            {products?.label}
          </p>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          {productList?.map(({ props }, index) => {
            if (index < 2) {
              return <RestrictedAccessProduct product={props} />;
            }
          })}
        </div>
        {productList.length - 2 > 0 && (
          <>
            <p
              className="spectrum-Body spectrum-Body--sizeS"
              ref={moreButton}
              css={css`
                color: #0265dc;
                cursor: pointer;
                width: fit-content;
              `}
            >
              +
              <span
                css={css`
                  text-decoration: underline;
                  margin-left: 2px;
                `}
              >
                {productList.length - 2} more
              </span>
            </p>
            <div ref={popoverElement}>
              <Popover
                isOpen={isOpen}
                css={css`
                  transform: none !important;
                  padding: 20px 24px;
                  box-shadow: 0px 1px 4px 0px #00000026;
                `}
              >
                {productList?.map(({ props }, index) => {
                  return (
                    <p
                      className="spectrum-Body spectrum-Body--sizeS"
                      css={css`
                        color: #222222;
                      `}
                    >
                      {props?.label}
                    </p>
                  );
                })}
              </Popover>
            </div>
          </>
        )}
      </div>
    </>
  );
};
