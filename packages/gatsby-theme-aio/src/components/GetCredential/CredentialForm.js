import React, { useContext, useEffect, useState } from 'react';
import { css } from "@emotion/react";
import classNames from "classnames";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import { Toast } from '../Toast';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { SideCredential } from './Form/SideCredential';
import { CredentialName } from './Form/CredentialName';
import { AllowedOrigins } from './Form/AllowedOrigins';
import { Downloads } from './Form/Downloads';
import { Download } from './Form/Download';
import { SideContent } from './Form/SideContent';
import { AdobeDeveloperConsole } from './Form/AdobeDeveloperConsole';
import { CreateCredential } from './Form/CreateCredential';
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { Product, Products } from './Products';
import { Organization } from './Organization';
import GetCredentialContext from './GetCredentialContext';

const hostnameRegex = /^(localhost:\d{1,5}|(\*\.|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)|\*|(\*\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/;
const credentialNameRegex = /^(?=[A-Za-z0-9\s]{6,}$)[A-Za-z0-9\s]*$/;

const CredentialForm = ({
  formProps,
  showCreateForm,
  setShowCreateForm,
  isCreateNewCredential,
  setIsCreateNewCredential
}) => {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  const [errResp, setErrorResp] = useState("");
  const [showCredential, setShowCredential] = useState(false);
  const [formField, setFormField] = useState([]);
  const [formData, setFormData] = useState({});
  const [isValid, setIsValid] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  const { selectedOrganization, template } = useContext(GetCredentialContext);



  const credentialForm = formProps?.[CredentialForm];
  const isFormValue = credentialForm?.children?.filter(data => Object.keys(data.props).some(key => key.startsWith('contextHelp')));

  const initialLoad = () => {
    const fields = {};
    const downloadObj = { label: "Language", selectOptions: [] };
    const productsObj = { label: "products", productList: [] }

    credentialForm?.children.forEach(({ type, props }) => {
      if (type === Downloads && props?.children) {
        downloadObj.required = props.required || false;
        downloadObj.selectOptions.push(...[].concat(props.children).map(({ props: { title, href } }) => ({ title, href })));
        setFormData(prevData => ({ ...prevData, ...(Array.isArray(props.children) ? null : { Download: props.children?.props?.title }) }));
      }
      if (type === Products && props?.children) {
        productsObj.productList.push(...[].concat(props.children).map(({ props: { label, icon } }) => ({ label, icon })));
      }
      fields[type] = { ...props, required: type === CredentialName || props?.required };
    });

    if (downloadObj.selectOptions.length) {
      fields[Download] = downloadObj;
      if (downloadObj.selectOptions.length === 1) {
        setFormData(prevData => ({ ...prevData, Download: downloadObj.selectOptions[0]?.title, zipUrl: downloadObj.selectOptions[0]?.href }));
      }
    }
    if (productsObj?.productList.length) {
      fields[Product] = productsObj
    }

    setFormField(fields);

  }

  useEffect(() => {
    if (window.adobeIMS?.isSignedInUser()) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    else {
      setLoading(true)
    }
  }, [window.adobeIMS?.isSignedInUser()])

  useEffect(() => {
    if (showCreateForm) setIsError(false);
  }, [showCreateForm])

  useEffect(() => {
    if (!showCredential && showCreateForm) {
      const updateForm = { ...formData };
      for (const key in updateForm) {
        updateForm[key] = ''
      };
      setFormData(updateForm);
      setAlertShow(false);
    }
  }, [showCredential])

  useEffect(() => { initialLoad(); }, []);

  useEffect(() => {
    if (isError) {
      const updateForm = { ...formData };
      for (const key in updateForm) {
        updateForm[key] = ''
      };
      setFormData(updateForm);
    }
  }, [isError])

  useEffect(() => {
    const requiredFields = Array.from(credentialForm?.children || []).filter(child => child?.props?.required || child.type === CredentialName)?.map(child => child.type)
    const isValidCredentialName = credentialNameRegex.test(formData.CredentialName) && formData['CredentialName']?.length >= 6;
    const isCheckAllowedOrgins = requiredFields.filter((data) => data.name === "AllowedOrigins")
    const validateAllowedOrigins = formData['AllowedOrigins']?.split(',').map((data) => hostnameRegex.test(data.trim()));
    const isAllowedOriginsValid = isCheckAllowedOrgins.length ? validateAllowedOrigins?.every((value) => value === true) && formData["AllowedOrigins"] !== undefined && formData["AllowedOrigins"]?.length !== 0 : true;

    const isValid = isValidCredentialName && isAllowedOriginsValid && formData.Agree === true;

    setIsValid(isValid);
  }, [formData]);



  const handleChange = (e, type) => {
    const value = (type === "Downloads" || type === "Agree") ? e.target.checked : e.target.value;
    setFormData(prevData => ({ ...prevData, [type]: value }));

    if (type === "Download" && formData['Downloads']) {
      const selectedData = formField?.[Download]?.selectOptions.find(data => data.title === e.target.value);
      selectedData && setFormData(prevData => ({ ...prevData, zipUrl: selectedData.href }));
    }

  };

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
      licenseConfigs: Array.isArray(api.licenseConfigs) && api.licenseConfigs.length > 0 ? [{...api.licenseConfigs[0], 'op': 'add'}] : null
    }));

    const data = {
      projectName: formData["CredentialName"],
      description: 'created for get credential',
      metadata: {
        domain: formData["AllowedOrigins"]
      },
      orgId: selectedOrganization.code,
      apis
    };

    try {
      const url = `/v1/templates/templates-install?templateId=${template.id}`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-api-key": window?.adobeIMS?.adobeIdData?.client_id,
        },
        body: JSON.stringify(data),
      });

      const resResp = await response.json();

      if (response.ok) {
        setResponse(resResp);
        setShowCredential(true);
        setAlertShow(true);
      } else if (resResp?.messages) {
        setAlertShow(true);
        setIsValid(false);
        setErrorResp(resResp?.messages[0]?.message);
        setShowCreateForm(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const sideObject = formField?.[SideCredential];
  const credentialName = formField?.[CredentialName];
  const allowedOrigins = formField?.[AllowedOrigins];
  const downloads = formField?.[Downloads];
  const download = formField?.[Download];
  const products = formField?.[Products];
  const product = formField?.[Product];
  const adobeDeveloperConsole = formField?.[AdobeDeveloperConsole];

  return (
    <>
      {showCreateForm && !loading &&
        <div
          className={classNames(credentialForm?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 48px;
          `}
        >
          <div
            css={css`
            display: flex;
            flex-direction: column;
            gap: 48px;
            color:var(--spectrum-global-color-gray-800);
            width: 100%;
            height: 100%;
            text-align: left;
            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              padding: 0;
              width: 100%;
            }
          `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 16px;
              `}
            >
              {credentialForm?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentialForm?.title}</h3>}
              {credentialForm?.paragraph &&
                <p
                  className="spectrum-Body spectrum-Body--sizeL">
                  {credentialForm?.paragraph}
                </p>
              }
              <p
                className="spectrum-Body spectrum-Body--sizeS"
                css={css`color:var(--spectrum-global-color-gray-800);display : inline-flex;`}
                onClick={() => setIsShow(true)}
              >
                You're creating this credential in  {selectedOrganization?.type === "developer" ? "in your personal developer organization" : <span>[<b>{selectedOrganization?.name}</b>] </span>}.
                <Organization isShow={isShow} setIsShow={setIsShow}/>
              </p>
            </div>
          </div>
          <div
            css={css`
              display:flex;
              gap: 35px;

              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                flex-direction : column;
                padding-left: 0;
              }

            `}
          >
            <div
              css={css`
                display:flex;
                flex-direction : column;
                gap: 35px;
                width:50%;

                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                  width:100%;
                }

              `}
            >
              <div
                css={css`
                  display:flex;
                  gap:32px;
                  width: 100%;
                `}
              >
                {credentialName && <CredentialName nameProps={credentialName} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                {allowedOrigins && <AllowedOrigins originsProps={allowedOrigins} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                {downloads && download && <Downloads downloadsProp={downloads} type="Downloads" formData={formData} handleChange={handleChange} />}
                {formData['Downloads'] && download && <Download downloadProp={download} formData={formData} isFormValue={isFormValue} handleChange={handleChange} />}
                <Products products={products} product={product} />
                {adobeDeveloperConsole && <AdobeDeveloperConsole formData={formData} adobeDeveloperConsole={adobeDeveloperConsole} handleChange={handleChange} />}
                <CreateCredential createCredential={createCredential} isValid={isValid} setIsCreateNewCredential={setIsCreateNewCredential} isCreateNewCredential={isCreateNewCredential} />
              </div>
            </div>
            {sideObject ? <SideContent sideContent={sideObject?.children} SideComp={SideCredential} /> : null}
          </div>
        </div>
      }
      {alertShow &&
        <>
          {<Toast
              customDisableFunction={setAlertShow}
              message={showCreateForm && !showCredential ? errResp : !isError && showCredential && `Your credentials were created successfully.`}
              variant={isError || (showCreateForm && !showCredential) ? "error" : "success"}
              disable={isError || (showCreateForm && !showCredential) ? null : 8000}
            />
          }
        </>
      }
      {loading && !showCredential && !isError && !showCreateForm && <Loading credentials={credentialForm} isCreateCredential downloadStatus={formData['Downloads']} />}
      {isError && !showCreateForm && !showCredential && <IllustratedMessage errorMessage={formProps?.[IllustratedMessage]} />}
      {showCredential && !showCreateForm && <MyCredential credentialProps={formProps} response={response} setShowCreateForm={setShowCreateForm} setShowCredential={setShowCredential} formData={formData} />}
    </>
  )
}

export { CredentialForm };
