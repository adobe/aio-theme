import React, { useContext, useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { JoinBetaProgram } from './JoinBetaProgram';
import { AlertIcon, FormFields, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { ContextHelp } from './ContextHelp';
import { Toast } from '../Toast';
import { NoDeveloperAccessError } from './NoDeveloperAccessError';
import Context from '../Context';
import { Product, Products } from './Products';
import { Organization } from './Organization';

const hostnameRegex = /^(localhost:\d{1,5}|(\*\.|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)|\*|(\*\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/;
const credentialNameRegex = /^(?=[A-Za-z0-9\s]{6,}$)[A-Za-z0-9\s]*$/;

const CredentialForm = ({
  formProps,
  credentialType,
  service,
  organization,
  setOrganizationValue,
  organizationChange,
  setOrganization,
  alertShow,
  setAlertShow,
  redirectToBeta,
  isShow,
  setIsShow,
  setRedirectBetaProgram,
  allOrganization,
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
  const [emailID, setEmailID] = useState('');

  const { ims } = useContext(Context);

  const credentialForm = formProps?.[CredentialForm];
  const isFormValue = credentialForm?.children?.filter(data => Object.keys(data.props).some(key => key.startsWith('contextHelp')));

  const getValueFromLocalStorage = async () => {
    if (!allOrganization) {
      setOrganizationValue({});
      setShowCreateForm(false)
    }
  }

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
    getValueFromLocalStorage();

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
    setTimeout(() => {
      setOrganization(false);
    }, 8000);
  }, [organizationChange])

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
    if (!organization) {
      setOrganizationValue(undefined);
      setShowCreateForm(false);
      setLoading(true);
    }
    else if (organization && Object.keys(organization)?.length !== 0) {
      setShowCreateForm(true)
      setIsError(true)
      setTimeout(() => {
        setLoading(false)
        setIsError(false)
      }, 2000)
    }
    else {
      if (Object.keys(organization)?.length === 0) {
        setOrganizationValue(undefined);
        setShowCreateForm(false);
      }
    }
  }, [organization])

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

  useEffect(() => {
    (async () => {
      if (ims && ims.isSignedInUser()) {
        const profile = await ims.getProfile();
        setEmailID(profile?.email);
      }
    })();
  }, [ims])

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

    const data = {
      name: formData["CredentialName"],
      platform: credentialType,
      description: 'created for get credential',
      domain: formData["AllowedOrigins"],
      services: [{ sdkCode: service }],
    };

    try {
      const response = await fetch(`/console/api/organizations/${organization?.id}/integrations/adobeid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-api-key": window?.adobeIMS?.adobeIdData?.client_id,
        },
        body: JSON.stringify(data),
      });

      const resResp = await response.json();

      if (response.status === 200) {
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
      {!redirectToBeta && showCreateForm && !loading && organization &&
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
                You're creating this credential in  {organization?.type === "developer" ? "in your personal developer organization" : <span>[<b>{organization?.name}</b>] </span>}.
                <Organization isShow={isShow} setOrganizationValue={setOrganizationValue} setIsShow={setIsShow} organization={organization} allOrganization={allOrganization} />
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
                  flex-direction:column;
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
          {organizationChange ?
            <Toast message="Organization Changed" variant="success" disable={8000} customDisableFunction={setAlertShow} /> :
            <Toast
              customDisableFunction={setAlertShow}
              message={showCreateForm && !showCredential ? errResp : !isError && showCredential && `Your credentials were created successfully.`}
              variant={isError || (showCreateForm && !showCredential) ? "error" : "success"}
              disable={isError || (showCreateForm && !showCredential) ? null : 8000}
            />
          }
        </>
      }
      {loading && !showCredential && !isError && !showCreateForm && organization && <Loading credentials={credentialForm} isCreateCredential downloadStatus={formData['Downloads']} />}
      {(!organization || isError) && loading && <Loading />}
      {isError && !showCreateForm && !showCredential && !organization && <IllustratedMessage errorMessage={formProps?.[IllustratedMessage]} />}
      {showCredential && !showCreateForm && <MyCredential credentialProps={formProps} response={response} setShowCreateForm={setShowCreateForm} setShowCredential={setShowCredential} organizationName={organization?.name} formData={formData} orgID={organization?.id} organization={organization} />}
      {redirectToBeta && <JoinBetaProgram joinBeta={formProps?.[JoinBetaProgram]} />}
      {!showCreateForm && !organization && !isError && !loading && <NoDeveloperAccessError developerAccessError={formProps?.[NoDeveloperAccessError]} title={credentialForm?.title} emailID={emailID} />}
    </>
  )
}

const SideCredential = ({ side }) => (side);

const CredentialName = ({ nameProps, isFormValue, formData, handleChange }) => {
  const inValidName = !credentialNameRegex.test(formData['CredentialName'])
  const isRed = formData["CredentialName"]?.length !== 0 && inValidName;
  return (
    <FormFields isFormValue={isFormValue} fields={nameProps} formData={formData} isRed={isRed}>
      <div css={css`position:relative; display:inline-block; width: 100%`}>
        <input
          type="text"
          css={css`
            padding: 7px;
            border-radius: 3px;
            width: 97%;
            border: 1px solid ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
             &::placeholder {
               font-style: italic; 
               color: var(--spectrum-global-color-gray-400); 
              }
             &:focus {
              outline: none;
              border-color: ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
            }
          `}
          value={formData["CredentialName"]}
          onChange={(e) => handleChange(e, "CredentialName")}
          placeholder={nameProps?.placeholder}
          maxLength={nameProps?.range}
        />
        <span css={css`display : ${formData["CredentialName"]?.length < 3 && formData["CredentialName"]?.length !== 0 ? "block" : "none"}`}><AlertIcon /></span>
      </div>
    </FormFields>
  )
}

const AllowedOrigins = ({ originsProps, isFormValue, type, formData, handleChange }) => {

  const validateAllowedOrigins = formData['AllowedOrigins']?.split(',').map((data) => hostnameRegex.test(data.trim()));
  const isAllowedOriginsValid = validateAllowedOrigins?.every((value) => value === true);
  const isRed = formData["AllowedOrigins"] !== undefined && !isAllowedOriginsValid && formData["AllowedOrigins"]?.length !== 0;

  return (
    <FormFields isFormValue={isFormValue} fields={originsProps} type={type} formData={formData} isRed={isRed} >
      <textarea
        css={css`
          flex: 1;
          padding: 7px;
          height: 50px;
          border-radius: 3px;
          border: 1px solid ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
          resize: none; 
          width: 90%;
          color: #4b4b4b;
          font-family: adobe-clean, Helvetica, Arial, sans-serif;
          &::placeholder {
            color:var(--spectrum-global-color-gray-600);
            font-style: italic;
          }
          &:focus {
            outline: none;
            border-color: ${isRed ? "rgb(211, 21, 16)" : "var(--spectrum-global-color-gray-400)"};
          }
          &:hover {
            &::placeholder {
              color:var(--spectrum-global-color-gray-800);
            }
          }
        `}
        value={formData["AllowedOrigins"]}
        placeholder={originsProps?.placeholder}
        onChange={(e) => handleChange(e, "AllowedOrigins")}
      ></textarea>
    </FormFields>
  )
}

const Downloads = ({ downloadsProp, handleChange, formData }) => {
  const { label, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading } = downloadsProp;

  return (
    <div css={css` display: flex;gap: 10px;align-items: center;`}>
      <input type="checkbox" css={css`accent-color: #5b5a5a;transform: scale(1.1);`} onChange={(e) => handleChange(e, "Downloads")} checked={formData['Downloads']} />
      <p css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > {label} </p>
      <div css={css`cursor:pointer;display: flex;justify-content: center;align-items: center;`}>
        {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
      </div>
    </div>
  )
}

const Download = ({ downloadProp, formData, isFormValue, handleChange }) => {
  return (
    <>
      {
        downloadProp?.selectOptions?.length > 1 &&
        <FormFields isFormValue={isFormValue} fields={downloadProp}>
          <select
            css={css`
              font-style: italic;
              font-weight: 500;
              font-family: 'adobe-clean';
              padding: 7px;
              border-radius: 3px;
              border: 1px solid #D0D0D0 !important;
              width:100%;
            `}
            id="selectBox"
            value={formData['Download']}
            onChange={(e) => handleChange(e, "Download")}
          >
            {downloadProp?.selectOptions?.length > 1 && <option value="" hidden>Select language for your code pickData</option>}
            {downloadProp?.selectOptions?.map((option, index) => (
              <option key={index} data-link={option.href} value={option.title} >{option.title}</option>
            ))}
          </select>
        </FormFields>
      }
    </>

  )
}

const SideContent = ({ sideContent, SideComp }) => {
  return (
    <>
      <div
        css={css`
          width: 2px; 
          background-color: #D0D0D0; 

          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            display:none;
          }

        `}
      />
      <div
        css={css`
          width:50%;
 
          @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
            width:100%;
          }

        `}>
        <SideComp side={sideContent} />
      </div>
    </>
  )
}

const AdobeDeveloperConsole = ({ formData, handleChange, adobeDeveloperConsole }) => {
  return (
    <div css={css`display: flex; gap: 10px;`}>
      <input type="checkbox" css={css`accent-color: #5b5a5a;transform: scale(1.1);`} checked={formData['Agree']} onChange={(e) => handleChange(e, 'Agree')} />
      <p css={css`color:var(--spectrum-global-color-gray-800);margin:0;display:inline-flex;gap:5px;`} >{adobeDeveloperConsole?.label}
        <a
          href={adobeDeveloperConsole?.href}
          css={css`
            color:rgb(0, 84, 182);
            &:hover {adobeDeveloperConsole
              color: rgb(2, 101, 220);
            }
          `}
          target="_blank" rel="noreferrer">{adobeDeveloperConsole?.linkText}</a>.
      </p>
    </div>
  )
}

const CreateCredential = ({ createCredential, isValid, setIsCreateNewCredential, isCreateNewCredential }) => {
  return (
    <div css={
      css`
        display : flex;
        gap:16px;
        align-items : center;
      `
    }>
      <button
        id="credentialButton"
        className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
        css={css`width:fit-content;`} onClick={createCredential} disabled={!isValid} >
        <span className="spectrum-Button-label">Create credential</span>
      </button>
      {isCreateNewCredential && <p css={css`text-decoration : underline;margin:0; cursor : pointer;`} onClick={() => setIsCreateNewCredential(false)}>Cancel</p>}
    </div>
  )
}

export { CredentialForm, SideCredential, CredentialName, AllowedOrigins, Downloads, Download, SideContent, AdobeDeveloperConsole };