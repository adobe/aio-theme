import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context';
import { css } from "@emotion/react";
import { Organization } from './Organization';
import GetCredentialContext from './GetCredentialContext';
import { Link } from '@adobe/react-spectrum';


const NoDeveloperAccessError = ({ developerAccessError }) => {

  const { ims } = useContext(Context);

  const { selectedOrganization } = useContext(GetCredentialContext);

  const [emailID, setEmailID] = useState('');
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    (async () => {
      if (ims && ims.isSignedInUser()) {
        const profile = await ims.getProfile();
        setEmailID(profile?.email);
      }
    })();
  }, [ims])

  return (
    <>
      {developerAccessError?.title && <h3 className="spectrum-Heading spectrum-Heading--sizeL">{developerAccessError?.title}</h3>}
      <p
        className="spectrum-Body spectrum-Body--sizeL">
        To create credentials, you need developer role permissions for the <b>[Firefly - Firefly and Creative Cloud Automation API]</b>.
      </p>

      {developerAccessError && <Link href={developerAccessError?.docsLink} >{developerAccessError?.docsLinkText}</Link>}

      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <p
          className="spectrum-Body spectrum-Body--sizeS"
          css={css`color:var(--spectrum-global-color-gray-800);display : inline-flex;`}
        >
          You're currently signed in as [<b>{emailID}</b>] in [<b>{selectedOrganization?.name}</b>]<Organization isShow={isShow} setIsShow={setIsShow} />
        </p>
        <p
          className="spectrum-Body spectrum-Body--sizeS"
          css={css`color:var(--spectrum-global-color-gray-800);`}
        >
          Have a personal account? Try to log in with that account to access your personal developer organization.
        </p>
      </div>
      <button
        className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
        css={css`width:fit-content;margin-top:10px`}
        onClick={() => ims?.signIn()}>
        <span className="spectrum-Button-label">Sign in as a different user</span>
      </button>
    </>
  )
}

export { NoDeveloperAccessError };