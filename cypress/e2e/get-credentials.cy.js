const API_KEY = 'api_key';
const OAUTH_S2S = 'oauth_s2s';

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
  cy.get('button[data-cy="accessDetails-edgeCase-btn"]').should('be.visible').should('be.enabled');
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
      getIframeBody().find('button[data-testid="send-request-button"]').should('exist').click();
      getIframeBody().find('button[data-testid="close-button"]').should('exist').click();
    }
  });
  cy.get('button[data-cy="request-info"]').should('be.visible').should('be.enabled').click();
  cy.get('body', { timeout: 1000 }).click();
};

function projectsLooping(credentialType) {
  cy.get('button[data-cy="projects-picker"]').should('be.visible').should('be.enabled').click();
  cy.get('button[data-cy="projects-picker"]').siblings().last().find('ul').children().as('list');
  cy.get('@list').each(($element, index) => {
    cy.get('button[data-cy="projects-picker"]').siblings().last().find('ul').children().eq(index).click();
    checkCredential(credentialType);
  });
};

function checkReturnFlow(credentialType) {
  // verify return flow is visible
  cy.get('[data-cy="return-flow"]').should('be.visible');

  // verify clicking on create new credential button opens the form
  cy.get('[data-cy="create-new-credential"]').click();
  cy.get('[data-cy="credential-form"]').should('be.visible');

  // verify clicking on cancel button closes the form
  cy.get('[data-cy="cancel-new-credential"]').click();
  cy.get('[data-cy="return-flow"]').should('be.visible');

  // verify clicking on manage projects console button exists
  cy.get('[data-cy="manage-projects-console"]').should('exist');

  // verify all the information is visible based on credential type
  projectsLooping(credentialType);
};

function checkAPIKey() {
  // verify API key is visible
  cy.contains('API Key').should('be.visible');

  // verify API key copy button is clickable
  cy.get('[data-cy="API Key-copyIcon"]').should('be.visible');

  // verify allowed domains copy button is clickable
  cy.get('[data-cy="Allowed domains-copyIcon"]').should('be.visible');
}

function checkOAuthS2S() {
  cy.get('button[data-cy="generate-token"]').click();
  cy.get('button[data-cy="copy-token"]').should('exist');
  cy.get('[data-cy="credentialName-link"]').should('exist');
  cy.get('button[data-cy="ClientId-copyIcon"]').should('exist');
  cy.get('button[data-cy="retrieve-client-secret"]').click();
  cy.get('button[data-cy="copy-client-secret"]').should('exist');
  cy.get('button[data-cy="Scopes-copyIcon"]').should('exist');
  cy.contains('openid, AdobeID, read_organizations, firefly_api, ff_apis').should('exist');
}

function checkCredential(credentialType) {
  switch(credentialType) {
    case API_KEY:
      checkAPIKey();
      break;
    case OAUTH_S2S:
      checkOAuthS2S();
      break;
  }

  cy.get('[data-cy="next-step-button"]').should('exist');
  cy.get('[data-cy="Manage-Dev-Console-link"]').should('exist');
};

function addCredential() {
  cy.get('[data-cy="add-credential-name"]').click().should('have.focus');
  cy.get('[data-cy="add-credential-name"]').type('TestCredential100').should('have.value', 'TestCredential100');
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="add-allowed-origins"]').length > 0) {
      cy.get('[data-cy="add-allowed-origins"]', { timeout: 10000 }).then(() => {
        cy.get('[data-cy="add-allowed-origins"]').click().should('have.focus');
        cy.get('[data-cy="add-allowed-origins"]').type('localhost:9000').should('have.value', 'localhost:9000');
      });
    }
  })
  cy.get('[data-cy="download-checkBox"]').check().should('be.checked');
  cy.get('[data-cy="select-download-language"]').select('JavaScript');
  cy.get('[data-cy="terms-condition-link"]').click();
  cy.get('[data-cy="update-terms-condition"]').check().should('be.checked');
  cy.get('[data-cy="create-credential-btn"]').click();
  cy.get('button[data-cy="restart-download"]').click();
  checkCredential();
  cy.get('[data-cy="Restart-new-credential"]').click();
};

function checkPage() {
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="credential-form"]').length > 0) {
      cy.get('[data-cy="credential-form"]', { timeout: 10000 }).then(() => {
        addCredential();
      });
    }
  });

  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="return-flow"]').length > 0) {
      cy.get('[data-cy="return-flow"]', { timeout: 10000 }).then(() => {
        checkReturnFlow();
      });
    }
  });

  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="request-access"]').length > 0) {
      cy.get('[data-cy="request-access"]', { timeout: 10000 }).then(() => {
        if ($body.find('[data-cy="accessDetails"]').length > 0) {
          cy.get('[data-cy="accessDetails"]', { timeout: 10000 }).then(() => {
            checkRequestAccess();
          });
        }
        else if ($body.find('[data-cy="accessDetails-edgeCase"]').length > 0) {
          cy.get('[data-cy="accessDetails-edgeCase"]', { timeout: 10000 }).then(() => {
            checkRequestAccessEdgeCase();
          });
        }
      });
    }
  });
};
function waitForLoader() {
  cy.get('div[data-cy="loader"]').should('exist');
  cy.get('div[data-cy="loader"]').should('not.exist');

}

function selectOrganization(orgName) {
  cy.get('button[data-cy="change-organization-btn"]').should('be.visible').should('be.enabled').click();
  cy.get('button[data-cy="organization-picker"]').should('be.visible').should('be.enabled').click();
  cy.contains(orgName).should('exist').click();
  cy.get('button[data-cy="submit-change-organization"]').should('be.visible').should('be.enabled').click();
  waitForLoader();
};

describe('Get Credentials Test', () => {
  it('API Key page loads', () => {
    init('/getCredential/');
    checkReturnFlow(API_KEY);
    selectOrganization('AdobeIOTestingOrg');
    checkReturnFlow(API_KEY);
  });

  it('OAuth s2s page loads', () => {
    init('/get-credential-oauth/');
    checkRequestAccessEdgeCase();
    selectOrganization('Romans entp org');
    checkRequestAccess();
    selectOrganization('MAC New Feature Testing');
    checkReturnFlow(OAUTH_S2S);
  });
});