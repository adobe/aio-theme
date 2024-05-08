import React from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { PreviousProject, ReturnClientDetails, ReturnProducts } from './PreviousProject';
import { Organization } from './Organization';
import { CredentialForm } from './CredentialForm';
const PreviousCredential = ({
  returnProps,
  showOrganization,
  setOrganizationValue,
  organization,
  setIsShow,
  isShow,
  allOrganization,
  setIsCreateNewCredential
}) => {

  const credentialHeader = returnProps[CredentialForm];

  const returnFields = {};
  const productList = [];

  returnProps?.[PreviousProject]?.children.forEach(({ type, props }) => {
    returnFields[type] = { ...props };
    if (props?.children) {
      if (type === RetunrSideComp) {
        props?.children?.forEach(({ props, type }) => {
          returnFields[type] = { ...props }
        })
      }
      if (type === ReturnProducts) {
        props?.children?.forEach(({ props: { label, icon } }) => { productList.push({ label, icon }) })
      }
      if (type === ReturnClientDetails) {
        returnFields[ReturnClientDetails] = props;
      }
    }
  })

  const retunrSideComp = returnFields?.[RetunrSideComp];
  const returnCustomComp = returnFields?.[ReturnCustomComp];
  const returnNewCredential = returnFields?.[ReturnNewCredential];

  return (
    <>
      <div
        className={classNames(credentialHeader?.className)}
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
            {credentialHeader?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeXL">{credentialHeader?.title}</h3>}
            {credentialHeader?.paragraph && <p className="spectrum-Body spectrum-Body--sizeL"> {credentialHeader?.paragraph} </p>}
            <p
              className="spectrum-Body spectrum-Body--sizeS"
              onClick={() => setIsShow(true)}
              css={css`color:var(--spectrum-global-color-gray-800);display : inline-flex`}
            >
              You’re viewing in [<b>{organization?.name}</b>].
              {showOrganization &&
                <Organization isShow={isShow} setOrganizationValue={setOrganizationValue} setIsShow={setIsShow} organization={organization} allOrganization={allOrganization} />
              }
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
            {retunrSideComp && <RetunrSideComp returnNewCredential={returnNewCredential} returnCustomComp={returnCustomComp} setIsCreateNewCredential={setIsCreateNewCredential} />}
          </div>

          <div
            css={css`
              width: 1px; 
              background-color: #D5D5D5; 

              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                display:none;
              }

            `}
          />
          <div>
            <PreviousProject returnProps={returnProps} returnFields={returnFields} productList={productList} />
          </div>
        </div>
      </div>
    </>
  )
};

const RetunrSideComp = ({ setIsCreateNewCredential, returnNewCredential, returnCustomComp }) => {
  return (
    <>
      <div
        css={css`
          display:flex;
          gap:30px;
          flex-direction:column;
          width: 100%;
        `}
      >
        <ReturnCustomComp returnCustomComp={returnCustomComp} />
        <ReturnNewCredential returnNewCredential={returnNewCredential} setIsCreateNewCredential={setIsCreateNewCredential} />
      </div>
    </>
  )
}

const ReturnCustomComp = ({ returnCustomComp }) => <>{returnCustomComp?.children}</>;

const ReturnNewCredential = ({ returnNewCredential, setIsCreateNewCredential }) => {
  return (
    <div
      css={css`
        display:flex;
        gap:16px;
        flex-direction:column;
        width: 100%;
      `}
    >
      <h3 className='spectrum-Heading spectrum-Heading--sizeM'>{returnNewCredential?.heading}</h3>
      <button className="spectrum-Button spectrum-Button--fill spectrum-Button--primary spectrum-Button--sizeM"
        onClick={() => setIsCreateNewCredential(true)}
        css={css`
          width : 180px;
          height : 32px;
        `}
      >
        <span className="spectrum-Button-label">{returnNewCredential?.buttonLabel}</span>
      </button>

    </div>
  )
}

const ReturnCredentialDetails = () => { }

export { PreviousCredential, ReturnCustomComp, ReturnNewCredential, RetunrSideComp, ReturnCredentialDetails };