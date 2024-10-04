const API_KEY = 'apikey';
const OAUTH_S2S = 'oauths2s';

function init(route) {
  cy.visit(route).assertRoute(route);
  cy.expect('button[data-cy="sign-in-btn"]').to.exist;
  cy.get('button[data-cy="sign-in-btn"]').should('be.visible');
  cy.get('button[data-cy="sign-in-btn"]').should('be.enabled');
  cy.get('button[data-cy="sign-in-btn"]').click();
  cy.login();
  cy.get('button[data-cy="sign-in-btn"]').should('not.exist');
  cy.assertRoute(route + '#');
}

function checkRequestAccessEdgeCase() {
  cy.get('a[data-cy="accessDetails-edgeCase-btn"]').should('be.visible');
};

function getIframeBody() {
  return cy.get('iframe[data-cy="request-access-iframe"]')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
}

function checkRequestAccess() {
  cy.get('body').then(($body) => {
    // if the request is not already sent, send the request
    if ($body.find('[data-cy="request-access-button"]').length > 0) {
      cy.get('[data-cy="request-access-button"]').click();

      getIframeBody().find('h3[data-testid="title"]').invoke('text').then((text) => {
        if (text.trim() !== 'Your request is on its way') {
          getIframeBody().find('button[data-testid="send-request-button"]').should('exist').click();
        }
      });
      getIframeBody().find('button[data-testid="close-button"]').should('exist').click();
    }
  });
};

function checkReturnFlow(credentialType) {
  // verify return flow is visible
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="return-flow"]').length) {
      cy.get('[data-cy="return-flow"]').should('be.visible');
    }
  });

  // verify clicking on create new credential button opens the form
  returnToForm();

  // verify clicking on cancel button closes the form
  cy.get('[data-cy="cancel-new-credential"]').click();
  // cy.get('[data-cy="return-flow"]').should('be.visible');
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="return-flow"]').length) {
      cy.get('[data-cy="return-flow"]').should('be.visible');
    }
  });

  // verify clicking on manage projects console button exists
  cy.get('[data-cy="manage-projects-console"]').should('exist');

  // ensure project picker is visible
  cy.get('button[data-cy="projects-picker"]').should('be.visible').should('be.enabled');

  // verify all the information is visible based on credential type
  checkCredential(credentialType);
};

function checkAPIKey() {

  // Check if the collapse open button is present and click it if it is
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="collapse-open"]').length) {
      cy.get('[data-cy="collapse-open"]').click();
    }
  });

  // verify API key is visible
  cy.contains('API Key').should('be.visible');

  // verify API key copy button is clickable
  cy.get('[data-cy="API Key-copyIcon"]').should('be.visible');

  // verify allowed domains copy button is clickable
  cy.get('[data-cy="Allowed domains-copyIcon"]').should('be.visible');

  // verify IMS Organization ID copy button is clickable
  cy.get('[data-cy="IMS Organization ID-copyIcon"]').should('exist');

}

function checkOAuthS2S() {

  // Check if the collapse open button is present and click it if it is
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="collapse-open"]').length) {
      cy.get('[data-cy="collapse-open"]').click();
    }
  });

  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="generate-token"]').length) {
      cy.get('[data-cy="generate-token"]').should('be.visible');
    }
  });
  // cy.get('button[data-cy="copy-token"]').should('exist');
  cy.get('[data-cy="credentialName-link"]').should('exist');
  cy.get('[data-cy="ClientId-copyIcon"]').should('exist');
  cy.get('[data-cy="retrieve-client-secret"]').should('be.visible');
  // cy.get('button[data-cy="copy-client-secret"]').should('exist');
  cy.get('[data-cy="Scopes-copyIcon"]').should('exist');
  cy.get('[data-cy="IMS Organization ID-copyIcon"]').should('exist');
  cy.contains('openid, AdobeID, read_organizations, firefly_api, ff_apis').should('exist');
}

function checkCredential(credentialType) {
  switch (credentialType) {
    case API_KEY:
      checkAPIKey();
      break;
    case OAUTH_S2S:
      checkOAuthS2S();
      break;
  }

  cy.get('[data-cy="next-step-button"]').should('exist');
  if (credentialType !== API_KEY) {
    cy.get('[data-cy="Manage-Dev-Console-link"]').should('exist');
  }
};

function addCredential(credentialType) {
  const credentialName = `CypressTest${credentialType}${Math.floor(Math.random() * 1000)}`;
  cy.get('[data-cy="add-credential-name"]').click().should('have.focus');
  cy.get('[data-cy="add-credential-name"]').type(credentialName).should('have.value', credentialName);
  if (credentialType === API_KEY) {
    cy.get('[data-cy="add-allowed-origins"]').click().should('have.focus');
    cy.get('[data-cy="add-allowed-origins"]').type('localhost:9000').should('have.value', 'localhost:9000');
    cy.get('[data-cy="download-checkBox"]').check().should('be.checked');
    cy.get('[data-cy="select-download-language"]').click();
    cy.get('ul p').contains('JavaScript').click();
  }
  cy.get('[data-cy="terms-condition-link"]').should('be.visible');
  cy.get('[data-cy="update-terms-condition"]').check().should('be.checked');
  cy.get('[data-cy="create-credential-btn"]').should('be.visible');
  cy.get('[data-cy="create-credential-btn"]').should('be.enabled');
  cy.get('[data-cy="create-credential-btn"]').click();
  if (credentialType === API_KEY) {
    cy.get('body').then(($body) => {
      if ($body.find('button[data-cy="restart-download"]').length) {
        cy.get('button[data-cy="restart-download"]').should('be.visible').should('be.enabled').click();
      }
    });
  }
  checkCredential(credentialType);
  cy.get('[data-cy="Restart-new-credential"]').click();
};

function waitForLoader() {
  cy.get('div[data-cy="loader"]').should('exist');
  cy.get('div[data-cy="loader"]').should('not.exist');

}

function selectOrganization(orgName) {
  cy.get('span[data-cy="change-organization-btn"]').should('be.visible').click();
  cy.get('button[data-cy="organization-picker"]').should('be.visible').should('be.enabled').click();
  cy.contains(orgName).should('exist').click();
  cy.get('button[data-cy="submit-change-organization"]').should('be.visible').should('be.enabled').click();
  waitForLoader();
};

function returnToForm() {
  cy.get('[data-cy="create-new-credential"]').should('be.visible');
  cy.get('[data-cy="create-new-credential"]').click();
  cy.get('[data-cy="credential-form"]').should('be.visible');
}

describe('Get Credentials Test', () => {
  it('API Key credential', () => {
    init('/getCredential/');
    checkReturnFlow(API_KEY);
    selectOrganization('AdobeIOTestingOrg');
    checkReturnFlow(API_KEY);
    // return to the form
    returnToForm();
    addCredential(API_KEY);
  });

  it('OAuth S2S credential', () => {
    init('/get-credential-oauth/');
    checkRequestAccessEdgeCase();
    selectOrganization('Romans entp org');
    checkRequestAccess();
    selectOrganization('MAC New Feature Testing');
    checkReturnFlow(OAUTH_S2S);
    // return to the form
    returnToForm();
    addCredential(OAUTH_S2S);
  });
});