import React, { useContext, useEffect, useRef, useState } from 'react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { css } from '@emotion/react';
import { Button } from "../../Button";
import { RequestAccessModal } from './RequestAccessModal';
import GetCredentialContext from '../GetCredentialContext';
import { Organization } from '../Organization';
import { Products } from '../Products';

const OrganizationAccessDetails = ({ restrictedAccess, products }) => {

  const { template, selectedOrganization } = useContext(GetCredentialContext);
  const [isOpen, setIsOpen] = useState(false);

  let productList = [];

  if (Array.isArray(products?.children)) {
    productList = products?.children.map((child) => (child?.props))
  } else {
    productList.push(products?.children?.props);
  }

  let product = { productList };

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

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
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0px;
        `} data-cy="accessDetails">
        {restrictedAccess?.title && (
          <h6 className="spectrum-Heading spectrum-Heading--sizeXXS">{restrictedAccess?.title}</h6>
        )}
        <p className="spectrum-Body spectrum-Body--sizeS">
          You’re creating this credential in {' '}
          {selectedOrganization.type === "developer" ?
            "your personal developer organization" :
            <>
              [
              <span className="spectrum-Heading spectrum-Heading--sizeXXS">
                {selectedOrganization.name}
              </span>
              ]
            </>} but you do not have a developer access in this organization and need admin approval to
          use this API.
          <span
            css={css`
              margin-left: 3px;

              & > span {
                color: #000000;
              }

              &>span: hover {
                color: #000000;
              }

              & > div {
                display: inline;
              }

              span {
                padding: 0px 0px 0px 3px !important;
              }
            `}>
            <Organization />
          </span>
        </p>
        {products && <Products products={products} product={product} />}
        {restrictedAccess?.buttonLabel && (
          template.requestAccessAppId && <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}>
            <div>
              <div
                css={css`
                  button {
                    cursor: pointer;
                  }

                  button: hover {
                    background-color: #d5d5d5 !important;
                    color: #000000;
                  }

                  button: active {
                    background-color: var(--spectrum-gray-400) !important;
                  }

                `}>
                {!template.isRequestPending ? <div onClick={handleClose}><Button isDisabled={template.isRequestPending} data-cy="request-access-button">{restrictedAccess?.buttonLabel}</Button></div> :
                  <div css={css`
                    display : flex;
                    gap:10px;
                    align-items:center;
                  `}>
                    <p css={css`margin:0;font-style: italic;`}>Request Pending</p>
                    <div class="spectrum-ContextualHelp"
                      css={css`
                        & > button {
                          border: none;
                          padding: 4px !important;
                          border-radius: 2px !important;
                        }
                      `}
                    >
                      <button ref={buttonRef} className="spectrum-ActionButton spectrum-ActionButton--sizeXS spectrum-ContextualHelp-button" data-cy="request-info">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18 " fill="#464646">
                          <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
                          <path class="fill" d="M10.075,6A1.075,1.075,0,1,1,9,4.925H9A1.075,1.075,0,0,1,10.075,6Zm.09173,6H10V8.2A.20005.20005,0,0,0,9.8,8H7.83324S7.25,8.01612,7.25,8.5c0,.48365.58325.5.58325.5H8v3H7.83325s-.58325.01612-.58325.5c0,.48365.58325.5.58325.5h2.3335s.58325-.01635.58325-.5C10.75,12.01612,10.16673,12,10.16673,12ZM9,.5A8.5,8.5,0,1,0,17.5,9,8.5,8.5,0,0,0,9,.5ZM9,15.6748A6.67481,6.67481,0,1,1,15.67484,9,6.67481,6.67481,0,0,1,9,15.6748Z" />
                        </svg>
                      </button>
                      <div className={`spectrum-Popover spectrum-Popover--bottom-start spectrum-ContextualHelp-popover ${isVisible && "is-open"}`} role="presentation"
                        css={css`
                          padding:25px;
                          display : flex;
                          gap:10px;
                          flex-direction:column;
                          width: 300px;`}
                      >
                        <h2 class="spectrum-ContextualHelp-heading" css={css`font-size:18px;margin:0;`}>Your request is pending approval</h2>
                        <p class="spectrum-ContextualHelp-body">You'll hear back from your admin soon. If your request is approved, you'll get an email with instructions on how to start using your apps and service
                          <a
                            href="https://www.adobe.com/go/user_request_access"
                            css={css`color:black;`}
                          > Learn more about requesting Adobe apps.</a></p>
                      </div>
                      <div className="dummy-spacing" style="position: relative; min-width: 150px; max-width: 50%;"></div>
                    </div>
                  </div>
                }
              </div>
              {isOpen && <RequestAccessModal accessPlatformAppId={template.requestAccessAppId} close={handleClose} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { OrganizationAccessDetails };
