import React, { useContext } from 'react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { css } from '@emotion/react';
import { Button, Content, ContextualHelp, DialogTrigger, Flex, Heading, Text, Link } from '@adobe/react-spectrum';
import { RequestAccessModal } from './RequestAccessModal';
import GetCredentialContext from '../GetCredentialContext';
import { Organization } from '../Organization';
import { Products } from '../Products';

const OrganizationAccessDetails = ({ restrictedAccess, products }) => {

  const { template, selectedOrganization } = useContext(GetCredentialContext);

  let productList = [];

  if (Array.isArray(products?.children)) {
    productList = products?.children.map((child) => (child?.props))
  } else {
    productList.push(products?.children?.props);
  }

  let product = { productList };

  const TriggerDialog = template.isRequestPending ? "div" : DialogTrigger;

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
          template.requestAccessAppId && <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}>
            <TriggerDialog>
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
                {!template.isRequestPending ? <Button isDisabled={template.isRequestPending}>{restrictedAccess?.buttonLabel}</Button> :
                  <Flex gap="size-100" direction="row" alignItems="center">
                    <p css={css`margin:0;font-style: italic;`}>Request Pending</p>
                    <ContextualHelp variant="info">
                      <Heading>Your request is pending approval</Heading>
                      <Content>
                        <Text>
                          You'll hear back from your admin soon. If your request is approved, you'll get an email with instructions on how to start using your apps and service <Link href="https://www.adobe.com/go/user_request_access" variant="secondary">Learn more about requesting Adobe apps.</Link>
                        </Text>
                      </Content>
                    </ContextualHelp>
                  </Flex>
                }
              </div>
              {close => <RequestAccessModal accessPlatformAppId={template.requestAccessAppId} close={close} />}
            </TriggerDialog>
          </div>
        )}
      </div>
    </>
  );
};

export { OrganizationAccessDetails };
