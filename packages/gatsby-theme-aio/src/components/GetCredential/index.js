import React, { useEffect, useState } from 'react';
import { SignIn } from "./SignIn"
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { AdobeDeveloperConsole, AllowedOrigins, CredentialForm, CredentialName, Download, Downloads, SideCredential } from './CredentialForm';
import { AccessToken, CardAllowedOrigins, CardAPIKey, CardClientDetails, CardClientId, CardClientSecret, CardOrganizationName, CardScopes, DevConsoleLink, MyCredential, MyCredentialSide } from './MyCredential';
import { getOrganization, MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { PreviousCredential, RetunrSideComp, ReturnCustomComp, ReturnNewCredential } from './PreviousCredential';
import { PreviousProject, ProjectsDropdown, ReturnAccessToken, ReturnClientDetails, ReturnClientSecret, ReturnDevConsoleLink, ReturnManageDeveloperConsole, ReturnOrganizationName, ReturnProduct, ReturnProducts, ReturnClientId, ReturnScopes, ReturnAllowedOrigins, ReturnAPIKey } from './PreviousProject';
import { IllustratedMessage } from './IllustratedMessage';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { JoinBetaProgram } from './JoinBetaProgram';
import { NoDeveloperAccessError } from "./NoDeveloperAccessError"
import ErrorBoundary from './ErrorBoundary';
import { Product, Products, CardProduct, CardProducts } from './Products';
import { Loading } from './Loading';

const GetCredential = ({ credentialType = 'apiKey', children, className, service = "CCEmbedCompanionAPI" }) => {

  const isBrowser = typeof window !== "undefined";
  const [isPrevious, setIsPrevious] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectToBeta, setRedirectBetaProgram] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [organizationChange, setOrganization] = useState(false);
  const [organization, setOrganizationValue] = useState({});
  const [showOrganization, setShowOrganization] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSignedUser, setIsSignedUser] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [allOrganization, setAllOrganization] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [isCreateNewCredential, setIsCreateNewCredential] = useState(false)

  let getCredentialData = {};
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.props) {
      getCredentialData[child.type] = child.props;
    }
  });

  const isMyCredential = JSON.parse(localStorage.getItem("myCredential"));

  const getValueFromLocalStorage = async () => {
    const orgInfo = localStorage?.getItem('OrgInfo');
    const getOrgs = await getOrganization(setOrganizationValue);
    setAllOrganization(getOrgs)
    if (orgInfo === null) {
      if (getOrgs?.length === 1) {
        setShowOrganization(false);
      }
    }
    else if (getOrgs) {
      const orgData = JSON.parse(orgInfo);
      setShowOrganization(orgData.orgLen === 1 ? false : true);
      setOrganizationValue(orgData);
    }
    if (!getOrgs) {
      setOrganizationValue({});
    }
  }

  useEffect(() => {
    if (isMyCredential) {
      setIsPrevious(true)
    }
    else {
      setIsPrevious(false)
    }
    setTimeout(() => {
      getValueFromLocalStorage()
    }, [2500])
  }, []);

  useEffect(() => {
    if (isSignedUser) {
      if (organization) {
        if (Object?.keys(organization)?.length) {
          setInitialLoading(false)
        }
        else {
          setInitialLoading(true)
        }
      }
    }
    else {
      setTimeout(() => {
        setInitialLoading(false)
      }, [2500])
    }

  }, [isSignedUser, organization])

  useEffect(() => {
    setIsSignedUser(window.adobeIMS?.isSignedInUser() ? true : false)
  }, [window.adobeIMS?.isSignedInUser()])

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

  return (
    <>
      {
        isBrowser &&
        <ErrorBoundary errorMessage={getCredentialData?.[IllustratedMessage]}>
          <Provider theme={defaultTheme} colorScheme="light" height="100%" >
            <section
              id="adobe-get-credential"
              className={classNames(className)}
              css={css`
                background: #f8f8f8;
                padding: var(--spectrum-global-dimension-size-800) 0 var(--spectrum-global-dimension-size-800) 0;
                          
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
                {initialLoading ? <Loading /> :
                  !window.adobeIMS?.isSignedInUser() ? <GetCredential.SignIn signInProps={getCredentialData?.[SignIn]} /> :
                    isPrevious && !showCreateForm && !isCreateNewCredential ?
                      <PreviousCredential returnProps={getCredentialData} setIsPrevious={setIsPrevious} showOrganization={showOrganization} setOrganizationValue={setOrganizationValue} organizationChange={organizationChange} setOrganization={setOrganization} alertShow={alertShow} setAlertShow={setAlertShow} redirectToBeta={redirectToBeta} setRedirectBetaProgram={setRedirectBetaProgram} modalOpen={modalOpen} setModalOpen={setModalOpen} organization={organization} isShow={isShow} setIsShow={setIsShow} allOrganization={allOrganization} setIsCreateNewCredential={setIsCreateNewCredential} /> :

                      <GetCredential.Form formProps={getCredentialData} credentialType={credentialType} service={service} modalOpen={modalOpen} setModalOpen={setModalOpen} redirectToBeta={redirectToBeta} setRedirectBetaProgram={setRedirectBetaProgram} alertShow={alertShow} setAlertShow={setAlertShow} organizationChange={organizationChange} setOrganization={setOrganization} organization={organization} setOrganizationValue={setOrganizationValue} showOrganization={showOrganization} setShowOrganization={setShowOrganization} isShow={isShow} setIsShow={setIsShow} allOrganization={allOrganization} isPrevious={isPrevious} showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm} setIsCreateNewCredential={setIsCreateNewCredential} isCreateNewCredential={isCreateNewCredential} />
                }
              </div>
            </section>
          </Provider>
        </ErrorBoundary>
      }
    </>
  )

};

GetCredential.propTypes = {
  credentialType: PropTypes.string,
  className: PropTypes.string,
}

GetCredential.SignIn = SignIn;
GetCredential.Form = CredentialForm;
GetCredential.Form.CredentialName = CredentialName;
GetCredential.Form.AllowedOrigins = AllowedOrigins;
GetCredential.Form.Products = Products;
GetCredential.Form.Product = Product;
GetCredential.Form.Side = SideCredential;
GetCredential.Form.Downloads = Downloads;
GetCredential.Form.Download = Download;
GetCredential.Form.AdobeDeveloperConsole = AdobeDeveloperConsole;
GetCredential.UnknownError = IllustratedMessage;
GetCredential.Card = MyCredential;
GetCredential.Card.AccessToken = AccessToken;
GetCredential.Card.DevConsoleLink = DevConsoleLink;
GetCredential.Card.Side = MyCredentialSide;
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
GetCredential.Return.Product = ReturnProduct;
GetCredential.Return.Products = ReturnProducts;
GetCredential.Return.CredentialDetails = ReturnClientDetails;
GetCredential.Return.CredentialDetails.ClientId = ReturnClientId;
GetCredential.Return.CredentialDetails.ClientSecret = ReturnClientSecret;
GetCredential.Return.CredentialDetails.OrganizationName = ReturnOrganizationName;
GetCredential.Return.CredentialDetails.Scopes = ReturnScopes;
GetCredential.Return.CredentialDetails.AllowedOrigins = ReturnAllowedOrigins;
GetCredential.Return.CredentialDetails.APIKey = ReturnAPIKey;

export { GetCredential };
