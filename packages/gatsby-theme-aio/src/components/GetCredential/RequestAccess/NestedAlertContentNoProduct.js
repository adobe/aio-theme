import React, { useContext } from 'react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { css } from '@emotion/react';
import { ChangeOrganizationModal } from './ChangeOrganizationModal';
import { Button, DialogTrigger, Link } from '@adobe/react-spectrum';

import GetCredentialContext from '../GetCredentialContext';

const NestedAlertContentNoProduct = () => {
  const { selectedOrganization } = useContext(GetCredentialContext);

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
          Your organization does not have access to Firefly Services
        </h6>
        <p className="spectrum-Body spectrum-Body--sizeS">
          The organization [
          <span className="spectrum-Heading spectrum-Heading--sizeXXS">
            {selectedOrganization.name}
          </span>
          ] currently does not have access to these APIs Contact us to learn more about Firefly
          Services APIs and how to get a free trial.
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
          <Button>Contact us to learn more</Button>
        </div>
      </div>
    </>
  );
};

export { NestedAlertContentNoProduct };
