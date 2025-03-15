describe('Quiz website', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: '/api/questions/random' }, { fixture: 'questions.json', statusCode: 200 }).as('getRandomQuestion');
    cy.visit('/');
  });

  it('should display a start quiz button', () => {
    cy.visit('/');
    cy.get('button').should('contain', 'Start Quiz');
  });

  it('should display a question when the quiz is started', () => {
    cy.get('button').should('contain', 'Start Quiz').click();
    cy.get('[data-cy="question"]').should('exist');
  });

  it('should display a score when the quiz is completed', () => {
    cy.get('button').should('contain', 'Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('h2').contains('Quiz Completed');
  });

  it('should restart the quiz after completion', () => {
    cy.get('button').should('contain', 'Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('button').contains('Take New Quiz').click();
    cy.get('[data-cy="question"]').should('exist');
  });
});