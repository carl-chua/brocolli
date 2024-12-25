describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should necessary contents', () => {
    cy.contains('A better way to enjoy every day.').should('be.visible');
    cy.contains('Be the first to know when we launch.').should('be.visible');
    cy.contains('Request an Invite').should('be.visible');
    cy.get('nav').should('exist');
  });

  it('should have request invite contents', () => {
    cy.get('#request-invite-button').click();
    cy.contains('Full Name').should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('Confirm Email').should('be.visible');
    cy.get('#send-button').should('be.visible');
  });

  it('should successfully request an invite', () => {
    cy.get('#request-invite-button').click();

    cy.get('input#full-name').type('John Doe');
    cy.get('input#email').type('john.doe@example.com');
    cy.get('input#confirm-email').type('john.doe@example.com');

    cy.get('#send-button').click();

    // Add assertions to verify the expected behavior after submission
    cy.contains('Invite Sent!').should('be.visible');
    cy.contains('Please check your email for the invite.').should('be.visible');
    cy.get('#success-button').should('be.visible');
  });

  it('should fail to request an invite', () => {
    cy.get('#request-invite-button').click();

    cy.get('input#full-name').type('John Doe');
    cy.get('input#email').type('usedemail@airwallex.com');
    cy.get('input#confirm-email').type('usedemail@airwallex.com');

    cy.get('#send-button').click();

    // Add assertions to verify the expected behavior after submission
    cy.contains('Error').should('be.visible');
    cy.contains('Bad Request: Email is already in use').should('be.visible');
    cy.get('#error-button').should('be.visible');
  });
});
