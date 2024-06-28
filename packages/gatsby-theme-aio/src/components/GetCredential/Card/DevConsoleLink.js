import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from '../FormFields';
import GetCredentialContext from '../GetCredentialContext';
import { LinkOut } from '../Icons';

const DevConsoleLink = ({ devConsoleLinkHeading, credentialName, projectId }) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}>
        {devConsoleLinkHeading && (
          <h4 className="spectrum-Heading spectrum-Heading--sizeS">
            {devConsoleLinkHeading}
          </h4>
        )}

        <a
          css={css`
            display: flex;
          `}
          target='_blank'
          href={`/console/projects/${selectedOrganization?.id}/${projectId}/overview`}
          data-cy="credentialName-link">
          <div>
            <p
              className="spectrum-Body spectrum-Body--sizeS"
              css={css`
                font-family: Source Code Pro, Monaco, monospace;
                white-space: normal;
                overflow-wrap: anywhere;
                max-width: 300px;
                color: #0265dc;
              `}>
              {credentialName}
            </p>
          </div>
          <div
            css={css`
              margin-left:10px;
              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                display:none;
              }
            }`}>
            <LinkOut />
          </div>
        </a>
      </div>
    </>
  );
};

export { DevConsoleLink };
