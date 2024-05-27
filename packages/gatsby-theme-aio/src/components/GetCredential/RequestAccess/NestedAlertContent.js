import React, { useContext } from 'react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { css } from '@emotion/react';
import { Button, DialogTrigger } from '@adobe/react-spectrum';
import { RequestAccessModal } from './RequestAccessModal';
import GetCredentialContext from '../GetCredentialContext';
import { Organization } from '../Organization';
import { Products } from '../Products';

const NestedAlertContent = ({ restrictedAccess, products }) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  let productList = []

  if (Array.isArray(products?.children)) {
    productList = products?.children.map((child) => (child?.props))
  } else {
    productList.push(products?.children?.props);
  }

  let product = { productList };

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0px;
        `}>
        {restrictedAccess?.title && (
          <h6 className="spectrum-Heading spectrum-Heading--sizeXXS">{restrictedAccess?.title}</h6>
        )}
        <p className="spectrum-Body spectrum-Body--sizeS">
          You’re creating this credential in [
          <span className="spectrum-Heading spectrum-Heading--sizeXXS">
            {selectedOrganization.name}
          </span>
          ] but you do not have a developer access in this organization and need admin approval to
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
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}>
            <DialogTrigger>
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
                <Button>{restrictedAccess?.buttonLabel}</Button>
              </div>
              {close => <RequestAccessModal close={close} />}
            </DialogTrigger>
          </div>
        )}
      </div>
    </>
  );
};

export { NestedAlertContent };
