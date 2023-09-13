import React from 'react';
import { css } from "@emotion/react";
import classNames from "classnames";

const UnKnownErrorImage = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 103"
      width="150"
      height="103"
    >
      <path
        fill="#6d6d6d"
        d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
      ></path>
    </svg>
  )
}

const IllustratedMessage = ({ setShowCreateForm, errorMessage }) => {

  return (
    <div
      className={classNames(errorMessage?.className)}
      css={css`
        display:flex;
        flex-direction:column;
        align-items: center;
        gap:20px;
      `}
    >
      <UnKnownErrorImage />
      <p className="spectrum-Heading spectrum-Heading--sizeXL" css={css` font-weight:100; `}> UnKnown Error </p>
      <p className='spectrum-Body spectrum-Body--sizeM'>An error has occured when you tried to create a new credential.</p>
      <p className='spectrum-Body spectrum-Body--sizeM'>Please try to submit the form again.</p>
      <button className="spectrum-Button spectrum-Button--outline spectrum-Button--primary spectrum-Button--sizeM" onClick={() => setShowCreateForm(true)}>
        <span className="spectrum-Button-label">Try Again</span>
      </button>
      <p className="spectrum-Body spectrum-Body--sizeS"><a href={errorMessage?.helpLink}>{errorMessage?.helpLinkText}</a></p>
    </div>
  )
}

export { IllustratedMessage }
