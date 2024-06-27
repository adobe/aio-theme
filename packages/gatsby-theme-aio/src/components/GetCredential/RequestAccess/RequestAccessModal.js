import React, { useCallback, useEffect, useState } from "react";
import "@spectrum-css/contextualhelp/dist/index-vars.css";
import {
  Dialog,
  ProgressCircle,
} from "@adobe/react-spectrum";

const INITIAL_IFRAME_HEIGHT = 420;

const RequestAccessModal = ({accessPlatformAppId, close}) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [iframeHeight, setIframeHeight] =  useState(INITIAL_IFRAME_HEIGHT);

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
                close();
                break;
        }
    },
    [close, setLoading, setIframeHeight],
  );

  useEffect(() => {
    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, [handleIframeMessage]);

  return (
    <>
      <Dialog width={480}
        height={iframeHeight + 40}
        role="alert"
        className="request-access-dialog"
        variant="confirmation">
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
      </Dialog>
    </>
  );
};

export { RequestAccessModal };
