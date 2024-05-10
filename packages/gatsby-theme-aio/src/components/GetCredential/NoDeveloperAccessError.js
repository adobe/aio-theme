import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context';
import { css } from "@emotion/react";


const NoDeveloperAccessError = ({ developerAccessError }) => {

  const { ims } = useContext(Context);

  const [emailID, setEmailID] = useState('');

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
        To create credentials, you need developer role permissions for the [<b>Adobe Express Embed SDK</b>].
      </p>

      {developerAccessError &&
        <a
          target="_blank"
          rel="noreferrer"
          href={developerAccessError?.docsLink}
          css={css`
              color:rgb(0, 84, 182);
              &:hover {
                color: rgb(2, 101, 220);
              }`
          }
        >
          <p
            className='spectrum-Body spectrum-Body--sizeM'
            css={css`
              color:rgb(0, 84, 182);
              &:hover {
                color: rgb(2, 101, 220);
              }`
            }
          >
            {developerAccessError?.docsLinkText}
          </p>
        </a>
      }
      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <p
          className="spectrum-Body spectrum-Body--sizeS"
          css={css`color:var(--spectrum-global-color-gray-800);`}
        >
          You're currently signed in as [<b>{emailID}</b>]
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