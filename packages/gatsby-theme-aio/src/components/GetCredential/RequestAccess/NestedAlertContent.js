import React, { useContext, useEffect, useRef, useState } from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { css } from "@emotion/react";
import { ChangeOrganizationModal } from "./ChangeOrganizationModal";
import { Button, DialogTrigger, Link } from "@adobe/react-spectrum";
import { RequestAccessModal } from "./RequestAccessModal";
import { Popover } from "@adobe/gatsby-theme-aio/src/components/Popover";
import { RestrictedAccessProducts } from "./RestrictedAccessProducts";

import GetCredentialContext from "../GetCredentialContext";

const NestedAlertContent = ({ restrictedAccess, products }) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverElement = useRef();
  const infoButton = useRef();

  const { selectedOrganization } = useContext(GetCredentialContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log(infoButton, popoverElement);
      if (infoButton.current && infoButton.current.contains(event.target)) {
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

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0px;
        `}
      >
        {restrictedAccess?.title && (
          <h6 className="spectrum-Heading spectrum-Heading--sizeXXS">
            {restrictedAccess?.title}
          </h6>
        )}
        <p className="spectrum-Body spectrum-Body--sizeS">
          You’re creating this credential in [
          <span className="spectrum-Heading spectrum-Heading--sizeXXS">
            {selectedOrganization.name}
          </span>
          ] but you do not have a developer access in this organization and need
          admin approval to use this API.
          <span
            css={css`
              margin-left: 3px;

              & > span {
                color: #000000;
              }

              &>span: hover {
                color: #000000;
              }
            `}
          >
            <DialogTrigger>
              <Link>Change organization?</Link>
              {(close) => <ChangeOrganizationModal close={close} />}
            </DialogTrigger>
          </span>
        </p>
        {products && <RestrictedAccessProducts products={products} />}
        {restrictedAccess?.buttonLabel && (
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <DialogTrigger>
              <div
                css={css`
                  button {
                    cursor: pointer;
                    pointer-events: ${isRequested && "none"};
                  }

                  button: hover {
                    background-color: #d5d5d5 !important;
                    color: #000000;
                  }

                  button: active {
                    background-color: var(--spectrum-gray-400) !important;
                  }
                `}
              >
                <Button isDisabled={isRequested}>
                  {restrictedAccess?.buttonLabel}
                </Button>
              </div>
              {(close) => (
                <RequestAccessModal
                  setIsRequested={setIsRequested}
                  close={close}
                />
              )}
            </DialogTrigger>
            {isRequested && (
              <div
                css={css`
                  display: flex;
                  gap: 6px;
                `}
              >
                <button
                  ref={infoButton}
                  onClick={() => {
                    // setIsOpen(true);
                  }}
                  css={css`
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    height: 20px;
                    padding: 3px 3px 3px 3px;
                    background: var(--Palette-gray-300, #d5d5d5);
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                    css={css`
                      width: 14px;
                      height: 14px;
                    `}
                  >
                    <path
                      className="fill"
                      d="M10.075,6A1.075,1.075,0,1,1,9,4.925H9A1.075,1.075,0,0,1,10.075,6Zm.09173,6H10V8.2A.20005.20005,0,0,0,9.8,8H7.83324S7.25,8.01612,7.25,8.5c0,.48365.58325.5.58325.5H8v3H7.83325s-.58325.01612-.58325.5c0,.48365.58325.5.58325.5h2.3335s.58325-.01635.58325-.5C10.75,12.01612,10.16673,12,10.16673,12ZM9,.5A8.5,8.5,0,1,0,17.5,9,8.5,8.5,0,0,0,9,.5ZM9,15.6748A6.67481,6.67481,0,1,1,15.67484,9,6.67481,6.67481,0,0,1,9,15.6748Z"
                    />
                  </svg>
                </button>
                <div ref={popoverElement}>
                  <Popover
                    isOpen={isOpen}
                    css={css`
                      transform: none !important;
                      padding: 20px 24px;
                      width: 269px;
                      display: flex;
                      flex-direction: column;
                      gap: 8px;
                      bottom: 0;
                      box-shadow: 0px 1px 4px 0px #00000026;
                    `}
                  >
                    <h5 className="spectrum-Heading spectrum-Heading--sizeXS">
                      Your request is pending approval
                    </h5>
                    <p
                      className="spectrum-Body spectrum-Body--sizeS"
                      css={css`
                        color: #222222;
                      `}
                    >
                      You’ll hear back from your admin soon. If your request is
                      approved, you’ll get an email with instructions on how to
                      start using your apps and services.{" "}
                      <span
                        css={css`
                          text-decoration: underline;
                        `}
                      >
                        Learn more about requesting Adobe apps
                      </span>
                      .
                    </p>
                  </Popover>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export { NestedAlertContent };
