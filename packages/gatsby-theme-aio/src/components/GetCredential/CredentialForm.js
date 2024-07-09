import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Toast } from '../Toast';
import { handleAllowedDomainsValidation, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { SideComponent } from './SideComponent';
import { CredentialName } from './Form/CredentialName';
import { AllowedOrigins } from './Form/AllowedOrigins';
import { Downloads } from './Form/Downloads';
import { Download } from './Form/Download';
import { SideContent } from './Form/SideContent';
import { AdobeDeveloperConsole } from './Form/AdobeDeveloperConsole';
import { CreateCredential } from './Form/CreateCredential';
import { MyCredential } from './MyCredential';
import { Loading } from './Loading';
import { IllustratedMessage } from './IllustratedMessage';
import { Product, Products } from './Products';
import { Organization } from './Organization';
import GetCredentialContext from './GetCredentialContext';

const credentialNameRegex = /^(?=[A-Za-z0-9\s]{6,}$)[A-Za-z0-9\s]*$/;

const CredentialForm = ({
  showCreateForm,
  setShowCreateForm,
  isCreateNewCredential,
  setIsCreateNewCredential,
  setIsPrevious,
  formData,
  setFormData
}) => {
  const { getCredentialData } = useContext(GetCredentialContext);
  const formProps = getCredentialData;

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  const [errResp, setErrorResp] = useState('');
  const [showCredential, setShowCredential] = useState(false);
  const [formField, setFormField] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isMyCredential, setIsMyCredential] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  const [isAllowedOriginsValid, setIsAllowedOriginsValid] = useState();

  const { selectedOrganization, template, previousProjectDetail } = useContext(GetCredentialContext);

  const credentialForm = formProps?.[CredentialForm];
  const isFormValue = credentialForm?.children?.filter(data =>
    Object.keys(data.props).some(key => key.startsWith('contextHelp'))
  );

  const initialLoad = () => {
    const fields = {};
    const downloadObj = { label: 'Language', selectOptions: [] };
    const productsObj = { label: 'products', productList: [] };

    credentialForm?.children.forEach(({ type, props }) => {
      if (type === Downloads && props?.children) {
        downloadObj.required = props.required || false;
        downloadObj.selectOptions.push(
          ...[].concat(props.children).map(({ props: { title, href } }) => ({ title, href }))
        );
        setFormData(prevData => ({
          ...prevData,
          ...(Array.isArray(props.children) ? null : { Download: props.children?.props?.title }),
        }));
      }
      if (type === Products && props?.children) {
        productsObj.productList.push(
          ...[].concat(props.children).map(({ props: { label, icon } }) => ({ label, icon }))
        );
      }
      fields[type] = { ...props, required: type === CredentialName || props?.required };
    });

    if (downloadObj.selectOptions.length) {
      fields[Download] = downloadObj;
      if (downloadObj.selectOptions.length === 1) {
        setFormData(prevData => ({
          ...prevData,
          Download: downloadObj.selectOptions[0]?.title,
          zipUrl: downloadObj.selectOptions[0]?.href,
        }));
      }
    }
    if (productsObj?.productList.length) {
      fields[Product] = productsObj;
    }

    const isCredential = previousProjectDetail?.count ? true : false;
    if (isCredential) {
      setIsMyCredential(true);
    } else {
      setIsMyCredential(false);
    }

    setFormField(fields);
  };

  useEffect(() => {
    if (window.adobeIMS?.isSignedInUser()) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
    }
  }, [window.adobeIMS?.isSignedInUser()]);

  useEffect(() => {
    if (showCreateForm) setIsError(false);
  }, [showCreateForm]);


  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    const isValidCredentialName = credentialNameRegex.test(formData.CredentialName);

    const isCheckAllowedOrgins = credentialForm.children.some((child) => {
      return child.type === AllowedOrigins;
    })
    let isAllowedOriginsValid;
    if (isCheckAllowedOrgins) {
      if (formData['AllowedOrigins']) {
        isAllowedOriginsValid = handleAllowedDomainsValidation(formData['AllowedOrigins'])
      }
    }
    else {
      isAllowedOriginsValid = true;
    }
    setIsAllowedOriginsValid(isAllowedOriginsValid)

    const isValid = isValidCredentialName && (!isCheckAllowedOrgins || isAllowedOriginsValid) && formData.Agree === true;
    setIsValid(isValid);
  }, [formData]);

  const handleChange = (e, type) => {
    let value;
    if (type === "Download") {
      value = e;
    }
    else {
      value = type === 'Downloads' || type === 'Agree' ? e.target.checked : e.target.value;
      if (type === 'Downloads') {
        handleChange(download?.selectOptions[0], "Download")
      }
    }
    setFormData(prevData => ({ ...prevData, [type]: value }));

    if (type === 'Download' && formData['Downloads']) {
      const selectedData = formField?.[Download]?.selectOptions.find(
        data => data.title === e
      );
      selectedData && setFormData(prevData => ({ ...prevData, zipUrl: selectedData.href }));
    }
  };

  const handleErrors = (detailedMessage) => {
    setLoading(false);
    setAlertShow(true);
    setIsValid(false);
    setErrorResp(detailedMessage);
    setShowCreateForm(true);
    setIsError(true);
  }

  const createCredential = async () => {
    const token = window.adobeIMS?.getTokenFromStorage()?.token;

    if (!token) {
      console.log('User not logged in');
    }

    setLoading(true);
    setShowCreateForm(false);

    const apis = template.apis.map(api => ({
      code: api.code,
      credentialType: api.credentialType,
      flowType: api.flowType,
      licenseConfigs:
        Array.isArray(api.licenseConfigs) && api.licenseConfigs.length > 0
          ? [{ ...api.licenseConfigs[0], op: 'add' }]
          : [],
    }));

    const data = {
      projectName: formData['CredentialName'],
      description: 'created for get credential',
      metadata: {
        domain: formData['AllowedOrigins'],
      },
      orgId: selectedOrganization.code,
      apis,
    };

    try {
      const url = `/templates/install/${template.id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-api-key': window?.adobeIMS?.adobeIdData?.client_id,
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resResp = await response?.json();

      if (response.ok) {
        setResponse(resResp);
        setShowCredential(true);
        setAlertShow(true);
        setLoading(false);
      } else {
        const jsonString = resResp.errors[0].message.match(/\((\{.*\})\)/)[1];
        const errorDetails = JSON.parse(jsonString);
        handleErrors(errorDetails.messages[0].message)
      }
    } catch (error) {
      setShowCreateForm(true);
      setLoading(false);
      setAlertShow(true);
      setErrorResp(error.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isMyCredential) {
      setIsPrevious(true);
      setShowCreateForm(true);
    }
  }, [isMyCredential]);

  const sideObject = formField?.[SideComponent];
  const credentialName = formField?.[CredentialName];
  const allowedOrigins = formField?.[AllowedOrigins];
  const downloads = formField?.[Downloads];
  const download = formField?.[Download];
  const products = formField?.[Products];
  const product = formField?.[Product];
  const adobeDeveloperConsole = formField?.[AdobeDeveloperConsole];

  const handleRestart = () => {
    setShowCreateForm(true);
    setShowCredential(false);
    setIsCreateNewCredential(true);
    setIsMyCredential(true);
    setFormData({});
  };

  return (
    <>
      {showCreateForm && !loading && (
        <div
          className={classNames(credentialForm?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 48px;
          `}>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 48px;
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
                flex-direction: column;
                gap: 16px;
              `}>
              {credentialForm?.title && (
                <h3 className="spectrum-Heading spectrum-Heading--sizeL">
                  {credentialForm?.title}
                </h3>
              )}
              {credentialForm?.paragraph && (
                <p className="spectrum-Body spectrum-Body--sizeL">{credentialForm?.paragraph}</p>
              )}

              <p
                className="spectrum-Body spectrum-Body--sizeS"
                css={css`
                  color: var(--spectrum-global-color-gray-800);
                  display: inline-flex;
                `}
                onClick={() => setIsShow(true)}>
                {selectedOrganization.type === "developer" ?
                  "You're creating this credential in your personal developer organization" :
                  <>You're creating this credential in [<b>{selectedOrganization?.name}</b>].</>}
                <Organization isShow={isShow} setIsShow={setIsShow} />
              </p>
            </div>
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
              <div
                css={css`
                  display: flex;
                  gap: 32px;
                  width: 100%;
                  flex-direction: column;
                `}>
                {credentialName && (
                  <CredentialName
                    nameProps={credentialName}
                    isFormValue={isFormValue}
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {allowedOrigins && (
                  <AllowedOrigins
                    originsProps={allowedOrigins}
                    isFormValue={isFormValue}
                    formData={formData}
                    handleChange={handleChange}
                    isAllowedOriginsValid={isAllowedOriginsValid}
                  />
                )}
                {downloads && download && (
                  <Downloads
                    downloadsProp={downloads}
                    type="Downloads"
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {formData['Downloads'] && download && (
                  <Download
                    downloadProp={download}
                    isFormValue={isFormValue}
                    handleChange={handleChange}
                  />
                )}
                <Products products={products} product={product} />
                {adobeDeveloperConsole && (
                  <AdobeDeveloperConsole
                    formData={formData}
                    adobeDeveloperConsole={adobeDeveloperConsole}
                    handleChange={handleChange}
                  />
                )}
                <CreateCredential
                  createCredential={createCredential}
                  isValid={isValid}
                  setIsCreateNewCredential={setIsCreateNewCredential}
                  isCreateNewCredential={isCreateNewCredential}
                />
              </div>
            </div>
            {sideObject ? (
              <SideContent sideContent={sideObject?.children} SideComp={SideComponent} />
            ) : null}
          </div>
        </div>
      )}
      {alertShow && (
        <>
          {
            <Toast
              customDisableFunction={setAlertShow}
              message={
                showCreateForm && !showCredential
                  ? errResp
                  : !isError && showCredential && `Your credentials were created successfully.`
              }
              variant={isError || (showCreateForm && !showCredential) ? 'error' : 'success'}
              disable={5000}
            />
          }
        </>
      )}
      {loading && !showCredential && !isError && !showCreateForm && (
        <Loading
          credentials={credentialForm}
          isCreateCredential
          downloadStatus={formData['Downloads']}
        />
      )}
      {isError && !showCreateForm && !showCredential && (
        <IllustratedMessage errorMessage={formProps?.[IllustratedMessage]} />
      )}
      {showCredential && !showCreateForm && (
        <MyCredential
          response={response}
          formData={formData}
          handleRestart={handleRestart}
        />
      )}
    </>
  );
};

export { CredentialForm };
