import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import { KeyIcon, LinkOut, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { Toast } from '../Toast';
import { CardProducts } from './Products';
import { MyCredentialSide } from './Card/MyCredentialSide';
import { AccessToken } from './Card/AccessToken';
import { DevConsoleLink } from './Card/DevConsoleLink';
import { CardClientDetails } from './Card/CardClientDetails';
import { CardClientId } from './Card/CardClientId';
import { CardClientSecret } from './Card/CardClientSecret';
import { CardOrganizationName } from './Card/CardOrganizationName';
import { CardScopes } from './Card/CardScopes';
import { CardAPIKey } from './Card/CardAPIKey';
import { CardAllowedOrigins } from './Card/CardAllowedOrigins';
import { SideContent } from './Form/SideContent';
import GetCredentialContext from './GetCredentialContext';
import { CredentialDetailsCard } from './CredentialDetailsCard';

const MyCredential = ({
  formData,
  setShowCreateForm,
  setShowCredential,
  response,
  orgID,
  organization,
  clientDetails,
  setIsMyCredential,
  setIsCreateNewCredential
}) => {

  const { getCredentialData, selectedOrganization: organizationName, template } =
    useContext(GetCredentialContext);
  const credentialProps = getCredentialData;

  const [isDownloadStart, setIsDownloadStart] = useState();
  const [isCopiedTooltip, setCopiedTooltip] = useState('');

  const myCredentialFields = {};
  const productsObj = { label: 'products', productList: [] };

  credentialProps?.[MyCredential]?.children.forEach(({ type, props }) => {
    myCredentialFields[type] = props;
    if (props.children && type === CardClientDetails) {
      props?.children?.forEach(({ type, props }) => {
        myCredentialFields[type] = props;
      });
    }
    if (type === CardProducts && props?.children) {
      productsObj.productList.push(
        ...[].concat(props.children).map(({ props: { label, icon } }) => ({ label, icon }))
      );
    }
  });

  const accessToken = myCredentialFields[AccessToken];
  const cardDevConsoleLink = myCredentialFields[DevConsoleLink];
  const cardClientDetails = myCredentialFields[CardClientDetails];
  const cardClientId = myCredentialFields[CardClientId];
  const cardClientSecret = myCredentialFields[CardClientSecret];
  const cardOrganizationName = myCredentialFields[CardOrganizationName];
  const cardScopes = myCredentialFields[CardScopes];
  const cardAPIKey = myCredentialFields[CardAPIKey];
  const cardAllowedOrigins = myCredentialFields[CardAllowedOrigins];
  const product = productsObj?.productList;


  useEffect(() => {
    const getItemFromLocalStorage = JSON.parse(localStorage.getItem(`credential_${template.id}`));
    let setCredentialValue;
    const keyCredential = { formData: formData, credential: response };
    if (getItemFromLocalStorage) {
      setCredentialValue = [keyCredential, ...getItemFromLocalStorage];
    } else {
      setCredentialValue = [keyCredential];
    }
    localStorage.setItem(`credential_${template.id}`, JSON.stringify(setCredentialValue));
  }, []);

  useEffect(() => {
    if (formData['Downloads']) {
      downloadZIP(
        `/console/api/organizations/${orgID}/projects/${response.projectId}/workspaces/${response.workspaceId}/download`,
        formData['Download'],
        formData['zipUrl']
      );
    }
  }, []);

  const card = credentialProps?.[MyCredential];

  const devConsoleLink = `/console`;

  const handleRestart = () => {
    setShowCreateForm(true);
    setShowCredential(false);
    setIsCreateNewCredential(true);
    setIsMyCredential(true);
  };

  const downloadZIP = async (downloadAPI, fileName = 'download', zipFileURL) => {
    try {
      const zipData = await JSZipUtils.getBinaryContent(zipFileURL);
      const zipArrayBuffer = new Uint8Array(zipData).buffer;
      const zip = new JSZip();

      setIsDownloadStart(true);

      await zip.loadAsync(zipArrayBuffer);

      const token = window.adobeIMS?.getTokenFromStorage()?.token;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          'x-api-key': window?.adobeIMS?.adobeIdData?.client_id,
        },
      };

      const response = await fetch(downloadAPI, options);

      if (response.status === 200) {
        const credential = await response.json();

        zip.file('credential.json', JSON.stringify(credential));

        const modifiedZipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(modifiedZipBlob, `${fileName}.zip`);
      } else {
        console.error('Failed to fetch additional data. Response status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsDownloadStart(false);
    }
  };

  return (
    <div
      className={classNames(card?.className)}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 48px;
      `}>
      <div
        className={classNames(card?.className)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          color: var(--spectrum-global-color-gray-800);
          width: 100%;
          height: 100%;
          text-align: left;

          @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
            padding: 0;
            width: 100%;
          }
        `}>
        <div
          css={css`
            display: flex;
            gap: 20px;
            align-items: baseline;
          `}>
          {card?.title && (
            <h2
              className="spectrum-Heading spectrum-Heading--sizeL"
              css={css`
                font-weight: 700;
                color: var(--spectrum-global-color-gray-900);
              `}>
              {card?.title}
            </h2>
          )}
          {isDownloadStart && (
            <div
              css={css`
                display: flex;
                text-align: center;
                align-items: center;
                gap: 10px;
              `}>
              <div class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--small">
                <div class="spectrum-ProgressCircle-track"></div>
                <div class="spectrum-ProgressCircle-fills">
                  <div class="spectrum-ProgressCircle-fillMask1">
                    <div class="spectrum-ProgressCircle-fillSubMask1">
                      <div class="spectrum-ProgressCircle-fill"></div>
                    </div>
                  </div>
                  <div class="spectrum-ProgressCircle-fillMask2">
                    <div class="spectrum-ProgressCircle-fillSubMask2">
                      <div class="spectrum-ProgressCircle-fill"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p
                css={css`
                  margin: 0;
                `}>
                Downloading...
              </p>
            </div>
          )}
        </div>
        {formData['Downloads'] && card?.paragraph && (
          <p
            className="spectrum-Body spectrum-Body--sizeL"
            css={css`
              color: var(--spectrum-global-color-gray-900);
            `}>
            {card?.paragraph}
          </p>
        )}
        {formData['Downloads'] && (
          <p
            className="spectrum-Body spectrum-Body--sizeS"
            css={css`
              color: var(--spectrum-global-color-gray-900);
            `}>
            Download not working?
            <button
              css={css`
                padding: 0;
                font-family: 'adobe-clean';
                border: none;
                background: transparent;
                margin-left: 10px;
                cursor: pointer;
                text-decoration: underline;
                color: rgb(0, 84, 182);
                &:hover {
                  color: rgb(2, 101, 220);
                }
              `}
              onClick={() =>
                downloadZIP(
                  `/console/api/organizations/${organization?.id}/projects/${response.projectId}/workspaces/${response.workspaceId}/download`,
                  formData['Download'],
                  formData['zipUrl']
                )
              }>
              Restart download
            </button>
          </p>
        )}
      </div>
      <div
        css={css`
          display: flex;
          gap: 35px;

          @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
            flex-direction: column;
            padding-left: 0;
          }
        `}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 35px;
            width: 50%;

            @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
              width: 100%;
            }
          `}>
          <CredentialDetailsCard
            credentialName={formData['CredentialName']}
            productList={product}
            ProductComponent={CardProducts}
            accessToken={accessToken}
            AccessTokenComponent={AccessToken}
            token={clientDetails?.token}
            devConsoleLinkHeading={cardDevConsoleLink?.heading}
            DevConsoleLinkComponent={DevConsoleLink}
            projectId={response?.projectId}
            ClientDetailsComponent={CardClientDetails}
            clientDetails={cardClientDetails}
            clientIdDetails={cardClientId}
            clientSecretDetails={cardClientSecret}
            organizationDetails={cardOrganizationName}
            scopesDetails={cardScopes}
            apiKey={response['apiKey']}
            allowedOriginsDetails={formData['AllowedOrigins']}
            organizationName={organizationName}
            apiKeyDetails={cardAPIKey}
            allowedOrigins={cardAllowedOrigins}
            clientSecret={clientDetails?.clientSecret}
            response={response}
            clientId={response['apiKey']}
            nextButtonLink={card?.nextStepsHref}
            nextButtonLabel={card?.nextStepsLabel}
            devConsoleLink={devConsoleLink}
            developerConsoleManage={card?.developerConsoleManage}
          />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              width: 80%;
            `}>
            <h4
              className="spectrum-Heading spectrum-Heading--sizeXS"
              css={css`
                font-weight: 700;
                color: var(--spectrum-global-color-gray-900);
              `}>
              Need another credential
            </h4>
            <p className="spectrum-Body spectrum-Body--sizeS">
              <button
                onClick={handleRestart}
                css={css`
                  border: none;
                  padding: 0;
                  font-family: 'adobe-clean';
                  background: transparent;
                  color: var(--spectrum-global-color-gray-800);
                  text-decoration: underline;
                  cursor: pointer;
                  &:hover {
                    color: var(--spectrum-global-color-gray-900);
                  }
                `}>
                Restart and create a new credential
              </button>
            </p>
          </div>
        </div>
        {card?.children ? (
          <SideContent
            sideContent={myCredentialFields[MyCredentialSide]?.children}
            SideComp={MyCredentialSide}
          />
        ) : null}
      </div>
      {isCopiedTooltip && (
        <Toast
          variant="success"
          message="Copied to clipboard"
          disable={1000}
          customDisableFunction={setCopiedTooltip}
        />
      )}
    </div>
  );
};

export { MyCredential };
