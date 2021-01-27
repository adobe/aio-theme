import React, {useContext} from "react";
import Context from "@adobe/gatsby-theme-aio/src/components/Context";
import {Footer} from "@adobe/gatsby-theme-aio/src/components/Footer";

export default () => {
  const { siteMetadata} = useContext(
    Context
  );
  
  const { footer: footerLinks } = siteMetadata.globalNav;
  
  return <Footer links={footerLinks}/>
};