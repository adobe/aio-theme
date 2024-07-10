import React, { useContext } from 'react';
import { RestrictedAccess } from './RestrictedAccessFields';
import { css } from '@emotion/react';
import { MAX_MOBILE_WIDTH } from '../FormFields';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { RequestAccessSide } from './RequestAccessSide';
import GetCredentialContext from '../GetCredentialContext';
import { OrganizationAccessDetailsEdgeCase } from './OrganizationAccessDetailsEdgeCase';

const RequestAccess = ({}) => {
  const { getCredentialData } = useContext(GetCredentialContext);

  const requestAccess = getCredentialData?.[RequestAccess];
  let side, restrictedAccess, organizationAccessDetailsEdgeCase;

  if (Array.isArray(requestAccess?.children)) {
    requestAccess?.children?.forEach(({ type, props }) => {
      if (type === RequestAccessSide) {
        side = props?.children;
      }
      if (type === RestrictedAccess) {
        restrictedAccess = props;
      }
      if (type === OrganizationAccessDetailsEdgeCase) {
        organizationAccessDetailsEdgeCase = props;
      }
    });
  } else {
    restrictedAccess = requestAccess?.children?.props;
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 48px;
        `}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}>
          {requestAccess?.title && (
            <h1 className="spectrum-Heading spectrum-Heading--sizeXL">{requestAccess?.title}</h1>
          )}
          {requestAccess?.paragraph && (
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                color: #222222;
              `}>
              {requestAccess?.paragraph}
            </p>
          )}
        </div>
        <div
          css={css`
            display: flex;
            gap: 48px;

            @media screen and (max-width: ${MAX_MOBILE_WIDTH}) {
              flex-direction: column;
            }
          `}>
          {restrictedAccess && <RestrictedAccess restrictedAccess={restrictedAccess} organizationAccessDetailsEdgeCase={organizationAccessDetailsEdgeCase} />}
          {side && <RequestAccessSide side={side} />}
        </div>
      </div>
    </>
  );
};

export { RequestAccess };
