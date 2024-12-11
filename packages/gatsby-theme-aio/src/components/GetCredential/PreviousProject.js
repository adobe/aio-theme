import React, { useContext, useState } from 'react';
import { css } from '@emotion/react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Toast } from '../Toast';
import classNames from 'classnames';
import { ReturnAccessToken } from './Return/ReturnAccessToken';
import { ProjectsDropdown } from './Return/ProjectsDropdown';
import { ReturnDevConsoleLink } from './Return/ReturnDevConsoleLink';
import { ReturnManageDeveloperConsole } from './Return/ReturnManageDeveloperConsole';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';
import { CardProducts } from './Products';
import GetCredentialContext from './GetCredentialContext';
import { CredentialDetailsCard } from './CredentialDetailsCard';

const PreviousProject = ({ returnFields, productList, collapse }) => {

  const { getCredentialData: returnProps, selectedOrganization, previousProjectDetail } = useContext(GetCredentialContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isCopiedTooltip, setCopiedTooltip] = useState('');

  const previousProjectsDetails = previousProjectDetail?.projects
  const previousProject = returnProps?.[PreviousProject];
  const projectsDropdown = returnFields?.[ProjectsDropdown];
  const returnManageDeveloperConsole = returnFields?.[ReturnManageDeveloperConsole];
  const response = previousProjectsDetails?.[selectedIndex];
  const projectDetails = previousProjectsDetails?.[selectedIndex];
  const manageProps = returnProps[PreviousProject];

  const allowedDomains = projectDetails?.workspaces[0]?.credentials[0]?.metadata?.["adobeid.domain"];

  return (
    <>
      <div
        className={classNames(previousProject?.className)}
        css={css`
          display : flex;
          flex-direction : column;
          gap:24px;
        `}>

        <div
          css={css`
          display: flex;
          flex-direction: column;
          gap: 15px;
        `}
        >
          {previousProject?.title && <h3 className='spectrum-Heading spectrum-Heading--sizeM'>{previousProject?.title}</h3>}
          {previousProject?.paragraph && <p className="spectrum-Body spectrum-Body--sizeM">{previousProject?.paragraph}</p>}
        </div>

        {returnManageDeveloperConsole && <ReturnManageDeveloperConsole returnManageDeveloperConsole={returnManageDeveloperConsole} />}

        {projectsDropdown && <ProjectsDropdown projectsDropdown={projectsDropdown} previousProjectsDetails={previousProjectsDetails} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />}

        {/* ----------- credential form ------------  */}

        <CredentialDetailsCard
          credentialName={previousProjectsDetails?.[selectedIndex]?.title}
          productList={productList}
          ProductComponent={CardProducts}
          AccessTokenComponent={ReturnAccessToken}
          DevConsoleLinkComponent={ReturnDevConsoleLink}
          ClientDetailsComponent={ReturnCredentialDetails}
          allowedOriginsDetails={allowedDomains}
          organizationName={selectedOrganization}
          nextButtonLabel={manageProps?.nextStepsLabel}
          developerConsoleManage={manageProps?.developerConsoleManage}
          response={response}
          nextButtonLink={previousProject?.nextStepsHref}
          devConsoleLink={manageProps?.devConsoleDirection}
          returnFields={returnFields}
          collapse={collapse}
        />

      </div>
      {isCopiedTooltip && <Toast variant='success' message="Copied to clipboard" disable={1000} customDisableFunction={setCopiedTooltip} />}
    </>

  )
};

export { PreviousProject };
