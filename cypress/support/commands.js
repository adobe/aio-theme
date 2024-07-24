// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const baseUrl = Cypress.config('baseUrl');

Cypress.Commands.add(`assertRoute`, (route) => {
    cy.url().should(`equal`, `${window.location.origin}${route}`);
});

Cypress.Commands.add('login', () => {
    // wait for page to settle
    cy.wait(5000);

    cy.get('body').then(($body) => {
        if ($body.find("[data-id='EmailPage-EmailField']").length) {
            cy.setCredentials();
        }
    });
});

/**
 * @description set credentials on the login page code taken from
 * https://git.corp.adobe.com/pixel/cypress-acrites/blob/c398947b29f8315c611ae0438afe5f4e3e2b1d88/plugins/e2e-core-commands/src/commands/login.js#L52
 * @method setCredentials
 * @param {String} login login email used to login
 * @param {String} password password used to login
 */
Cypress.Commands.add('setCredentials', () => {
    const login = Cypress.config().userEmail;
    const password = Cypress.config().userPassword;
    // set login value
    cy.get("[data-id='EmailPage-EmailField']").should('be.visible').should('be.enabled').type(login);

    // click to continue
    cy.get("[data-id='EmailPage-ContinueButton']").should('be.visible').should('be.enabled').click();

    // wait to pass the login step
    cy.get('.EmailPage').should('not.exist');

    // case `Select an account` page
    cy.get('body').then(($body) => {
        if ($body.find('.IdentitiesPage').length) {
            // we have the UI to select type of account
            cy.get('.IdentitiesPage').should('be.visible');

            // click to select personal account
            cy.get("[data-id='AccountChooser-AccountList-individual']").click();
        }
    });

    // set password value
    cy.get("[data-id='PasswordPage-PasswordField']").should('be.visible').should('be.enabled').type(password);

    // click to continue
    cy.get("[data-id='PasswordPage-ContinueButton']").should('be.visible').should('be.enabled').click();

    // wait to pass the password step
    cy.get('.PasswordPage').should('not.exist');

    // case `Introducing profile selection` page
    cy.get('body').then(($body) => {
        if ($body.find('[data-id="PP-T2E-ProfilesSetup-Introduction"]').length) {
            cy.get('[data-id="PP-T2E-ProfilesSetup-Introduction-ContinueButton"]').should('be.visible').click();
        }
    });

    // case `Entreprise configuration` page
    cy.get('body').then(($body) => {
        if ($body.find('[data-id="PP-T2E-ProfilesSetup-Complete"]').length) {
            cy.get('[data-id="PP-T2E-ProfilesSetup-Complete-ContinueButton"]').should('be.visible').click();
        }
    });

    // case `Want to signin without your password` page
    cy.get('body').then(($body) => {
        if ($body.find('[data-id="PasswordlessOptInPP-Page"]').length) {
            cy.get('[data-id="PasswordlessOptInPP-continue-button"]').should('be.visible').click();
        }
    });

    // case `Get updates about Adobe products and services` page
    cy.get('body').then(($body) => {
        if ($body.find('[data-id="MarketingConsent"]').length) {
            cy.get('[data-id="PP-RecordMarketingConsent-ContinueBtn"]').should('be.visible').click();
        }
    });

    // case `Add a backup email address` page
    cy.get('body').then(($body) => {
        if ($body.find('[data-id="PP-AddSecondaryEmail-Page"]').length) {
            cy.contains('Not now').should('be.visible').click();
        }
    });

    // case `Add a mobile phone number` page
    cy.get('body').then(($body) => {
        if ($body.text().includes('Add a mobile phone number')) {
            cy.contains('Not now').should('be.visible').click();
        }
    });

    cy.get('body').then(($body) => {
        if ($body.text().includes('Select a profile to sign in')) {
            cy.contains('Personal Profile').should('be.visible').click();
        }
    });

    cy.intercept('POST', 'https://adobeid-na1-stg1.services.adobe.com/ims/check/v6/token*', (req) => {
        console.log('intercepted ims token exchange request');
        req.headers['Origin'] = new URL(baseUrl).origin;
    }).as('imsTokenExchange');
});
