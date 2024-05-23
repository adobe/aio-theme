import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Toast } from '../Toast';
import classNames from 'classnames';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH, LinkOut, KeyIcon } from './FormFields';
import { ReturnAccessToken } from './Return/ReturnAccessToken';
import { ProjectsDropdown } from './Return/ProjectsDropdown';
import { ReturnDevConsoleLink } from './Return/ReturnDevConsoleLink';
import { ReturnManageDeveloperConsole } from './Return/ReturnManageDeveloperConsole';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnProducts } from './Return/ReturnProducts';
import { ReturnAPIKey } from './Return/ReturnAPIKey';
import { ReturnAllowedOrigins } from './Return/ReturnAllowedOrigins';
import { ReturnOrganizationName } from './Return/ReturnOrganizationName';
import GetCredentialContext from './GetCredentialContext';
import { CredentialDetailsCard } from './CredentialDetailsCard';

const PreviousProject = ({ returnFields, productList }) => {

  const { getCredentialData, selectedOrganization, template } = useContext(GetCredentialContext);
  const returnProps = getCredentialData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isCopiedTooltip, setCopiedTooltip] = useState('');
  const [token, setToken] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [clientId, setClientId] = useState();

  const previousProjectsDetails = JSON.parse(localStorage.getItem(`credential_${template.id}`));
  const previousProject = returnProps?.[PreviousProject];
  const projectsDropdown = returnFields?.[ProjectsDropdown];
  const returnAccessToken = returnFields?.[ReturnAccessToken];
  const returnDevConsoleLink = returnFields?.[ReturnDevConsoleLink];
  const returnManageDeveloperConsole = returnFields?.[ReturnManageDeveloperConsole];
  const returnCredentialDetails = returnFields?.[ReturnCredentialDetails];
  const returnClientId = returnFields?.[ReturnClientId];
  const returnClientSecret = returnFields?.[ReturnClientSecret];
  const returnScopes = returnFields?.[ReturnScopes];
  const returnAPIKey = returnFields?.[ReturnAPIKey];
  const returnOrganizationName = returnFields?.[ReturnOrganizationName];
  const returnAllowedOrigins = returnFields?.[ReturnAllowedOrigins];

  const response = previousProjectsDetails?.[selectedIndex]?.credential;
  const projectDetails = previousProjectsDetails?.[selectedIndex]?.formData;

  console.log('previousProject', previousProject)

  return (
    <>
      <div
        className={classNames(previousProject?.className)}
        css={css`
          display : flex;
          flex-direction : column;
          gap:24px;
        `}>
        {previousProject?.title && <h3 className='spectrum-Heading spectrum-Heading--sizeM'>{previousProject?.title}</h3>}

        {previousProject?.paragraph && <p className="spectrum-Body spectrum-Body--sizeL">{previousProject?.paragraph}</p>}

        {returnManageDeveloperConsole && <ReturnManageDeveloperConsole returnManageDeveloperConsole={returnManageDeveloperConsole} />}

        {projectsDropdown && <ProjectsDropdown projectsDropdown={projectsDropdown} previousProjectsDetails={previousProjectsDetails} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />}

        {/* ----------- credential form ------------  */}

        <CredentialDetailsCard
          credentialName={previousProjectsDetails?.[selectedIndex]?.formData?.CredentialName}
          productList={productList}
          ProductComponent={ReturnProducts}
          accessToken={returnAccessToken}
          AccessTokenComponent={ReturnAccessToken}
          token={token}
          devConsoleLinkHeading={returnDevConsoleLink?.heading}
          DevConsoleLinkComponent={ReturnDevConsoleLink}
          projectId={response?.projectId}
          ClientDetailsComponent={ReturnCredentialDetails}
          clientDetails={returnCredentialDetails}
          clientIdDetails={returnClientId}
          clientSecretDetails={returnClientSecret}
          organizationDetails={returnOrganizationName}
          scopesDetails={returnScopes}
          apiKey={response?.['apiKey']}
          allowedOriginsDetails={projectDetails?.['AllowedOrigins']}
          organizationName={selectedOrganization}
          apiKeyDetails={returnAPIKey}
          allowedOrigins={returnAllowedOrigins}
          clientSecret={clientSecret}
          clientId={response?.['apiKey']}
          nextButtonLabel={'Next steps'}
          developerConsoleManage={'Manage on Developer Console'}
          response={response}
          nextButtonLink={previousProject?.nextStepsHref}
          devConsoleLink={"/console"}
        />


      </div>
      {isCopiedTooltip && <Toast variant='success' message="Copied to clipboard" disable={1000} customDisableFunction={setCopiedTooltip} />}
    </>

  )
};

export { PreviousProject };
