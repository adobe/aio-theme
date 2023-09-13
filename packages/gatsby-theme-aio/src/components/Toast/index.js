import React, { useEffect, useState } from 'react';
import { css } from "@emotion/react";
import { InfoMedium, SuccessMedium, AlertMedium, Close } from '@adobe/gatsby-theme-aio/src/components/Icons';
import PropTypes from 'prop-types';

const Toast = ({
  variant,
  message,
  disable
}) => {

  const [alertShow, setAlertShow] = useState(true);

  useEffect(() => {
    if (disable) {
      setTimeout(() => { setAlertShow(false) }, disable);
    }
  }, [alertShow])

  const variantMap = {
    error: { VariantIcon: AlertMedium, bgColorVarient: "rgb(211, 21, 16)" },
    success: { VariantIcon: SuccessMedium, bgColorVarient: "#007e50" },
    info: { VariantIcon: InfoMedium, bgColorVarient: "#0265dc" },
  };

  const { VariantIcon, bgColorVarient } = variantMap[variant] || { VariantIcon: null, bgColorVarient: "#6d6d6d" };

  return (
    <>
      {alertShow && message &&
        <div
          css={css`
              
            visibility: visible ;
            background-color: ${bgColorVarient};
            color: #fff; 
            text-align: center;
            border-radius: 2px;
            padding: 5px 20px;
            border-radius: 5px;
            position: fixed; 
            z-index: 1; 
            bottom: 25px;
            right: calc(50% - 5%);
            font-family: adobe-clean;
            display: inline-flex;
            line-hight: 12px;

            -webkit-animation:  fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;

            @-webkit-keyframes fadein {
              from {bottom: 0; opacity: 0;}
              to {bottom: 30px; opacity: 1;}
            }

        `}
        >
          <div css={css`display:flex;gap:15px;align-items:center;`}>
            {VariantIcon &&
              <div css={css`display:flex;`}>
                <VariantIcon />
              </div>}
            <div className="spectrum-Toast-body">
              <div className="spectrum-Toast-content"
                css={css`
                  letter-spacing: 0.5px;
                  font-weight: lighter;
                  max-width: 400px;
                  text-align: initial;
                  min-width: fit-content;

                  & > p{
                    margin : 0;
                    color:#fff;
                  }

                `}>
                {message}
              </div>
            </div>
            <div ><hr css={css`height:25px;`} /></div>
            <div
              onClick={() => setAlertShow(false)}
              css={css`
                  display:flex;
                  cursor: pointer;
                `}>
              <Close fill="white" />
            </div>
          </div>
        </div>
      }
    </>
  );
}

Toast.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
  disable: PropTypes.string,
}

export { Toast };