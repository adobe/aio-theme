import React from 'react';
import { GetCredential } from '@adobe/gatsby-theme-aio/src/components/GetCredential';
import "./Credential.css"

const GetCredentialExternal = () => {
  return (

    <GetCredential credentialType="apiKey" className="getCredentialContainer" service="CCEmbedCompanionAPI">

      <GetCredential.SignIn title="Get credentials" paragraph="Create unique credentials that you will use to call the Adobe Express Embed SDK from your application." buttonText="Sign in to create credentials" className="SignInClass" />

      <GetCredential.Form title="Get credentials" paragraph="Create unique credentials that you will use to call the Adobe Express Embed SDK from your application." className="formClass">

        <GetCredential.Form.CredentialName label="Credential name" description="Credential name must be unique and between 6 and 45 character long." range="45" />

        <GetCredential.Form.AllowedOrigins required label="Allowed domains (up to 5)" contextHelp={true} contextHelpHeading="What are allowed domains" placeholder="Example: www.domain-1.com, www.domain-2.com, *.my-domain.com, localhost:5000" contextHelpText="To prevent a third party from using your client ID on their own website, the use of your client ID is restricted to a list of domains that you specifically authorize." contextHelpLink="https://www.adobe.com/" contextHelpLabelForLink="Learn more in our documentation" description="Use wildcards to enter multiple subdomains (*.my-domains.com) or commas to separete multiple domains (www.domain-1.com,www.domain-2.com). During local development, you can include post greater than 1023 with localhost (e.g. localhost:3000). Standard ports(80,443) will be used for non-localhost domains." />

        <GetCredential.Form.Downloads label="Download a personalized code sample" contextHelp={true} contextHelpHeading="Select Language">
          <GetCredential.Form.Download title="JavaScript" href="https://Javascript.net/" />
          {/* <GetCredential.Form.Download title=".Net" href="/Net.zip" />
          <GetCredential.Form.Download title="Python" href="https://python.zip/" />
          <GetCredential.Form.Download title="Ruby" href="https://www.ruby.zip/" /> */}
        </GetCredential.Form.Downloads>

        <GetCredential.Form.Side>
          <div className='conatiner'>
            <h3 className="spectrum-Heading spectrum-Heading--sizeS header" >API key credential</h3>
            <p className="spectrum-Body spectrum-Body--sizeM">Submitting this form created an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certian domains.</p>
            <h3 className="spectrum-Heading spectrum-Heading--sizeS header" >Learn more</h3>
            <a className="documentation" href='https://some_help_link'>Authentication documentation</a>
            <a className='documentation' href='https://some_help_link'>Adobe Express Embed SDK documentation</a>
          </div>
        </GetCredential.Form.Side>

      </GetCredential.Form>

      <GetCredential.UnknownError helpLink="https://some_help_link" helpLinkText="Get Help" className="unKnownError" />

      <GetCredential.Card title="Your credential is ready to use" paragraph="Check the downloads section of your browser for the ZIP file, or find it where you save downloads on your machine." nextStepsLabel="Next steps" nextStepsHref="/credentials/nextsteps" devConsoleDirection="project_overview|api_overview|credential_overview" developerConsoleManage="Manage on Developer console" className="card_developer_console">

        <GetCredential.Side>
          <div className='conatiner'>
            <h3 className="spectrum-Heading spectrum-Heading--sizeS header" >API key credential</h3>
            <p className="spectrum-Body spectrum-Body--sizeM">An API Key credential was created. The API key credential identifies your application to Adobe servers and can help accept or reject request originating from certain domains.</p>
            <h3 className="spectrum-Heading spectrum-Heading--sizeS" >Learn more</h3>
            <a className="documentation" href='https://some_help_link'>Authentication documentation</a>
            <a className="documentation" href='https://some_help_link'>Adobe Express Embed SDK documentation</a>
          </div>
        </GetCredential.Side>

      </GetCredential.Card>

      <GetCredential.NoBetaAccessError betaProgramLink="https://some_help_link" betaProgramLinkText="Join Beta program" heading="Get Credentials" text="Join Beta program to get access to the Adobe Express Embed SDK and start creating unique credentials that you will use in your application." className="joinBetaProgram" />

    </GetCredential>

  )
}

export default GetCredentialExternal;
