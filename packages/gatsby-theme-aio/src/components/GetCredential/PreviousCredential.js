import React, { useContext, useState } from 'react';
import { css } from '@emotion/react';
import '@spectrum-css/contextualhelp/dist/index-vars.css';
import classNames from 'classnames';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import { PreviousProject } from './PreviousProject';
import { Organization } from './Organization';
import { CredentialForm } from './CredentialForm';
import { ReturnSideComp } from './Return/ReturnSideComp';
import { CardProducts } from './Products';
import { ReturnCustomComp } from './Return/ReturnCustomComp';
import { ReturnNewCredential } from './Return/ReturnNewCredential';
import GetCredentialContext from './GetCredentialContext';
import { ReturnCredentialDetails } from './Return/ReturnCredentialDetails';

const PreviousCredential = ({ setIsCreateNewCredential }) => {
  const { getCredentialData } = useContext(GetCredentialContext);
  const returnProps = getCredentialData;

  const [isShow, setIsShow] = useState(false);
  const credentialHeader = returnProps?.[CredentialForm];
  const { selectedOrganization } = useContext(GetCredentialContext);

  const returnFields = {};
  const productList = [];

  returnProps?.[PreviousProject]?.children.forEach(({ type, props }) => {
    returnFields[type] = props;

    if (props?.children) {

      const children = Array.isArray(props.children) ? props.children : [props.children];

      children.forEach(({ props: childProps, type: childType }) => {
        if (type === ReturnSideComp || type === ReturnCredentialDetails) {
          returnFields[childType] = childProps;
        } else if (type === CardProducts) {
          const { label, icon } = childProps;
          productList.push({ label, icon });
        }

      });
    }

  });

  const returnSideComp = returnFields?.[ReturnSideComp];
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
        `} data-cy="return-flow">
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
            {credentialHeader?.title && (
              <h3 className="spectrum-Heading spectrum-Heading--sizeXL">
                {credentialHeader?.title}
              </h3>
            )}
            {credentialHeader?.paragraph && (
              <p className="spectrum-Body spectrum-Body--sizeL"> {credentialHeader?.paragraph} </p>
            )}
            <p
              className="spectrum-Body spectrum-Body--sizeS"
              onClick={() => setIsShow(true)}
              css={css`
                color: var(--spectrum-global-color-gray-800);
                display: inline-flex;
              `}>
              {selectedOrganization.type === "developer" ?
                "You’re viewing in your personal developer organization" :
                <>You’re viewing in [<b> {selectedOrganization?.name} </b>] .</>}
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
            {returnSideComp && (
              <ReturnSideComp
                returnSideComp={returnSideComp}
                returnNewCredential={returnNewCredential}
                returnCustomComp={returnCustomComp}
                setIsCreateNewCredential={setIsCreateNewCredential}
              />
            )}
          </div>

          <div
            css={css`
              width: 1px;
              background-color: #d5d5d5;

              @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
                display: none;
              }
            `}
          />
          <div>
            <PreviousProject
              returnFields={returnFields}
              productList={productList}
              collapse = { returnProps?.[PreviousProject]?.isCollapsable}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { PreviousCredential };
