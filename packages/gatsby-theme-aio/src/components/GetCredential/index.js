import React, { useContext, useEffect, useState } from 'react';
import { SignIn } from "./SignIn"
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { getOrganizations, MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { IllustratedMessage } from './IllustratedMessage';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { JoinBetaProgram } from './JoinBetaProgram';
import { NoDeveloperAccessError } from "./NoDeveloperAccessError";
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
import { SubscriptionError } from "./ErrorCode/SubscriptionError"
import Context from '../Context';
import GetCredentialContext from './GetCredentialContext';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';

const GetCredential = ({ templateId, children, className }) => {
  const isBrowser = typeof window !== "undefined";
  const [isPrevious, setIsPrevious] = useState(false);
  const [selectedOrganization, setOrganization] = useState({});
  const [loading, setLoading] = useState(true);
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [isCreateNewCredential, setIsCreateNewCredential] = useState(false);
  const [template, setTemplate] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isMyCredential, setIsMyCredential] = useState(false)
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

  const fetchTemplate = async (org) => {

    setIsError(false);
    setLoading(true);
    if (org.code) {
      const url = `/templates/${templateId}`
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.adobeIMS.getTokenFromStorage().token}`,
          "x-api-key": window.adobeIMS.adobeIdData.client_id,
          "x-org-id": org.code
        }
      });

      if (!response.ok) {
        console.error('Template not found. Please check template id');
        setIsError(true);
        setLoading(false);
        return;
      }

      setTemplate(await response.json());
    }

    setLoading(false);
  }

  const switchOrganization = async (org) => {
    setOrganization(org);

    if (org) {
      await fetchTemplate(org);
    }
  }

  const initialize = async () => {
    const orgInfo = localStorage?.getItem('OrgInfo');
    const organizations = await getOrganizations();

    if (!organizations || organizations.length < 1) {
      console.error('No organizations found for the user. Cannot continue.');
      setIsError(true);
      return;
    }

    setAllOrganizations(organizations);
    await switchOrganization(orgInfo ? JSON.parse(orgInfo) : organizations[0]);
  }

  useEffect(() => {
    const getPreviousProjects = async () => {
      setLoading(true)
      const { userId } = await window.adobeIMS.getProfile();
      const previousProjectDetailsUrl = `/console/api/organizations/${selectedOrganization?.id}/search/projects?templateId=${template?.id}&createdBy=${userId}&excludeUserProfiles=true&skipReadOnlyCheck=true`;
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
        setIsMyCredential(true)
        setLoading(false)
      } else {
        setIsMyCredential(false)
        setLoading(false)
      }
    }

    if (selectedOrganization?.id && template?.id) {
      getPreviousProjects();
    }

  }, [template, isPrevious, isCreateNewCredential])

  useEffect(async () => {
    if (isMyCredential) {
      setIsPrevious(true)
    }
    else {
      setIsPrevious(false)
    }

    if (!isLoadingIms) {
      if (window?.adobeIMS?.isSignedInUser()) {
        initialize();
      }
      else {
        setLoading(false);
      }
    }
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

    if (isLoadingIms || loading) {
      return <Loading />
    }

    if (!window?.adobeIMS?.isSignedInUser()) {
      return <GetCredential.SignIn />
    }

    // template should never be null or undefined here
    if (!template.userEntitled || !template.orgEntitled) {
      if (template.canRequestAccess) {
        return <RequestAccess />
      }
      // TODO: cover other error cases
      return <NoDeveloperAccessError />
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

    // return <SubscriptionError errorProps={getCredentialData?.[SubscriptionError]} />

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
GetCredential.NoDeveloperAccessError = NoDeveloperAccessError;
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
GetCredential.RequestAccess.RestrictedAccess.RestrictedAccessProducts = Products;
GetCredential.RequestAccess.RestrictedAccess.RestrictedAccessProducts.RestrictedAccessProduct = Product;
GetCredential.RequestAccess.RequestAccessSide = RequestAccessSide;
GetCredential.ErrorCode = SubscriptionError;

export { GetCredential };
