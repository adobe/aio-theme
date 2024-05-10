import React, { useState } from 'react';
import { css } from "@emotion/react";
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from "classnames";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { PreviousProject, ReturnClientDetails } from './PreviousProject';
import { Organization } from './Organization';
import { CredentialForm } from './CredentialForm';
import { RetunrSideComp } from './Return/RetunrSideComp';
import { ReturnProducts } from './Return/ReturnProducts';
import { ReturnCustomComp } from './Return/ReturnCustomComp';
import { ReturnNewCredential } from './Return/ReturnNewCredential';

const PreviousCredential = ({
  returnProps,
  showOrganization,
  setOrganizationValue,
  organization,
  allOrganization,
  setIsCreateNewCredential,
  setOrganizationChange
}) => {

  const [isShow, setIsShow] = useState(false);
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
              You’re viewing in {organization?.type === "developer" ? "in your personal developer organization" : <span>[<b>{organization?.name}</b>] </span>}.
              {showOrganization &&
                <Organization setOrganizationChange={setOrganizationChange} isShow={isShow} setOrganizationValue={setOrganizationValue} setIsShow={setIsShow} organization={organization} allOrganization={allOrganization} />
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
            {retunrSideComp && <RetunrSideComp retunrSideComp={retunrSideComp} returnNewCredential={returnNewCredential} returnCustomComp={returnCustomComp} setIsCreateNewCredential={setIsCreateNewCredential} />}
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

export { PreviousCredential };