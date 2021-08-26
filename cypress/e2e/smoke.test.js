describe('Smoke Test', () => {
  it('Docs Overview loads', () => {
    cy.visit(`/`).assertRoute(`/`);
    cy.contains('Developer');
  });

  it('Docs Guides loads', () => {
    cy.visit(`/guides/`).assertRoute(`/guides/`);
    cy.contains('Developer');
  });

  it('JS Docs loads', () => {
    cy.visit(`/jsdoc/`).assertRoute(`/jsdoc/`);
    cy.contains('Developer');
  });

  it('OpenAPI Docs loads', () => {
    cy.visit(`/api/`).assertRoute(`/api/`);
    cy.contains('Developer');
  });

  it('Platform loads', () => {
    cy.visit(`/creative_cloud/`).assertRoute(`/creative_cloud/`);
    cy.contains('Developer');
  });

  it('Product loads', () => {
    cy.visit(`/project_firefly/`).assertRoute(`/project_firefly/`);
    cy.contains('Developer');
  });

  it('Cloud Filter loads', () => {
    cy.visit(`/cloud_filter/`).assertRoute(`/cloud_filter/`);
    cy.contains('Developer');
  });

  it('No layout loads', () => {
    cy.visit(`/no_layout/`).assertRoute(`/no_layout/`);
    cy.contains('Developer');
  });

  it('Frame loads', () => {
    cy.visit(`/frame/`).assertRoute(`/frame/`);
    cy.contains('Developer');
  });
});
