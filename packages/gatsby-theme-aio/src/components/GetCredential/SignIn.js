import React, { useContext } from 'react';
import Context from '../Context';
import { css } from '@emotion/react';
import classNames from 'classnames';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';
import GetCredentialContext from './GetCredentialContext';

const SignIn = ({}) => {
  const { getCredentialData } = useContext(GetCredentialContext);
  const signInProps = getCredentialData?.[SignIn];
  
  const { ims } = useContext(Context);

  return (
    <>
      <div
        className={classNames(signInProps?.className)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          color: var(--spectrum-global-color-gray-800);
          width: 100%;
          height: 100%;
          text-align: left;

          @media screen and (min-width: ${MIN_MOBILE_WIDTH}) and (max-width: ${MAX_TABLET_SCREEN_WIDTH}) {
            padding: 0;
            width: 100%;
          }
        `}>
        {signInProps?.title && (
          <h2
            className="spectrum-Heading spectrum-Heading--sizeL"
            css={css`
              color: var(--spectrum-global-color-gray-900);
              font-weight: 700;
            `}>
            {signInProps?.title}
          </h2>
        )}
        {signInProps?.paragraph && (
          <p
            className="spectrum-Body spectrum-Body--sizeL"
            css={css`
              color: var(--spectrum-global-color-gray-800);
            `}>
            {signInProps?.paragraph}
          </p>
        )}
        {signInProps?.buttonText && (
          <button
            className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
            css={css`
              width: fit-content;
              margin-top: 10px;
            `}
            onClick={() => ims?.signIn()}>
            <span className="spectrum-Button-label">{signInProps?.buttonText}</span>
          </button>
        )}
      </div>
    </>
  );
};

export { SignIn };
