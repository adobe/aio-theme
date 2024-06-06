import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button } from '@adobe/react-spectrum';
import { Organization } from '../Organization';

import GetCredentialContext from '../GetCredentialContext';
import Context from '../../Context';

const NestedAlertContentEdgeCase = ({ content, isNoProduct }) => {
  const { selectedOrganization } = useContext(GetCredentialContext);
  const { ims } = useContext(Context);

  const [emailID, setEmailID] = useState('');
  useEffect(() => {
    (async () => {
      if (ims && ims.isSignedInUser()) {
        const profile = await ims.getProfile();
        setEmailID(profile?.email);
      }
    })();
  }, [ims]);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0px;
        `}>
        {content?.title &&
          <h6
            className="spectrum-Heading spectrum-Heading--sizeXXS"
            css={css`
            margin-right: 20px;
          `}>
            {content?.title}
          </h6>}
        {isNoProduct ?
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

              & > span, &>span: hover {
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
          :
          <p className="spectrum-Body spectrum-Body--sizeS">
            You are currently signed in with [
            <span className="spectrum-Heading spectrum-Heading--sizeXXS">{emailID}</span>] 
            in organization [<span className="spectrum-Heading spectrum-Heading--sizeXXS">
            {selectedOrganization.name}</span>] and can not access Firefly Services APIs.
            <span
              css={css`
              margin-left: 3px;

              & > span, &>span: hover {
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
        }
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
          {content?.buttonLink && <a href={`${content?.buttonLink}`} target="_blank">{content?.buttonLabel && <Button>{content?.buttonLabel}</Button>}</a>}
        </div>
      </div>
    </>
  );
};

export { NestedAlertContentEdgeCase };
