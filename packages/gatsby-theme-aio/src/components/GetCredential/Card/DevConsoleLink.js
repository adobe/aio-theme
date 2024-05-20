import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { LinkOut, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from '../FormFields';
import GetCredentialContext from '../GetCredentialContext';

const DevConsoleLink = ({ cardDevConsoleLink, formData, response }) => {

  const { selectedOrganization } = useContext(GetCredentialContext);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}>
        {cardDevConsoleLink?.heading && (
          <h4 className="spectrum-Heading spectrum-Heading--sizeS">
            {cardDevConsoleLink?.heading}
          </h4>
        )}

        <a
          css={css`
            display: flex;
          `}
          target='_blank'
          href={`https://developer-stage.adobe.com/console/projects/${selectedOrganization.id}/${response.projectId}/overview`}>
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
              {formData['CredentialName']}
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
