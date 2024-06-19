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
    cy.enableOrganizationPicker();
    cy.wait(2000);
    cy.get('button[data-cy="organization-picker"]').siblings().last().find('ul').children().as('list');
    cy.get('@list').each(($element,index) => {
        cy.get('button[data-cy="organization-picker"]').siblings().last().find('ul').children().eq(index).as('ele');
        cy.selectOrganization('@ele');
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