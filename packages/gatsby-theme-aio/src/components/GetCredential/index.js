import React from 'react';
import { SignIn } from "./SignIn"
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import { AllowedOrigins, CredentialForm, CredentialName, Download, Downloads, Side } from './CredentialForm';
import classNames from "classnames";
import { IllustratedMessage } from './IllustratedMessage';
import { MyCredential } from './MyCredential';
import { JoinBetaProgram } from './JoinBetaProgram';
import { NoDeveloperAccessError } from "./NoDeveloperAccessError"
import { MAX_MOBILE_WIDTH, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import ErrorBoundary from './ErrorBoundary';

const GetCredential = ({ credentialType = 'apiKey', children, className, service = "CCEmbedCompanionAPI" }) => {

  const isBrowser = typeof window !== "undefined";

  let getCredentialData = {};
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.props) {
      getCredentialData[child.type] = child.props;
    }
  });

  return (
    <>
      {
        isBrowser &&
        <ErrorBoundary errorMessage={getCredentialData?.[IllustratedMessage]}>
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
              {!window.adobeIMS?.isSignedInUser() ? <GetCredential.SignIn signInProps={getCredentialData?.[SignIn]} /> : <GetCredential.Form formProps={getCredentialData} credentialType={credentialType} service={service} />}
            </div>
          </section>
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
GetCredential.Form.Side = Side;
GetCredential.Form.Downloads = Downloads;
GetCredential.Form.Download = Download;
GetCredential.UnknownError = IllustratedMessage;
GetCredential.Card = MyCredential;
GetCredential.NoBetaAccessError = JoinBetaProgram;
GetCredential.NoDeveloperAccessError = NoDeveloperAccessError;

export { GetCredential };
