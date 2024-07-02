import React, { useContext, useEffect, useState } from 'react';
import { SignIn } from "./SignIn"
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { IllustratedMessage } from './IllustratedMessage';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { JoinBetaProgram } from './JoinBetaProgram';
import ErrorBoundary from './ErrorBoundary';
import { Product, Products, CardProduct, CardProducts } from './Products';
import { Loading } from './Loading';
import { CredentialForm } from './CredentialForm';
import { CredentialName } from './Form/CredentialName';
import { AllowedOrigins } from './Form/AllowedOrigins';
import { SideComponent } from './SideComponent';
import { Downloads } from './Form/Downloads';
import { Download } from './Form/Download';
import { AdobeDeveloperConsole } from './Form/AdobeDeveloperConsole';
import { CardClientDetails } from './Card/CardClientDetails';
import { CardClientId } from './Card/CardClientId';
import { CardClientSecret } from './Card/CardClientSecret';
import { CardOrganizationName } from './Card/CardOrganizationName';
import { CardScopes } from './Card/CardScopes';
import { CardAllowedOrigins } from './Card/CardAllowedOrigins';
import { CardAPIKey } from './Card/CardAPIKey';
import { PreviousProject } from './PreviousProject';
import { PreviousCredential } from "./PreviousCredential";
import { ReturnAccessToken } from './Return/ReturnAccessToken';
import { ProjectsDropdown } from './Return/ProjectsDropdown';
import { ReturnManageDeveloperConsole } from './Return/ReturnManageDeveloperConsole';
import { ReturnDevConsoleLink } from './Return/ReturnDevConsoleLink';
import { RetunrSideComp } from './Return/RetunrSideComp';
import { ReturnCustomComp } from './Return/ReturnCustomComp';
import { ReturnNewCredential } from './Return/ReturnNewCredential';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnOrganizationName } from './Return/ReturnOrganizationName';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnAllowedOrigins } from './Return/ReturnAllowedOrigins';
import { ReturnAPIKey } from './Return/ReturnAPIKey';
import { MyCredential } from './MyCredential';
import { AccessToken } from './Card/AccessToken';
import { DevConsoleLink } from './Card/DevConsoleLink';
import { RequestAccess } from "./RequestAccess/RequestAccess"
import { RestrictedAccess } from './RequestAccess/RestrictedAccessFields';
import { RequestAccessSide } from "./RequestAccess/RequestAccessSide";
import Context from '../Context';
import GetCredentialContext from './GetCredentialContext';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';
import { OrganizationAccessDetailsEdgeCase } from './RequestAccess/OrganizationAccessDetailsEdgeCase';
import { OrganizationAccessDetailsNoProduct } from './RequestAccess/OrganizationAccessDetailsNoProduct';
import { OrganizationAccessDetailsType1User } from './RequestAccess/OrganizationAccessDetailsType1User';
import { OrganizationAccessDetailsNotMember } from './RequestAccess/OrganizationAccessDetailsNotMember';
import { OrganizationAccessDetailsNotSignUp } from './RequestAccess/OrganizationAccessDetailsNotSignUp';
import { getOrganizations } from './Service';

const LocalStorageKey = 'OrgInfo';

const GetCredential = ({ templateId, children, className }) => {
  const isBrowser = typeof window !== "undefined";
  const [isPrevious, setIsPrevious] = useState(false);
  const [selectedOrganization, setOrganization] = useState(undefined);
  const [orgsLoading, setOrgsLoading] = useState(true);
  const [templateLoading, setTemplateLoading] = useState(true);
  const [previousProjectsLoading, setPreviousProjectsLoading] = useState(false);
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [isCreateNewCredential, setIsCreateNewCredential] = useState(false);
  const [template, setTemplate] = useState(null);
  const [isError, setIsError] = useState(false);
  const [previousProjectDetail, setPreviousProjectDetail] = useState();

  if (!templateId) {
    console.error('No template id provided. Cannot continue. Will fail.');
  }

  const { isLoadingIms } = useContext(Context);

  let getCredentialData = {};
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.props) {
      getCredentialData[child.type] = child.props;
    }
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setIsError(false);
        setTemplateLoading(true);
        setTemplate(null);
        const url = `/templates/${templateId}`
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.adobeIMS.getTokenFromStorage().token}`,
            "x-api-key": window.adobeIMS.adobeIdData.client_id,
            "x-org-id": selectedOrganization.code
          }
        });

        if (!response.ok) {
          console.error('Template not found. Please check template id');
          setIsError(true);
          return;
        }
        setTemplate(await response.json());
        setTemplateLoading(false);
      }
      catch (error) {
        console.error('Error fetching template:', error);
        setIsError(true);
        setTemplateLoading(false);
      }
    }

    if (templateId && selectedOrganization?.code) {
      fetchTemplate();
    }
  }, [selectedOrganization]);

  const switchOrganization = async (org) => {
    const { userId: accountId } = (await window.adobeIMS.getProfile());

    if (!org) {
      // this means it's initial load. Try reading from local storage
      const orgInLocalStorage = JSON.parse(localStorage.getItem(LocalStorageKey));
      console.log('Found', orgInLocalStorage?.name, 'in local storage');

      // check if the user has access to the org
      if (orgInLocalStorage) {
        org = allOrganizations.filter(o => o.code === orgInLocalStorage.code && accountId === orgInLocalStorage.accountId)[0];
        console.log(`Org in local storage ${org ? '' : 'not '}accessible`);
      }

      // if no accessible org found in local storage, we pick the default org
      if (!org) {
        console.log('No accessible org found in local storage. Removing entry in local storage, if exists and picking default org');
        localStorage.removeItem(LocalStorageKey);
        const currentAccountOrgs = allOrganizations.filter(o => o.accountId === accountId);
        org = currentAccountOrgs.filter(o => o.default)[0] ?? currentAccountOrgs[0];
      }
    }

    console.log('Switching to org:', org?.name);
    if (!org) {
      throw new Error('No org found to switch to');
    }

    // switch accounts if org requires account switch
    if (accountId !== org.accountId) {
      await window.adobeIMS.switchProfile(org.accountId);
    }

    // set the org in local storage
    localStorage.setItem(LocalStorageKey, JSON.stringify(org));
    setOrganization(org);
  }

  useEffect(() => {
    if (!selectedOrganization && !isLoadingIms && allOrganizations?.length > 0) {
      // switch to default or last used org if no org already selected
      switchOrganization();
    }
  }, [allOrganizations, selectedOrganization, isLoadingIms]);

  useEffect(() => {
    const getPreviousProjects = async () => {
      setPreviousProjectsLoading(true);
      const { userId } = await window.adobeIMS.getProfile();
      const previousProjectDetailsUrl = `/console/api/organizations/${selectedOrganization?.id}/search/projects?templateId=${templateId}&createdBy=${userId}&excludeUserProfiles=true&skipReadOnlyCheck=true`;
      const token = window.adobeIMS?.getTokenFromStorage()?.token;
      const previousProjectDetailsResponse = await fetch(previousProjectDetailsUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-api-key': window.adobeIMS?.adobeIdData?.client_id,
        },
      });

      const previousProjectDetails = await previousProjectDetailsResponse.json();
      setPreviousProjectDetail(previousProjectDetails);

      if (previousProjectDetails.count) {
        setIsPrevious(true);
        setPreviousProjectsLoading(false);
      } else {
        setIsPrevious(false);
        setPreviousProjectsLoading(false);
      }
    }

    if (selectedOrganization?.id && templateId && template?.userEntitled && !isCreateNewCredential) {
      getPreviousProjects();
    }

  }, [template, isCreateNewCredential]);

  useEffect(async () => {
    // if IMS is still loading, do nothing
    if (isLoadingIms) {
      return;
    }

    // if user not signed in, set loading to false so that the sign in screen renders
    if (!window.adobeIMS.isSignedInUser()) {
      setTemplateLoading(false);
      setPreviousProjectsLoading(false);
      setOrgsLoading(false);
      return;
    }

    setOrgsLoading(true);
    const organizations = await getOrganizations();

    if (!organizations || organizations.length < 1) {
      console.error('No organizations found for the user. Cannot continue.');
      setIsError(true);
      setOrgsLoading(false);
      return;
    }

    setAllOrganizations(organizations);
    setOrgsLoading(false);

  }, [isLoadingIms]);

  useEffect(() => {

    if (!isPrevious) {
      setShowCreateForm(true)
    }
    else {
      if (isPrevious && isCreateNewCredential) {
        setShowCreateForm(true)
      }
      else {
        setShowCreateForm(false)
      }
    }

  }, [isPrevious, isCreateNewCredential])

  const render = () => {
    if (!templateId || isError) {
      return <IllustratedMessage />
    }

    if (isLoadingIms || orgsLoading || templateLoading || previousProjectsLoading) {
      return <Loading initialLoading={true} />
    }

    if (!window.adobeIMS.isSignedInUser()) {
      return <GetCredential.SignIn />
    }

    // template should never be null or undefined here
    if (!template.userEntitled || !template.orgEntitled) {
      return <RequestAccess />
    }

    if (isPrevious && !showCreateForm && !isCreateNewCredential) {
      return <PreviousCredential
        setIsCreateNewCredential={setIsCreateNewCredential} />
    }

    return <GetCredential.Form
      showCreateForm={showCreateForm}
      setIsPrevious={setIsPrevious}
      setShowCreateForm={setShowCreateForm}
      setIsCreateNewCredential={setIsCreateNewCredential}
      isCreateNewCredential={isCreateNewCredential} />

  }

  return (
    <>
      {
        isBrowser &&
        <ErrorBoundary errorMessage={getCredentialData?.[IllustratedMessage]}>
          <Provider theme={defaultTheme} colorScheme="light" >
            <GetCredentialContext.Provider
              value={{
                allOrganizations,
                switchOrganization,
                selectedOrganization,
                template,
                getCredentialData,
                previousProjectDetail
              }}
            >
              <section
                id="adobe-get-credential"
                className={classNames(className)}
                css={css`
                background: #f8f8f8;
                padding: var(--spectrum-global-dimension-size-800) 0 var(--spectrum-global-dimension-size-800) 0;

                button , input[type = checkbox] , a{
                  cursor:pointer !important;
                }
                         
                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_MOBILE_WIDTH}){
                  padding: var(--spectrum-global-dimension-size-300) var(--spectrum-global-dimension-size-100);
                }
              `
                }
              >
                <title>Get Credentials</title>
                <div
                  css={css`
                width: calc(7 * 100% / 9);
                margin: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
                text-align:initial;

                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}) {
                  width: 90% ;
                  overflow:hidden;
                }

              `}
                >
                  {render()}

                </div>
              </section>
            </GetCredentialContext.Provider>
          </Provider>
        </ErrorBoundary>
      }
    </>
  )

};

GetCredential.propTypes = {
  templateId: PropTypes.string,
  className: PropTypes.string,
}

GetCredential.SignIn = SignIn;
GetCredential.Form = CredentialForm;
GetCredential.Form.CredentialName = CredentialName;
GetCredential.Form.AllowedOrigins = AllowedOrigins;
GetCredential.Form.Products = Products;
GetCredential.Form.Product = Product;
GetCredential.Form.Side = SideComponent;
GetCredential.Form.Downloads = Downloads;
GetCredential.Form.Download = Download;
GetCredential.Form.AdobeDeveloperConsole = AdobeDeveloperConsole;
GetCredential.UnknownError = IllustratedMessage;
GetCredential.Card = MyCredential;
GetCredential.Card.AccessToken = AccessToken;
GetCredential.Card.DevConsoleLink = DevConsoleLink;
GetCredential.Card.Side = SideComponent;
GetCredential.Card.Product = CardProduct;
GetCredential.Card.Products = CardProducts;
GetCredential.Card.CredentialDetails = CardClientDetails;
GetCredential.Card.CredentialDetails.ClientId = CardClientId;
GetCredential.Card.CredentialDetails.ClientSecret = CardClientSecret;
GetCredential.Card.CredentialDetails.OrganizationName = CardOrganizationName;
GetCredential.Card.CredentialDetails.Scopes = CardScopes;
GetCredential.Card.CredentialDetails.AllowedOrigins = CardAllowedOrigins;
GetCredential.Card.CredentialDetails.APIKey = CardAPIKey;
GetCredential.NoBetaAccessError = JoinBetaProgram;
GetCredential.Return = PreviousProject;
GetCredential.Return.AccessToken = ReturnAccessToken;
GetCredential.Return.ProjectsDropdown = ProjectsDropdown;
GetCredential.Return.ManageDeveloperConsole = ReturnManageDeveloperConsole;
GetCredential.Return.DevConsoleLink = ReturnDevConsoleLink;
GetCredential.Return.Side = RetunrSideComp;
GetCredential.Return.Side.Custom = ReturnCustomComp;
GetCredential.Return.Side.NewCredential = ReturnNewCredential;
GetCredential.Return.Product = CardProduct;
GetCredential.Return.Products = CardProducts;
GetCredential.Return.CredentialDetails = ReturnCredentialDetails;
GetCredential.Return.CredentialDetails.ClientId = ReturnClientId;
GetCredential.Return.CredentialDetails.ClientSecret = ReturnClientSecret;
GetCredential.Return.CredentialDetails.OrganizationName = ReturnOrganizationName;
GetCredential.Return.CredentialDetails.Scopes = ReturnScopes;
GetCredential.Return.CredentialDetails.AllowedOrigins = ReturnAllowedOrigins;
GetCredential.Return.CredentialDetails.APIKey = ReturnAPIKey;
GetCredential.RequestAccess = RequestAccess;
GetCredential.RequestAccess.RestrictedAccess = RestrictedAccess;
GetCredential.RequestAccess.EdgeCase = OrganizationAccessDetailsEdgeCase;
GetCredential.RequestAccess.EdgeCase.NoProduct = OrganizationAccessDetailsNoProduct;
GetCredential.RequestAccess.EdgeCase.Type1User = OrganizationAccessDetailsType1User;
GetCredential.RequestAccess.EdgeCase.NotMember = OrganizationAccessDetailsNotMember;
GetCredential.RequestAccess.EdgeCase.NotSignUp = OrganizationAccessDetailsNotSignUp;
GetCredential.RequestAccess.RestrictedAccess.Products = Products;
GetCredential.RequestAccess.RestrictedAccess.Products.Product = Product;
GetCredential.RequestAccess.RequestAccessSide = RequestAccessSide;

export { GetCredential };
