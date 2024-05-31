import React from 'react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { css } from '@emotion/react';
import { ChangeOrganizationModal } from './ChangeOrganizationModal';
import { Button, DialogTrigger, Link } from '@adobe/react-spectrum';

const NestedAlertContentType1User = () => {
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0px;
        `}>
        <h6
          className="spectrum-Heading spectrum-Heading--sizeXXS"
          css={css`
            margin-right: 20px;
          `}>
          Access to Firefly Services is only available to enterprise accounts at this time.
        </h6>
        <p className="spectrum-Body spectrum-Body--sizeS">
          You are currently signed in with your personal account [
          <span className="spectrum-Heading spectrum-Heading--sizeXXS">name@gmail.com</span>] and
          can not access Firefly Services APIs.
          <span
            css={css`
              margin-left: 3px;

              & > span {
                color: #000000;
              }

              &>span: hover {
                color: #000000;
              }
            `}>
            <DialogTrigger>
              <Link>Change organization?</Link>
              {close => <ChangeOrganizationModal close={close} />}
            </DialogTrigger>
          </span>
        </p>
        <div
          css={css`
            button {
              cursor: pointer;
              border-color: #292929 !important;
            }

            button: hover {
              background-color: #d5d5d5 !important;
              color: #000000;
            }

            button: active {
              background-color: var(--spectrum-gray-400) !important;
            }

            button > span {
              color: #292929;
            }
          `}>
          <Button>Learn more about Firefly Services</Button>
        </div>
      </div>
    </>
  );
};

export { NestedAlertContentType1User };
