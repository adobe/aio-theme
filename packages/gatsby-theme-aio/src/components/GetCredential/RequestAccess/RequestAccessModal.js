import React, { useCallback, useContext, useEffect, useState } from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import { ProgressCircle } from "../../ProgressCircle";
import GetCredentialContext from "../GetCredentialContext";
import { css } from '@emotion/react';

const INITIAL_IFRAME_HEIGHT = 420;

const RequestAccessModal = ({ accessPlatformAppId, close }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(INITIAL_IFRAME_HEIGHT);
  const { setTemplate, template, selectedOrganization } = useContext(GetCredentialContext);

  useEffect(() => {
    const setTargetUrlHelper = async () => {
      const { userId } = await window.adobeIMS.getProfile();
      const acrsHostPrefix = window.adobeIMS.adobeIdData.environment === 'prod' ? '' : 'stage.';
      setTargetUrl(`https://${acrsHostPrefix}acrs.adobe.com/requestAccess?flow=frame&colorScheme=light&applicationId=UDPWeb1&appId=${accessPlatformAppId}&userId=${userId}&accessRequestType=apiAccess`);
    };
    setTargetUrlHelper();
  }, [setTargetUrl, accessPlatformAppId]);

  const handleIframeMessage = useCallback(
    (event) => {
      if (!event.isTrusted || (typeof event.data !== 'string' && !(event.data instanceof String))) {
        return;
      }
      const eventData = JSON.parse(event.data);

      if (!eventData || eventData.app !== 'acrs-request-access' || eventData.type !== 'System') {
        return;
      }

      switch (eventData.subType) {
        case 'AppLoaded':
          setLoading(false);
          break;
        case 'Resize':
          setIframeHeight(eventData.data.height);
          break;
        case 'Close':
          close(false);
          fetchTemplate();
          break;
      }
    },
    [close, setLoading, setIframeHeight],
  );

  const fetchTemplate = async () => {
    try {
      const url = `/templates/${template.id}`
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.adobeIMS.getTokenFromStorage().token}`,
          "x-api-key": window.adobeIMS.adobeIdData.client_id,
          "x-org-id": selectedOrganization.code
        }
      });

      if (!response.ok) {
        console.error('Template not found. Please check template id');
        return;
      }
      setTemplate(await response.json());
    }
    catch (error) {
      console.error('Error fetching template:', error);
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, [handleIframeMessage]);

  return (
    <div
      css={css`
        box-sizing: border-box;
        height: var(--spectrum-visual-viewport-height);
        visibility: hidden;
        pointer-events: none;
        z-index: 2;
        transition: visibility 0s linear var(--spectrum-global-animation-duration-100, .13s);
        justify-content: center;
        align-items: center;
        width: 100vw;
        display: flex;
        position: fixed;
        left: 0;
        top:50%;
        & > .changeOrg {
          border: none; 
          background: white;
          padding: 0;
          height: fit-content;
          text-decoration: underline;
          cursor: pointer;
        }
      `}>
      <div data-testid="underlay" class="spectrum-Underlay spectrum-overlay is-open spectrum-overlay--open" aria-hidden="true" style="overflow: hidden;" />
      <div className="spectrum-Modal is-open" data-testid="modal" css={css`background-color:white;z-index:2;position : absolute;`}>
        <section className="spectrum-Dialog spectrum-Dialog--medium spectrum-Dialog--confirmation" role="alertdialog" tabIndex="-1" aria-modal="true">
          <div data-testid="modal" class="spectrum-Modal spectrum-overlay is-open spectrum-overlay--open spectrum-Modal react-spectrum-Modal">
            <section role="alert" tabindex="-1" aria-labelledby="react-aria1801607717-P0-0" className="h_OVWW_spectrum-Dialog h_OVWW_spectrum-Dialog--large" style={`width: 480px; height:${iframeHeight + 40} ;`}>
              {targetUrl ? (
                <>
                  <iframe
                    style={{
                      marginTop: '20px',
                      overflow: 'hidden',
                      width: '480px',
                      height: iframeHeight,
                      border: 'none',
                      display: loading ? 'none' : 'block',
                    }}
                    title="Request Access Dialog"
                    src={targetUrl}
                    data-cy="request-access-iframe"
                  />
                  {loading && <div style={{ width: "480px", height: "480px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
                  </div>}
                </>
              ) : (
                'Loading...'
              )}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export { RequestAccessModal };
