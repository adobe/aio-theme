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

describe('Get Credentials Test', () => {
    it('API Key page loads', () => {
        const route = '/getCredential/';
        init(route);
        // TODO: test validation failures, error toasts, success scenarios etc.
    });

    it('OAuth s2s page loads', () => {
        const route = '/get-credential-oauth/';
        init(route);
        // TODO: test validation failures, error toasts, success scenarios etc.
    });
});