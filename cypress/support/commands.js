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

Cypress.Commands.add(`checkRequestAccessEdgeCase`, () => {
    cy.get('button[data-cy="accessDetails-edgeCase-btn"]').should('be.visible').should('be.enabled').click();
    cy.wait(3000);
});

Cypress.Commands.add(`checkRequestAccess`, () => {
    cy.get('button[data-cy="request-info"]').should('be.visible').should('be.enabled').click();
    cy.wait(3000);
    cy.get('body', { timeout: 1000 }).click();
});

Cypress.Commands.add(`projectsLooping`, () => {
    cy.get('button[data-cy="projects-picker"]').should('be.visible').should('be.enabled').click();
    cy.wait(2000);
    cy.get('button[data-cy="projects-picker"]').siblings().last().find('ul').children().as('list');
    cy.get('@list').each(($element, index) => {
        cy.get('button[data-cy="projects-picker"]').siblings().last().find('ul').children().eq(index).click();
        cy.wait(2000);
        cy.checkCredential();
    });
});

Cypress.Commands.add(`checkReturnFlow`, () => {
    cy.get('[data-cy="create-new-credential"]').click();
    cy.wait(2000);
    cy.get('[data-cy="cancel-new-credential"]').click();
    cy.wait(2000);
    cy.get('[data-cy="manage-projects-console"]').click();
    cy.wait(2000);
    cy.projectsLooping();
});

Cypress.Commands.add(`checkCredential`, () => {
    cy.get('body').then(($body) => {
        if ($body.find('button[data-cy="generate-token"]').length > 0) {
            cy.get('button[data-cy="generate-token"]', { timeout: 10000 }).then(() => {
                cy.get('button[data-cy="generate-token"]').click();
                cy.wait(5000);
                cy.get('button[data-cy="copy-token"]').click();
                cy.wait(2000);
            });
        }
        if ($body.find('[data-cy="credentialName-link"]').length > 0) {
            cy.get('[data-cy="credentialName-link"]', { timeout: 10000 }).then(() => {
                cy.get('[data-cy="credentialName-link"]').click();
                cy.wait(2000);
            });
        }
        if ($body.find('[data-cy="API Key-copyIcon"]').length > 0) {
            cy.get('[data-cy="API Key-copyIcon"]', { timeout: 10000 }).then(() => {
                cy.get('[data-cy="API Key-copyIcon"]').click();
                cy.wait(2000);
            });
        }
        if ($body.find('[data-cy="Allowed domains-copyIcon"]').length > 0) {
            cy.get('[data-cy="Allowed domains-copyIcon"]', { timeout: 10000 }).then(() => {
                cy.get('[data-cy="Allowed domains-copyIcon"]').click();
                cy.wait(2000);
            });
        }
        if ($body.find('button[data-cy="ClientId-copyIcon"]').length > 0) {
            cy.get('button[data-cy="ClientId-copyIcon"]', { timeout: 10000 }).then(() => {
                cy.get('button[data-cy="ClientId-copyIcon"]').click();
                cy.wait(2000);
            });
        }
        if ($body.find('button[data-cy="retrieve-client-secret"]').length > 0) {
            cy.get('button[data-cy="retrieve-client-secret"]', { timeout: 10000 }).then(() => {
                cy.get('button[data-cy="retrieve-client-secret"]').click();
                cy.wait(5000);
                cy.get('button[data-cy="copy-client-secret"]').click();
                cy.wait(2000);
            });
        }
        if ($body.find('button[data-cy="Scopes-copyIcon"]').length > 0) {
            cy.get('button[data-cy="Scopes-copyIcon"]', { timeout: 10000 }).then(() => {
                cy.get('button[data-cy="Scopes-copyIcon"]').click();
                cy.wait(2000);
            });
        }

        cy.get('[data-cy="next-step-button"]').click();
        cy.wait(2000);
        cy.get('[data-cy="Manage-Dev-Console-link"]').click();
    })
});

Cypress.Commands.add(`addCredential`, () => {
    cy.get('[data-cy="add-credential-name"]').click().should('have.focus');
    cy.get('[data-cy="add-credential-name"]').type('TestCredential1').should('have.value', 'TestCredential1');
    cy.wait(2000);
    cy.get('body').then(($body) => {
        if ($body.find('[data-cy="add-allowed-origins"]').length > 0) {
            cy.get('[data-cy="add-allowed-origins"]', { timeout: 10000 }).then(() => {
                cy.get('[data-cy="add-allowed-origins"]').click().should('have.focus');
                cy.get('[data-cy="add-allowed-origins"]').type('localhost:9000').should('have.value', 'localhost:9000');
                cy.wait(2000);
            });
        }
    })
    cy.get('[data-cy="download-checkBox"]').check().should('be.checked');
    cy.wait(2000);
    cy.get('[data-cy="select-download-language"]').select('JavaScript');
    cy.wait(2000);
    cy.get('[data-cy="terms-condition-link"]').click();
    cy.wait(2000);
    cy.get('[data-cy="update-terms-condition"]').check().should('be.checked');
    cy.wait(2000);
    cy.get('[data-cy="create-credential-btn"]').click();
    cy.wait(20000);
    cy.get('button[data-cy="restart-download"]').click();
    cy.wait(5000);
    cy.checkCredential();
    cy.wait(2000);
    cy.get('[data-cy="Restart-new-credential"]').click();
});

Cypress.Commands.add(`checkPage`, () => {
    cy.get('body').then(($body) => {
        if ($body.find('[data-cy="credential-form"]').length > 0) {
            cy.get('[data-cy="credential-form"]', { timeout: 10000 }).then(() => {
                cy.addCredential();
            });
        }
    });

    cy.get('body').then(($body) => {
        if ($body.find('[data-cy="return-flow"]').length > 0) {
            cy.get('[data-cy="return-flow"]', { timeout: 10000 }).then(() => {
                cy.checkReturnFlow();
            });
        }
    });

    cy.get('body').then(($body) => {
        if ($body.find('[data-cy="request-access"]').length > 0) {
            cy.get('[data-cy="request-access"]', { timeout: 10000 }).then(() => {
                if ($body.find('[data-cy="accessDetails"]').length > 0) {
                    cy.get('[data-cy="accessDetails"]', { timeout: 10000 }).then(() => {
                        cy.checkRequestAccess();
                    });
                }
                else if ($body.find('[data-cy="accessDetails-edgeCase"]').length > 0) {
                    cy.get('[data-cy="accessDetails-edgeCase"]', { timeout: 10000 }).then(() => {
                        cy.checkRequestAccessEdgeCase();
                    });
                }
            });
        }
    });
});

Cypress.Commands.add(`enableOrganizationPicker`, () => {
    cy.get('button[data-cy="change-organization-btn"]').click();
    cy.wait(2000);
    cy.get('button[data-cy="organization-picker"]').should('be.visible').should('be.enabled').click();
});

Cypress.Commands.add(`selectOrganization`, (elementAlias) => {
    cy.get(elementAlias).click();
    cy.wait(2000);
    cy.get(elementAlias).then($el => {
        const nextElement = $el.next().length > 0 ? $el.next() : false;
        cy.get('button[data-cy="submit-change-organization"]').should('be.visible').should('be.enabled').click();
        cy.wait(20000);
        cy.checkPage();
        cy.wait(3000)
        if (nextElement) {
            cy.enableOrganizationPicker();
        }
    });
});

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
            cy.wait(3000);
            if ($body.text().includes('Romans entp org')) {
                cy.contains('Romans entp org', { timeout: 10000 }).should('be.visible').click();
            }
            else if ($body.text().includes('Personal Profile')) {
                cy.contains('Personal Profile', { timeout: 10000 }).should('be.visible').click();
            }
        }
    });


    // cy.get('body').then(($body) => {
    //     if ($body.text().includes('Select a profile to sign in')) {
    //         cy.wait(5000);
    //         if ($body.text().includes('Romans entp org').length > 0) {
    //             cy.text().includes('Romans entp org', { timeout: 10000 }).then(() => {
    //                 cy.contains('Romans entp org').should('be.visible').click();
    //             });
    //         }

    //         if ($body.text().includes('Personal Profile').length > 0) {
    //             cy.text().includes('Personal Profile', { timeout: 10000 }).then(() => {
    //                 cy.contains('Personal Profile').should('be.visible').click();
    //             });
    //         }
    //     }
    // });
});