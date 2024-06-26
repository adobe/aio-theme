function init(route) {
  cy.visit(route).assertRoute(route);
  cy.expect('button[data-cy="sign-in-btn"]').to.exist;
  cy.get('button[data-cy="sign-in-btn"]').should('be.visible');
  cy.get('button[data-cy="sign-in-btn"]').should('be.enabled');
  cy.get('button[data-cy="sign-in-btn"]').click();
  cy.login();
  cy.get('button[data-cy="sign-in-btn"]').should('not.exist');
  cy.assertRoute(route + '#');
  cy.wait(5000);
  enableOrganizationPicker();
  cy.get('button[data-cy="organization-picker"]').siblings().last().find('ul').children().as('list');
  cy.get('@list').each(($element, index) => {
    cy.get('button[data-cy="organization-picker"]').siblings().last().find('ul').children().eq(index).as('ele');
    selectOrganization('@ele');
  });
}

describe('Get Credentials Test', () => {
  it('API Key page loads', () => {
    const route = '/getCredential/';
    init(route);
    // TODO: test validation failures, error toasts, success scenarios, error edge cases, org switching etc.
  });

  it('OAuth s2s page loads', () => {
    const route = '/get-credential-oauth/';
    init(route);
    // TODO: test validation failures, error toasts, success scenarios, error edge cases, org switching etc.
  });
});

function checkRequestAccessEdgeCase() {
  cy.get('button[data-cy="accessDetails-edgeCase-btn"]').should('be.visible').should('be.enabled').click();
};

function checkRequestAccess() {
  cy.get('button[data-cy="request-info"]').should('be.visible').should('be.enabled').click();
  cy.get('body', { timeout: 1000 }).click();
};

function projectsLooping() {
  cy.get('button[data-cy="projects-picker"]').should('be.visible').should('be.enabled').click();
  cy.get('button[data-cy="projects-picker"]').siblings().last().find('ul').children().as('list');
  cy.get('@list').each(($element, index) => {
    cy.get('button[data-cy="projects-picker"]').siblings().last().find('ul').children().eq(index).click();
    checkCredential();
  });
};

function checkReturnFlow() {
  cy.get('[data-cy="create-new-credential"]').click();
  cy.get('[data-cy="cancel-new-credential"]').click();
  cy.get('[data-cy="manage-projects-console"]').click();
  projectsLooping();
};

function checkCredential() {
  cy.get('body').then(($body) => {
    if ($body.find('button[data-cy="generate-token"]').length > 0) {
      cy.get('button[data-cy="generate-token"]', { timeout: 10000 }).then(() => {
        cy.get('button[data-cy="generate-token"]').click();
        cy.wait(5000);
        cy.get('button[data-cy="copy-token"]').click();
      });
    }
    if ($body.find('[data-cy="credentialName-link"]').length > 0) {
      cy.get('[data-cy="credentialName-link"]', { timeout: 10000 }).then(() => {
        cy.get('[data-cy="credentialName-link"]').click();
      });
    }
    if ($body.find('[data-cy="API Key-copyIcon"]').length > 0) {
      cy.get('[data-cy="API Key-copyIcon"]', { timeout: 10000 }).then(() => {
        cy.wait(3000)
        cy.get('[data-cy="API Key-copyIcon"]').click();
      });
    }
    if ($body.find('[data-cy="Allowed domains-copyIcon"]').length > 0) {
      cy.get('[data-cy="Allowed domains-copyIcon"]', { timeout: 10000 }).then(() => {
        cy.get('[data-cy="Allowed domains-copyIcon"]').click();
      });
    }
    if ($body.find('button[data-cy="ClientId-copyIcon"]').length > 0) {
      cy.get('button[data-cy="ClientId-copyIcon"]', { timeout: 10000 }).then(() => {
        cy.wait(3000)
        cy.get('button[data-cy="ClientId-copyIcon"]').click();
      });
    }
    if ($body.find('button[data-cy="retrieve-client-secret"]').length > 0) {
      cy.get('button[data-cy="retrieve-client-secret"]', { timeout: 10000 }).then(() => {
        cy.get('button[data-cy="retrieve-client-secret"]').click();
        cy.wait(5000);
        cy.get('button[data-cy="copy-client-secret"]').click();
      });
    }
    if ($body.find('button[data-cy="Scopes-copyIcon"]').length > 0) {
      cy.get('button[data-cy="Scopes-copyIcon"]', { timeout: 10000 }).then(() => {
        cy.get('button[data-cy="Scopes-copyIcon"]').click();
      });
    }

    cy.get('[data-cy="next-step-button"]').click();
    cy.get('[data-cy="Manage-Dev-Console-link"]').click();
  })
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

function enableOrganizationPicker() {
  cy.get('button[data-cy="change-organization-btn"]').click();
  cy.get('button[data-cy="organization-picker"]').should('be.visible').should('be.enabled').click();
};

function selectOrganization(elementAlias) {
  cy.get(elementAlias).click();
  cy.get(elementAlias).then($el => {
    const nextElement = $el.next().length > 0 ? $el.next() : false;
    cy.get('button[data-cy="submit-change-organization"]').should('be.visible').should('be.enabled').click();
    cy.wait(5000);
    checkPage();
    if (nextElement) {
      enableOrganizationPicker();
    }
  });
};
