describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the page title', () => {
    cy.get('h1').should('contain', 'Operations Videos');
  });

  it('has a search input', () => {
    cy.get('input[placeholder*="Search"]').should('exist');
  });

  it('has a category filter', () => {
    cy.get('select').should('exist');
  });

  it('displays "No videos available yet" when no videos exist', () => {
    cy.contains('No videos available yet').should('be.visible');
  });
});
