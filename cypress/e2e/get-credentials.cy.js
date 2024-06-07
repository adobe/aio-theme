describe('Get Credentials Test', () => {
    it('API Key page loads', () => {
        const route = '/getCredential/';
        cy.visit(route).assertRoute(route);
    });

    it('OAuth s2s page loads', () => {
        const route = '/get-credential-oauth/';
        cy.visit(route).assertRoute(route);
    });
});