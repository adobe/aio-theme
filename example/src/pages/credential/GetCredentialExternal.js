import React from 'react'
import { GetCredential } from '../../../../packages/gatsby-theme-aio/src/components/GetCredential';
import firefly from "./images/firefly.png";
import ps from "./images/ps.png";

const GetCredentialExternal = () => {
  return (

    <GetCredential className="getCredentialContainer" templateId="6643f9f3730aae07ce7fb6d6" >

      <GetCredential.SignIn title="Get credentials" paragraph="Create unique credentials that you will use to call multiple APIs from your application." buttonText="Sign in to create credentials" />

      <GetCredential.Form title="Get credentials" paragraph="Create unique credentials that you will use to call multiple APIs from your application." className="formClass">

        <GetCredential.Form.CredentialName label="Credential name" description="Credential name must be unique and between 3 and 45 characters long. A project will be automatically created with the same name in Adobe Developer Console." range="45" />

        {/* <GetCredential.Form.AllowedOrigins label="Allowed domains (up to 5)" contextHelp={true} contextHelpHeading="What are allowed domains" placeholder="Example: www.domain-1.com, www.domain-2.com, *.my-domain.com, localhost:5000" contextHelpText="To prevent a third party from using your client ID on their own website, the use of your client ID is restricted to a list of domains that you specifically authorize." contextHelpLink="https://www.adobe.com/" contextHelpLabelForLink="Learn more in our documentation" description="Use wildcards to enter multiple subdomains (*.my-domain.com) or commas to separate multiple domains (www.domain-1.com, www.domain-2.com). During local development, you can include ports greater than 1023 with localhost (e.g. localhost:3000). Standard ports (80, 443) will be used for non-localhost domains." /> */}

        <GetCredential.Form.Products label="Included products and services">
          <GetCredential.Form.Product label="Firefly - Firefly Services" icon={firefly} />
          <GetCredential.Form.Product label="Adobe Photoshop - Firefly Services" icon={ps} />
        </GetCredential.Form.Products>

        <GetCredential.Form.Downloads label="Download a personalized code sample" contextHelp={true} contextHelpHeading="Select Language">
          <GetCredential.Form.Download title="JavaScript" href="https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/8bab684/files/samples_q3_2023/PROD/dc-pdf-services-sdk-java-samples.zip" />
          <GetCredential.Form.Download title=".Net" href="/Net.zip" />
          <GetCredential.Form.Download title="Python" href="https://python.zip/" />
          <GetCredential.Form.Download title="Ruby" href="https://www.ruby.zip/" />
        </GetCredential.Form.Downloads>

        <GetCredential.Form.AdobeDeveloperConsole label='By checking this box, you agree to' linkText="Adobe Developer Terms of Use" href="https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230822.pdf" />

        <GetCredential.Form.Side>
          <div style="display : flex ; gap : 16px ; flex-direction : column;">
            <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header" >API key credential</h3>
            <p className="spectrum-Body spectrum-Body--sizeM">Submitting this form creates an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certain domains.</p>
            <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header" >Learn more</h3>
            <a className="side-documentation" style={{ color: "#0265DC" }} href='https://some_help_link'>Authentication documentation</a>
            <a className='side-documentation' style={{ color: "#0265DC" }} href='https://some_help_link'>Firefly - Firefly and Creative Cloud Automation API documentation</a>
            <a className='side-documentation' style={{ color: "#0265DC" }} href='https://some_help_link'>Adobe Photoshop API documentation</a>
          </div>
        </GetCredential.Form.Side>

      </GetCredential.Form>

      <GetCredential.UnknownError helpLink="https://some_help_link" helpLinkText="Get Help" className="unKnownError" />

      <GetCredential.Card title="Your credential is ready to use" paragraph="Check the downloads section of your browser for the ZIP file, or find it where you save downloads on your machine." nextStepsLabel="Next steps" nextStepsHref="/credentials/nextsteps" developerConsoleManage="Manage on Developer console" className="card_developer_console">

        <GetCredential.Card.Side>
          <div style="display : flex ; gap : 16px ; flex-direction : column;">
            <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header" >API key credential</h3>
            <p className="spectrum-Body spectrum-Body--sizeM">Submitting this form creates an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certain domains.</p>
            <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header" >Learn more</h3>
            <a className="side-documentation" style={{ color: "#0265DC" }} href='https://some_help_link'>Authentication documentation</a>
            <a className='side-documentation' style={{ color: "#0265DC" }} href='https://some_help_link'>Firefly - Firefly and Creative Cloud Automation API documentation</a>
            <a className='side-documentation' style={{ color: "#0265DC" }} href='https://some_help_link'>Adobe Photoshop API documentation</a>
          </div>
        </GetCredential.Card.Side>

        <GetCredential.Card.Products label="Included products and services">
          <GetCredential.Card.Product label="Firefly - Firefly Services" icon={firefly} />
          <GetCredential.Card.Product label="Photoshop - Firefly Services" icon={ps} />
        </GetCredential.Card.Products>

        <GetCredential.Card.ProjectsDropdown label="Projects" subHeading="Only your projects that contain credentials are shown" />

        <GetCredential.Card.ManageDeveloperConsole label="Manage all your projects and credentials on Adobe Developer Console" direction='/console' />

        <GetCredential.Card.AccessToken helpText="" buttonLabel="Generate and copy token" heading="Access Token" />

        <GetCredential.Card.DevConsoleLink heading="Developer Console Project" />

        <GetCredential.Card.CredentialDetails heading="Credential details">
          <GetCredential.Card.CredentialDetails.ClientId heading="ClientId" />
          <GetCredential.Card.CredentialDetails.Scopes heading="Scopes" />
          <GetCredential.Card.CredentialDetails.ClientSecret heading="Client Secret" buttonLabel="Retrieve and copy client secret" />
          {/* <GetCredential.Card.CredentialDetails.APIKey heading="API Key" /> */}
          <GetCredential.Card.CredentialDetails.OrganizationName heading="Organization" />
        </GetCredential.Card.CredentialDetails>

      </GetCredential.Card>

      <GetCredential.Return title="Previously created projects" paragraph="Select a project and access your existing credentials for Firefly - Firefly and Creative Cloud Automation." devConsoleDirection="project_overview|api_overview|credential_overview" developerConsoleManage="Manage all your projects and credentials on Adobe Developer Console" className="card_developer_console">

        <GetCredential.Return.Side>
          <GetCredential.Return.Side.Custom>
            <div style={{ display: "flex", gap: "30px", flexDirection: "column", width: "100%" }}>
              <h3 className='spectrum-Heading spectrum-Heading--sizeM'>Welcome back</h3>
              <p className="spectrum-Body spectrum-Body--sizeL">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
            </div>
          </GetCredential.Return.Side.Custom>
          <GetCredential.Return.Side.NewCredential heading="Need another credential?" buttonLabel="Create new credential" />
        </GetCredential.Return.Side>

        <GetCredential.Return.CredentialDetails heading="Credential details">
          {/* <GetCredential.Return.CredentialDetails.ClientId heading="ClientId" />
          <GetCredential.Return.CredentialDetails.Scopes heading="Scopes" />
        <GetCredential.Return.CredentialDetails.ClientSecret heading="Client Secret" buttonLabel="Retrieve and copy client secret" /> */}
          <GetCredential.Return.CredentialDetails.APIKey heading="API Key" />
          <GetCredential.Return.CredentialDetails.OrganizationName heading="Organization" />
          <GetCredential.Return.CredentialDetails.AllowedOrigins heading="Allowed Domains" />
        </GetCredential.Return.CredentialDetails>

        <GetCredential.Return.ProjectsDropdown label="Projects" subHeading="Only your projects that contain credentials are shown" />

        <GetCredential.Return.ManageDeveloperConsole label="Manage all your projects and credentials on Adobe Developer Console" direction='/console' />

        <GetCredential.Return.AccessToken helpText="" buttonLabel="Generate and copy token" heading="Access Token" />

        <GetCredential.Return.DevConsoleLink heading="Developer Console Project" />

        <GetCredential.Return.Products label="Included products and services">
          <GetCredential.Return.Product label="Firefly - Firefly Services" icon={firefly} />
          <GetCredential.Return.Product label="Adobe Photoshop - Firefly Services" icon={ps} />
        </GetCredential.Return.Products>

      </GetCredential.Return>

      <GetCredential.NoDeveloperAccessError title='Get Credentials' docsLinkText="" docsLink="" />

    </GetCredential>

  )
}

export default GetCredentialExternal;
