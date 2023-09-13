import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { ChangeOrganization } from './ChangeOrganization';
import { JoinBetaProgram } from './JoinBetaProgram';
import { AlertIcon, CommonFields, downloadAndModifyZip, getOrganization, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './CommonFields';
import { ContextHelp } from './ContextHelp';
import { Toast } from '../Toast';

const CredentialForm = ({ formProps, credentialType, service }) => {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  const [errResp, setErrorResp] = useState("`Unable to create credential. Error <code>:<error text>. Please try to submit the form again`");
  // check the localstorage if you already have previous credentials and then choose what need to select
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showCredential, setShowCredential] = useState(false);
  const [formField, setFormField] = useState([]);
  const [formData, setFormData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectToBeta, setRedirectBetaProgram] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [organizationChange, setOrganization] = useState(false);
  const [organization, setOrganizationValue] = useState({});

  const credentialForm = formProps?.CredentialForm;
  const isFormValue = credentialForm?.children?.filter(data => Object.keys(data.props).some(key => key.startsWith('contextHelp')));

  const getValueFromLocalStorage = () => {
    const OrgID = localStorage?.getItem('OrgID');
    if (!OrgID) {
      getOrganization(setOrganizationValue);
    }
    else {
      setOrganizationValue(JSON.parse(atob(OrgID)))
    }
  }

  useEffect(() => {
    getValueFromLocalStorage();
  }, [organizationChange])

  const domains = localStorage.getItem('apiKey');

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

  useEffect(() => {

    const fields = [];
    const downloadObj = { label: "Language", selectOptions: [] };

    credentialForm?.children.forEach(({ type, props }) => {
      if (type?.name === "Downloads" && props?.children) {
        downloadObj.required = props.required || false;
        downloadObj.selectOptions.push(...[].concat(props.children).map(({ props: { title, href } }) => ({ title, href })));
        setFormData(prevData => ({ ...prevData, ...(Array.isArray(props.children) ? null : { Download: props.children?.props?.title }) }));
      }
      fields.push({ [type?.name]: { ...props, required: type?.name === "CredentialName" } });
    });

    if (downloadObj.selectOptions.length) {
      fields.push({ Download: downloadObj });
    }

    setFormField(fields);
    getValueFromLocalStorage();

    if (domains) {
      setShowCredential(true);
      setShowCreateForm(false);
    }

  }, []);

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

    const requiredFields = Array.from(credentialForm?.children || []).filter(child => child?.props?.required || child.type.name === "CredentialName")?.map(child => child.type.name);

    if (requiredFields.includes("Downloads") || formData['Downloads']) {
      requiredFields.push("Download");
    };
    const isValidCredentialName = /^(?=[A-Za-z0-9\s]{3,}$)[A-Za-z0-9\s]*$/.test(formData.CredentialName);
    const validateAllowedOrigins = formData['AllowedOrigins']?.split(',').map((data) => /^(localhost:\d{1,5}|(\*\.|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)|\*|(\*\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/.test(data.trim()));
    const isAllowedOriginsValid = requiredFields.includes("AllowedOrigins") ? validateAllowedOrigins?.every((value) => value === true) && validateAllowedOrigins.length <= 5 : true;
    const isValid = isValidCredentialName && requiredFields.every(field => formData[field]) && isAllowedOriginsValid;

    setIsValid(isValid);

  }, [formData]);

  useEffect(() => {
    setTimeout(() => { setAlertShow(false) }, 8000);
  }, [alertShow])

  const handleChange = (e, type) => {
    const value = (type === "Downloads") ? e.target.checked : e.target.value;
    setFormData(prevData => ({ ...prevData, [type]: value }));
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
          "x-api-key": "UDPWeb1",
        },
        body: JSON.stringify(data),
      });

      const resResp = await response.json();

      if (response.status === 200) {
        setResponse(resResp);
        setShowCredential(true);
        setAlertShow(true);
        const responseValue = { Credential: [{ key: "API Key", value: resResp?.apiKey }, { key: "Allowed domains", value: formData["AllowedOrigins"] }, { key: "Organization", value: organization?.name }], credentialName: formData["CredentialName"], response: resResp };
        localStorage.setItem("apiKey", btoa(JSON.stringify(responseValue)));
        downloadAndModifyZip(`/console/api/organizations/${organization?.id}/projects/${resResp.projectId}/workspaces/${resResp.workspaceId}/download`);
      } else if (response.status === 400) {
        setAlertShow(true);
        setIsValid(false);
        setErrorResp(resResp?.messages[0]?.message);
        setShowCreateForm(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const sideObject = formField.find(item => 'Side' in item);

  return (
    <>
      {!redirectToBeta && showCreateForm && !loading &&
        <div
          className={classNames(credentialForm?.className)}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          {credentialForm?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{credentialForm?.title}</h3>}
          {credentialForm?.paragraph &&
            <p
              className="spectrum-Body spectrum-Body--sizeL"
              css={css`
                width: 50%;
                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}) {
                  width: 100% ;
                }
              `}>
              {credentialForm?.paragraph}
            </p>
          }
          <p
            className="spectrum-Body spectrum-Body--sizeS"
            css={css`color:var(--spectrum-global-color-gray-800);`}
          >You're creating this credential in [<b>{organization?.name}</b>].
            <span
              css={css`
                margin-left :10px;
                text-decoration:underline;
                color: var(--spectrum-global-color-gray-800);
                cursor:pointer;`
              }
              onClick={() => setModalOpen(true)}
            >
              Change organization?
            </span>
          </p>
          <div
            css={css`
              display:flex;
              gap: 35px;

              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                flex-direction : column;
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
                  gap:30px;
                  flex-direction:column;
                  width: 100%;
                `}
              >
                {formField.map(({ CredentialName: name, AllowedOrigins: origins, Downloads: downloads, Download: download, Side: side }, index) => {
                  return (
                    <>
                      {!side &&
                        <>
                          {!download ?
                            <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`} key={index}>
                              {name && <CredentialName nameProps={name} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                              {origins && <AllowedOrigins originsProps={origins} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                              {downloads && <Downloads downloadsProp={downloads} type="Downloads" formData={formData} handleChange={handleChange} />}
                            </div> :
                            <>{formData['Downloads'] && download && <Download downloadProp={download} formData={formData} isFormValue={isFormValue} handleChange={handleChange} />}</>
                          }
                        </>
                      }
                    </>
                  )
                })
                }
                <button
                  id="credentialButton"
                  className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`} onClick={createCredential} disabled={!isValid} >
                  <span className="spectrum-Button-label">Create credential</span>
                </button>
              </div>
            </div>
            {sideObject ? <SideContent sideContent={sideObject?.Side?.children} /> : null}
          </div>
          <p className="spectrum-Body spectrum-Body--sizeS" css={css` color:var(--spectrum-global-color-gray-800); `} >
            Have existing credentials?
            <a href="https://developer.adobe.com/console/"
              css={css`
                margin-left : 10px;
                color:var(--spectrum-global-color-gray-800);

                &:hover {
                  color:var(--spectrum-global-color-gray-900);
                }

              `}>
              Go to Developer Console
            </a>
          </p>
          <p css={css`color:var(--spectrum-global-color-gray-800);margin:0;`} >
            <a
              href="https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230822.pdf"
              css={css`
                color:rgb(0, 84, 182);
                &:hover {
                  color: rgb(2, 101, 220);
                }
              `}
              target="_blank">  Adobe Developer Terms of Use</a>.
          </p>
        </div>
      }

      {alertShow && errResp &&
        <>
        
          {!organizationChange ? (
            <Toast
              message={showCreateForm && !showCredential ? errResp : !isError && showCredential && `Your credentials were created successfully.`}
              variant={isError || (showCreateForm && !showCredential) ? "error" : "success"}
            />) :
            <Toast message="Organization Changed" variant="success" />
          }
        </>
      }
      {loading && !showCredential && <Loading credentials={credentialForm} />}
      {modalOpen && (
        <ChangeOrganization
          setModalOpen={setModalOpen}
          redirectToBeta={redirectToBeta}
          setRedirectBetaProgram={setRedirectBetaProgram}
          setAlertShow={setAlertShow}
          alertShow={alertShow}
          organizationChange={organizationChange}
          setOrganization={setOrganization}
          setOrganizationValue={setOrganizationValue}
        />
      )}
      {isError && <IllustratedMessage setShowCreateForm={setShowCreateForm} errorMessage={formProps?.IllustratedMessage} />}
      {showCredential && !showCreateForm && <MyCredential credentialProps={formProps} response={response} credentialName={formData['CredentialName']} setShowCreateForm={setShowCreateForm} setShowCredential={setShowCredential} />}
      {redirectToBeta && <JoinBetaProgram joinBeta={formProps?.JoinBetaProgram} />}
    </>
  )
}

const Side = ({ side }) => (side);

const CredentialName = ({ nameProps, isFormValue, formData, handleChange }) => {
  const isRed = formData["CredentialName"]?.length < 6 && formData["CredentialName"]?.length !== 0;
  return (
    <CommonFields isFormValue={isFormValue} fields={nameProps} formData={formData} isRed={isRed}>
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
    </CommonFields>
  )
}

const AllowedOrigins = ({ originsProps, isFormValue, type, formData, handleChange }) => {

  const validateAllowedOrigins = formData['AllowedOrigins']?.split(',').map((data) => /^(localhost:\d{1,5}|(\*\.|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)|\*|(\*\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/.test(data.trim()));
  const isAllowedOriginsValid = validateAllowedOrigins?.every((value) => value === true) && validateAllowedOrigins.length <= 5;
  const isRed = formData["AllowedOrigins"] !== undefined && !isAllowedOriginsValid && formData["AllowedOrigins"]?.length !== 0;

  return (
    <CommonFields isFormValue={isFormValue} fields={originsProps} type={type} formData={formData} isRed={isRed} >
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
    </CommonFields>
  )
}

const Downloads = ({ downloadsProp, handleChange, formData }) => {
  const { label, contextHelpLabelForLink, contextHelpLink, contextHelpText, contextHelp, contextHelpHeading } = downloadsProp;

  return (
    <div css={css` display: flex;gap: 10px;align-items: center;`}>
      <input type="checkbox" onChange={(e) => handleChange(e, "Downloads")} checked={formData['Downloads']} />
      <p css={css` color:var(--spectrum-dialog-confirm-description-text-color, var(--spectrum-global-color-gray-800));margin:0;`} > {label} </p>
      <div css={css`cursor:pointer;display: flex;justify-content: center;align-items: center;`}>
        {contextHelp && <ContextHelp heading={contextHelpHeading} text={contextHelpText} link={contextHelpLink} label={contextHelpLabelForLink} />}
      </div>
    </div>
  )
}

const Download = ({ downloadProp, formData, isFormValue, handleChange }) => {
  return (
    <CommonFields isFormValue={isFormValue} fields={downloadProp}>
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
        value={ formData['Download'] ? formData['Download'] : downloadProp?.selectOptions[0].title }
        onChange={(e) => handleChange(e, "Download")} 
      >
        {downloadProp?.selectOptions?.length > 1 && <option value="" hidden>Select language for your code pickData</option>}
        {downloadProp?.selectOptions?.map((option, index) => (
          <option key={index} data-link={option.href} value={option.title} >{option.title}</option>
        ))}
      </select>
    </CommonFields>

  )
}

const SideContent = ({ sideContent }) => {
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
        <Side side={sideContent} />
      </div>
    </>
  )
}

export { CredentialForm, Side, CredentialName, AllowedOrigins, Downloads, Download, SideContent };
