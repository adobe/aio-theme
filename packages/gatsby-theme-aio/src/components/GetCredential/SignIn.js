import React, { useContext } from 'react';
import Context from '@adobe/gatsby-theme-aio/src/components/Context';
import { css } from "@emotion/react";
import classNames from "classnames";
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './CommonFields';

const SignIn = ({ signInProps }) => {

  const { ims } = useContext(Context);

  return (
    <>
      <div className={classNames(signInProps?.className)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        {signInProps?.title &&
          <h2 className="spectrum-Heading spectrum-Heading--sizeL"
            css={css`
              color:var(--spectrum-global-color-gray-900);
              font-weight:700;
            `}
          >{signInProps?.title}</h2>}
        {signInProps?.paragraph &&
          <p
            className="spectrum-Body spectrum-Body--sizeL"
            css={css`
                width: 50%;
                color:var(--spectrum-global-color-gray-800);
                @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}) {
                  width: 100% ;
                }
              `}>
            {signInProps?.paragraph}
          </p>
        }
        {signInProps?.buttonText &&
          <button
            className={`spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM`}
            css={css`width:fit-content;margin-top:10px`}
            onClick={() => ims?.signIn()}>
            <span className="spectrum-Button-label">{signInProps?.buttonText}</span>
          </button>
        }
      </div>
    </>
  )
}

export { SignIn };
