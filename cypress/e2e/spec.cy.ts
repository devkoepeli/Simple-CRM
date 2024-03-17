describe('My First Test', () => {
  it('Get, type and assert', () => {
    cy.visit('/signup')

    cy.contains('privacy policy').click()
    cy.url().should('include', '/signup')

    cy.get('#mat-input-0').type('Hello world')
    cy.get('#mat-input-0').should('have.value', 'Hello world')
  })
})