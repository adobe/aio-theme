/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React, { cloneElement, useEffect } from "react";
import { css } from "@emotion/react";
import { HeroButtons } from "../Hero";
import classNames from "classnames";
import { useExternalScript } from "./useExternalScript";
import PropTypes from "prop-types";

const PDFViewer = ({
  url,
  client_id,
  showDownloadPDF,
  showZoomControl,
  showAnnotationTools,
  showPrintPDF,
  showDirection = "row",
  fileName,
  heading,
  text,
  className,
  buttons,
  textColor = "#000",
  variant = "fullWidth",
  customId = "adobe-pdf",
  ...props

}) => {

  const previewConfig = {
    embedMode: "FULL_WINDOW",
    showDownloadPDF: showDownloadPDF ? true : false,
    showZoomControl: showZoomControl ? true : false,
    showAnnotationTools: showAnnotationTools ? true : false,
    showPrintPDF: showPrintPDF ? true : false
  }

  const isDirectionInRow = showDirection === "row";
  const isDirectionInColumn = showDirection === "column";

  const srcURL = "https://documentservices.adobe.com/view-sdk/viewer.js";
  const isScript = useExternalScript(srcURL);

  useEffect(() => {

    if (isScript === "ready") {
      document.addEventListener("adobe_dc_view_sdk.ready", function () {
        const adobeDCView = new window.AdobeDC.View({ clientId: client_id, divId: customId });
        adobeDCView.previewFile({
          content: { location: { url } },
          metaData: { fileName }
        }, previewConfig);
      });

    }

  }, [isScript]);

  return (
    <>
      {client_id &&
        <section
          className={classNames(className)}
          css={css`
            color: #fff;
            margin: 3% 0;
          `}
        >
          {props?.slots ?
            <div
              css={css`
                       
              @media screen and (min-width:320px) and (max-width:1024px) {
                  width:90% !important;
                  flex-direction:column !important;
              }

              @media screen and (min-width:320px) and (max-width:768px) {
                  padding:0 !important;
              }

              padding: 0 var(--spectrum-global-dimension-size-400);
              margin: auto;
              display:flex;
              flex-direction : ${isDirectionInRow ? "row" : "column-reverse"};
              width: ${variant === "fullWidth" ? "95%" : "70%"};

            `}
            >
              {url &&
                <div id={customId}
                  css={css`
                    @media screen and (min-width:320px) and (max-width:1024px) {
                        width:100% !important;
                    }

                    height: 400px;
                    width: ${isDirectionInRow ? "45%" : "100%"};
                    margin:auto;
                `}
                ></div>
              }
              <div css={css`

              @media screen and (min-width:320px) and (max-width:1024px) {
                  width:100% !important;
              }

              width: ${isDirectionInRow ? "45%" : "100%"};
              margin: auto;
              display: flex !important;
              flex-direction:column ;
              align-items: ${isDirectionInColumn && "center"};
              text-align:${isDirectionInRow ? "left" : "center"};
              padding-top: 4.1875rem;
              padding-bottom: 4.1875rem;
            `}>
                {heading && (
                  <h2
                    css={css`
                    margin-bottom: var(--spectrum-global-dimension-size-200) !important;
                    color:${textColor} !important;
                    `}
                    className="spectrum-Heading spectrum-Heading--sizeL"
                  >
                    {heading.props.children}
                  </h2>
                )}
                <div>
                  {text &&
                    cloneElement(text, {
                      className: 'spectrum-Body spectrum-Body--sizeM',
                      css: css`
                    color: ${textColor};
                  `
                    })
                  }
                </div>

                {buttons &&
                  <HeroButtons
                    buttons={buttons}
                    variants={['accent', 'secondary']}
                    css={css` margin-top: var(--spectrum-global-dimension-size-400); `}
                  />}

              </div>
            </div> :
            <div id={customId}
              css={css`
            padding: 3% 0;
            margin: auto;        
            height: 360px;
            width: ${variant === "fullWidth" ? "100%" : "80%"}
          `}></div>
          }
        </section>
      }
    </>
  )
}
PDFViewer.propTypes = {
  heading: PropTypes.element,
  text: PropTypes.element,
  buttons: PropTypes.element,
  className: PropTypes.string,
  url: PropTypes.string,
  showDownloadPDF: PropTypes.bool,
  showZoomControl: PropTypes.bool,
  showAnnotationTools: PropTypes.bool,
  showPrintPDF: PropTypes.bool,
  textColor: PropTypes.string,
  showDirection: PropTypes.string,
  fileName: PropTypes.string,
  variant: PropTypes.string,
  customId: PropTypes.string,
};

export { PDFViewer }