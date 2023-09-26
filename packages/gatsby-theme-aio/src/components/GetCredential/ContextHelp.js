import React, { useEffect, useState, useRef } from 'react';
import { css } from "@emotion/react";
import classNames from 'classnames';
import { MAX_TABLET_SCREEN_WIDTH, MIN_MOBILE_WIDTH } from './FormFields';

export const ContextHelp = ({ heading, text, link, label }) => {

  const [isVisible, setisVisible] = useState(false);
  const buttonRef = useRef();

  const handleClickOutside = e => {
    if (buttonRef.current.contains(e.target)) setisVisible(!isVisible);
    else setisVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div className="spectrum-Examples">
      <div className="spectrum-Examples-item">
        <div className="spectrum-ContextualHelp">
          <button ref={buttonRef} className="spectrum-ActionButton spectrum-ActionButton--sizeXS spectrum-ContextualHelp-button"
            css={css`
              border-color: transparent !important;
              background-color:transparent;
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
              <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path d="M10.09064,12.966a.9167.9167,0,0,1-.97722,1.0076.93092.93092,0,0,1-.97769-1.0076.97756.97756,0,0,1,1.95491-.02931Q10.09085,12.95135,10.09064,12.966ZM8.97658,4a4.61617,4.61617,0,0,0-2.2591.5362c-.05924.03139-.05924.09215-.05924.15342V6.17521a.07459.07459,0,0,0,.11854.06076,3.69224,3.69224,0,0,1,1.87246-.50481c.90632,0,1.26328.38278,1.26328.93417,0,.47493-.28253.79645-.77259,1.30176C8.42665,8.70278,7.99526,9.1615,7.99526,9.8815a1.70875,1.70875,0,0,0,.357,1.05721A.244.244,0,0,0,8.54519,11h1.2929a.06531.06531,0,0,0,.05931-.10734,1.65129,1.65129,0,0,1-.23779-.843c0-.45874.54994-.96405,1.12955-1.53113a2.73714,2.73714,0,0,0,.95107-2.1129C11.74024,5.05774,10.75955,4,8.97658,4ZM17.5,9A8.5,8.5,0,1,1,9,.50005H9A8.5,8.5,0,0,1,17.5,9ZM15.6748,9A6.67481,6.67481,0,1,0,9,15.67476H9A6.67476,6.67476,0,0,0,15.6748,9Z" />
            </svg>
          </button>
          <div
            className={classNames(['spectrum-Popover spectrum-Popover--bottom-start spectrum-ContextualHelp-popover', { 'is-open': isVisible }])}
            role="presentation"
            css={css`
              width: 250px;
              padding: 15px;
              gap: 5px;
              position: absolute;
              z-index: 2;
              background: white;
              display: flex;
              flex-direction: column;
              border-radius: 3px;
              border: 1px solid #D0D0D0 !important;

              @media screen and (min-width:${MIN_MOBILE_WIDTH}) and (max-width:${MAX_TABLET_SCREEN_WIDTH}){
                      right:5px;
              }
              
            `}
          >
            {heading && <h4 className="spectrum-Heading spectrum-Heading--sizeXXS" css={css`margin:0`}>{heading}</h4>}
            {text && <p class="spectrum-Body spectrum-Body--sizeXS">{text}</p>}
            {link && <a className="spectrum-Link spectrum-ContextualHelp-link" target="_blank" rel="noreferrer" href={link}>{label}</a>}
          </div>
        </div>
      </div>
    </div>
  )
}
