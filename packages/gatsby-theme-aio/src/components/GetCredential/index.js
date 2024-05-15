import React, { useEffect, useState } from 'react';
import { SignIn } from "./SignIn"
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { getOrganization, MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
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
import { SideCredential } from './Form/SideCredential';
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
import { ReturnProduct } from './Return/ReturnProduct';
import { ReturnProducts } from './Return/ReturnProducts';
import { ReturnClientDetails } from './Return/ReturnClientDetails';
import { ReturnClientId } from './Return/ReturnClientId';
import { ReturnClientSecret } from './Return/ReturnClientSecret';
import { ReturnOrganizationName } from './Return/ReturnOrganizationName';
import { ReturnScopes } from './Return/ReturnScopes';
import { ReturnAllowedOrigins } from './Return/ReturnAllowedOrigins';
import { ReturnAPIKey } from './Return/ReturnAPIKey';
import { MyCredential } from './MyCredential';
import { AccessToken } from './Card/AccessToken';
import { DevConsoleLink } from './Card/DevConsoleLink';
import { MyCredentialSide } from './Card/MyCredentialSide';
import { Toast } from '../Toast';

import { RequestAccess } from './requestAccess/RequestAccess';
import { RestrictedAccess } from './requestAccess/RestrictedAccessFields';
import { RestrictedAccessProducts } from './requestAccess/RestrictedAccessProducts';
import { RestrictedAccessProduct } from './requestAccess/RestrictedAccessProduct';
import { RequestAccessSide } from './requestAccess/RequestAccessSide';

const GetCredential = ({ credentialType = 'apiKey', children, className, service = "CCEmbedCompanionAPI" }) => {

  const isBrowser = typeof window !== "undefined";
  const [isPrevious, setIsPrevious] = useState(false);
  const [redirectToBeta, setRedirectBetaProgram] = useState(false);
  const [organizationChange, setOrganizationChange] = useState(false);
  const [organization, setOrganizationValue] = useState({});
  const [showOrganization, setShowOrganization] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [allOrganization, setAllOrganization] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [isCreateNewCredential, setIsCreateNewCredential] = useState(false);
  const [isDeveloperAccess, setIsDeveloperAccess] = useState(false)

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
    }, [1000])
  }, []);

  useEffect(async () => {
    if (window.adobeIMS?.isSignedInUser()) {
      if (Object?.keys(organization)?.length) {
        setIsDeveloperAccess(true)
        setInitialLoading(false)
      }
      else {
        if (initialLoading) {
          setInitialLoading(false)
          setIsDeveloperAccess(false)
        }
      }
    }
    else {
      setTimeout(() => {
        setInitialLoading(false)
      }, [3000])
    }

  }, [organization, initialLoading])

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

  useState(() => {
    setTimeout(() => { setOrganizationChange(false) })
  }, [organizationChange])

  return (
    <>
      {
        isBrowser &&
        <ErrorBoundary errorMessage={getCredentialData?.[IllustratedMessage]}>
          <Provider theme={defaultTheme} colorScheme="light" >
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
                {
                // initialLoading ? <Loading /> :

                //   !window.adobeIMS?.isSignedInUser() ? <GetCredential.SignIn signInProps={getCredentialData?.[SignIn]} /> :

                //     !isDeveloperAccess ? <NoDeveloperAccessError developerAccessError={getCredentialData?.[NoDeveloperAccessError]} /> :

                //       isPrevious && !showCreateForm && !isCreateNewCredential && !redirectToBeta ?

                //         <PreviousCredential returnProps={getCredentialData} setIsPrevious={setIsPrevious} showOrganization={showOrganization} setOrganizationValue={setOrganizationValue} organizationChange={organizationChange} setOrganizationChange={setOrganizationChange} redirectToBeta={redirectToBeta} setRedirectBetaProgram={setRedirectBetaProgram} organization={organization} allOrganization={allOrganization} setIsCreateNewCredential={setIsCreateNewCredential} /> :

                //         <GetCredential.Form formProps={getCredentialData} credentialType={credentialType} service={service} redirectToBeta={redirectToBeta} setRedirectBetaProgram={setRedirectBetaProgram} organizationChange={organizationChange} setOrganizationChange={setOrganizationChange} organization={organization} setOrganizationValue={setOrganizationValue} showOrganization={showOrganization} setShowOrganization={setShowOrganization} allOrganization={allOrganization} isPrevious={isPrevious} showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm} setIsCreateNewCredential={setIsCreateNewCredential} isCreateNewCredential={isCreateNewCredential} />

                 <GetCredential.RequestAccess allProps={getCredentialData}/> 
                }


                {/* {redirectToBeta && <JoinBetaProgram joinBeta={getCredentialData?.[JoinBetaProgram]} />} */}

              </div>
            </section>
            {organizationChange && <Toast message="Organization Changed" variant="success" disable={8000} />}
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

GetCredential.RequestAccess = RequestAccess;
GetCredential.RequestAccess.RestrictedAccess = RestrictedAccess;
GetCredential.RequestAccess.RestrictedAccess.RestrictedAccessProducts = RestrictedAccessProducts;
GetCredential.RequestAccess.RestrictedAccess.RestrictedAccessProducts.RestrictedAccessProduct = RestrictedAccessProduct;
GetCredential.RequestAccess.RequestAccessSide=RequestAccessSide

export { GetCredential };
