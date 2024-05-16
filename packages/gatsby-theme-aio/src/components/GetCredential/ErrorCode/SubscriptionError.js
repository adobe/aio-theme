import React, { useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { UnKnownErrorImage } from "../IllustratedMessage";
import { Link, Button } from "@adobe/react-spectrum";
import Context from "../../Context";

const SubscriptionError = ({ errorProps }) => {

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

    <div
      css={css`
        text-align:center;
        display: flex;
        flex-direction: column;
        gap: 30px;

        button {
          cursor : pointer;
        }

    `}
    >
      <div
        css={css`
          display : flex;
          gap:32px;
          flex-direction : column;
          justify-content : center;
          align-items : center;
        `}
      >
        <UnKnownErrorImage />

        {errorProps?.title && <h1 className="spectrum-Heading spectrum-Heading--sizeXL"
          css={css`
            font-weight: var(--spectrum-heading-m-light-emphasized-text-font-weight, var(--spectrum-alias-heading-text-font-weight-light));
          `}
        >
          {errorProps?.title}
        </h1>}

        {errorProps?.description && <p className="spectrum-Body spectrum-Heading--sizeS" css={css`font-weight: 400;width: 75%;`}>
          {errorProps?.description}
        </p>}

        {errorProps?.buttonLabel &&
          <div css={css`a:hover { text-decoration : none }`}>
            <Button variant="accent" >
              <Link variant="overBackground" isQuiet href={errorProps?.buttonLink} target="_blank"> {errorProps?.buttonLabel}</Link>
            </Button>
          </div>
        }

      </div>

      <div>

        <p
          css={css`
            font-size: var(--spectrum-global-dimension-size-225);
            color: #383838;
            margin-bottom: var(--spectrum-global-dimension-size-0);
          `}
        >You're currently signed in as <b>[{emailID}]</b></p>

        <p
          css={css`
            font-size: var(--spectrum-global-dimension-size-225);
            color: #383838;
            margin-top: var(--spectrum-global-dimension-size-0);
          `}
        >Have a enterprise account? Try to log in with that account to access your developer organization.</p>

        <Button variant="secondary" onPress={() => ims?.signIn()} style="fill">Sign in as a different user</Button>

      </div>

      <div css={css` margin: var(--spectrum-global-dimension-size-225) 0 0 `} >
        <a
          css={css`
            font-size: var(--spectrum-global-dimension-size-200);
            color:#0066ff;
          `}
          href='/'>{errorProps?.helpLink}</a>
      </div>

    </div>
  )
}

export { SubscriptionError };
