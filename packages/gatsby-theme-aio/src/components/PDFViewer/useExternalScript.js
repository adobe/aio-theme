import { useEffect, useState } from "react";
export const useExternalScript = (url) => {
  let [state, setState] = useState(url ? "loading" : "idle");
  
  useEffect(() => {
    if (!url) {
      setState("idle");
      return;
     }
    const srcScript = document.querySelector(`script[src="${url}"]`);
    
    const handleScript = (e) => {
      setState(e.type === "load" ? "ready" : "error");
    };
    
    if (srcScript == null) {
      const script = document.createElement("script");
      script.src = url;
    
      script.async = true;
      document.body.appendChild(script);
      
      script.addEventListener("load", handleScript);
      script.addEventListener("error", handleScript);
    } else {
        srcScript.addEventListener("load", handleScript);
        srcScript.addEventListener("error", handleScript);
    }

   return () => {
    if( srcScript  ) {
        srcScript.removeEventListener("load", handleScript);
        srcScript.removeEventListener("error", handleScript);
    }
   };
  }, [url]);
  
  return state;
};