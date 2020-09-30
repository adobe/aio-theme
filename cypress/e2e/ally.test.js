describe('Check theme for a11Y', () => {
  const checkA11y = (route) => {
    cy.visit(route).assertRoute(route);
    cy.wait(1500);
    cy.injectAxe();
    cy.checkA11y();
  };

  it('Docs Overview a11y violations', () => {
    checkA11y('/');
  });

  it('Docs Guides a11y violations', () => {
    checkA11y('/guides/');
  });

  it('JS Docs a11y violations', () => {
    checkA11y('/jsdoc/');
  });

  it('OpenAPI Docs a11y violations', () => {
    checkA11y('/api/');
  });

  it('Platform a11y violations', () => {
    checkA11y('/creative_cloud/');
  });

  it('Product a11y violations', () => {
    checkA11y('/project_firefly/');
  });
});
