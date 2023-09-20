import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MyCredential } from './MyCredential';
import { Loading } from "./Loading";
import { IllustratedMessage } from "./IllustratedMessage";
import { ChangeOrganization } from './ChangeOrganization';
import { JoinBetaProgram } from './JoinBetaProgram';
import { AlertIcon, FormFields, downloadAndModifyZip, getOrganization, MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { ContextHelp } from './ContextHelp';
import { Toast } from '../Toast';

const hostnameRegex = /^(localhost:\d{1,5}|(\*\.|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)|\*|(\*\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/;
const credentialNameRegex = /^(?=[A-Za-z0-9\s]{3,}$)[A-Za-z0-9\s]*$/;

const CredentialForm = ({ formProps, credentialType, service }) => {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});
  const [errResp, setErrorResp] = useState("");
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
  const [showOrganization, setShowOrganization] = useState(true);

  const credentialForm = formProps?.[CredentialForm];
  const isFormValue = credentialForm?.children?.filter(data => Object.keys(data.props).some(key => key.startsWith('contextHelp')));

  const getValueFromLocalStorage = () => {
    const OrgID = localStorage?.getItem('OrgId');

    const isOrganization = Number(localStorage.getItem('isOrganizationLength'));

    if ((!isOrganization && isOrganization === 0) || !OrgID) {
      getOrganization(setOrganizationValue);
    } else {
      if (isOrganization > 1 && isOrganization !== 0) {
        setShowOrganization(true);
      } else {
        setShowOrganization(false);
      }
      setOrganizationValue(JSON.parse(atob(OrgID)));
    }
  }

  const initialLoad = () => {
    const fields = {};
    const downloadObj = { label: "Language", selectOptions: [] };

    credentialForm?.children.forEach(({ type, props }) => {
      if (type === Downloads && props?.children) {
        downloadObj.required = props.required || false;
        downloadObj.selectOptions.push(...[].concat(props.children).map(({ props: { title, href } }) => ({ title, href })));
        setFormData(prevData => ({ ...prevData, ...(Array.isArray(props.children) ? null : { Download: props.children?.props?.title }) }));
      }
      fields[type] = { ...props, required: type === CredentialName || props?.required };
    });

    if (downloadObj.selectOptions.length) {
      fields[Download] = downloadObj;
      if (downloadObj.selectOptions.length === 1) {
        setFormData(prevData => ({ ...prevData, Download: downloadObj.selectOptions[0]?.title }));
      }
    }

    setFormField(fields);
    getValueFromLocalStorage();

  }

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
    const isAllowedOriginsValid = isCheckAllowedOrgins ? validateAllowedOrigins?.every((value) => value === true) && formData["AllowedOrigins"] !== undefined && formData["AllowedOrigins"]?.length !== 0 : true;

    const isValid = isValidCredentialName && isAllowedOriginsValid && formData.Agree === true;

    setIsValid(isValid);
  }, [formData]);

  const handleChange = (e, type) => {
    const value = (type === "Downloads" || type === "Agree") ? e.target.checked : e.target.value;
    setFormData(prevData => ({ ...prevData, [type]: value }));
    if (type === "Downloads") {
      formField?.[Download]?.selectOptions.forEach((data) => {
        if (data.title === formData?.Download) {
          setFormData(prevData => ({ ...prevData, zipUrl: data.href }));
        }
      })
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
          "x-api-key": "UDPWeb1",
        },
        body: JSON.stringify(data),
      });

      const resResp = await response.json();

      if (response.status === 200) {
        setResponse(resResp);
        setShowCredential(true);
        setAlertShow(true);
        formData['Downloads'] && downloadAndModifyZip(`/console/api/organizations/${organization?.id}/projects/${resResp.projectId}/workspaces/${resResp.workspaceId}/download`, formData['Download'], formData['zipUrl']);
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

  const sideObject = formField?.[Side];
  const credentialName = formField?.[CredentialName];
  const allowedOrigins = formField?.[AllowedOrigins];
  const downloads = formField?.[Downloads];
  const download = formField?.[Download];

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
          <div
            css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
            color:var(--spectrum-global-color-gray-800);
            padding-left: var(--spectrum-global-dimension-size-800);
            width: calc(7 * 100% / 12);
            height: 100%;
            text-align: left;
            @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
              padding: 0;
              width: 100%;
            }
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
              css={css`color:var(--spectrum-global-color-gray-800);`}
            >You're creating this credential in [<b>{organization?.name}</b>].
              {showOrganization &&
                <button
                  tabIndex="0"
                  css={css`
                    border: none;
                    padding:0;
                    font-family:'adobe-clean';
                    background: transparent;
                    margin-left :10px;
                    text-decoration:underline;
                    color: var(--spectrum-global-color-gray-800);
                    cursor:pointer;`
                  }
                  onClick={() => setModalOpen(true)}
                >
                  Change organization?
                </button>}
            </p>
          </div>
          <div
            css={css`
              display:flex;
              gap: 35px;
              padding-left: var(--spectrum-global-dimension-size-800);

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
                  gap:30px;
                  flex-direction:column;
                  width: 100%;
                `}
              >
                <div css={css`display:flex;flex-direction:column;width:100%;gap:5px;`}>
                  {credentialName && <CredentialName nameProps={credentialName} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                  {allowedOrigins && <AllowedOrigins originsProps={allowedOrigins} isFormValue={isFormValue} formData={formData} handleChange={handleChange} />}
                  {downloads && download && <Downloads downloadsProp={downloads} type="Downloads" formData={formData} handleChange={handleChange} />}
                </div>
                {download && <>{formData['Downloads'] && download && <Download downloadProp={download} formData={formData} isFormValue={isFormValue} handleChange={handleChange} />}</>}

                <div css={css`display: flex; gap: 10px;`}>
                  <input type="checkbox" checked={formData['Agree']} onChange={(e) => handleChange(e, 'Agree')} />
                  <p css={css`color:var(--spectrum-global-color-gray-800);margin:0;`} >{`By checking this box, you agree to `}
                    <a
                      href="https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230822.pdf"
                      css={css`
                        color:rgb(0, 84, 182);
                        &:hover {
                          color: rgb(2, 101, 220);
                        }
                      `}
                      target="_blank" rel="noreferrer">Adobe Developer Terms of Use</a>.
                  </p>
                </div>
                <button
                  id="credentialButton"
                  className={`spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM`}
                  css={css`width:fit-content;margin-top:10px`} onClick={createCredential} disabled={!isValid} >
                  <span className="spectrum-Button-label">Create credential</span>
                </button>
              </div>
            </div>
            {sideObject ? <SideContent sideContent={sideObject?.children} /> : null}
          </div>
          <p
            className="spectrum-Body spectrum-Body--sizeS"
            css={css` 
              color:var(--spectrum-global-color-gray-800);
              padding-left: var(--spectrum-global-dimension-size-800); 
              
              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                padding-left: 0;
              }

            `} >
            Have existing credentials?
            <a href="/console/" target="_blank" 
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
      {isError && !showCreateForm && !showCredential && <IllustratedMessage setShowCreateForm={setShowCreateForm} errorMessage={formProps?.[IllustratedMessage.name]} />}
      {showCredential && !showCreateForm && <MyCredential credentialProps={formProps} response={response} setShowCreateForm={setShowCreateForm} setShowCredential={setShowCredential} organizationName={organization?.name} formData={formData} />}
      {redirectToBeta && <JoinBetaProgram joinBeta={formProps?.[JoinBetaProgram]} />}
    </>
  )
}

const Side = ({ side }) => (side);

const CredentialName = ({ nameProps, isFormValue, formData, handleChange }) => {
  const isRed = formData["CredentialName"]?.length < 6 && formData["CredentialName"]?.length !== 0;
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