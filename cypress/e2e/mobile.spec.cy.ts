describe('Request Invite Mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-x'); // Set the viewport to iPhone X dimensions
    cy.visit('/');
  });

  it('should have the necessary contents', () => {
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

  it('should successfully request an invite twice', () => {
    cy.get('#request-invite-button').click();

    cy.get('input#full-name').type('John Doe');
    cy.get('input#email').type('john.doe@example.com');
    cy.get('input#confirm-email').type('john.doe@example.com');

    cy.get('#send-button').click();

    cy.contains('Invite Sent!').should('be.visible');
    cy.contains('Please check your email for the invite.').should('be.visible');
    cy.get('#success-button').should('be.visible');
    cy.get('#success-button').click();

    // 2nd request
    cy.get('#request-invite-button').click();

    cy.get('input#full-name').type('John Doe2');
    cy.get('input#email').type('john.doe2@example.com');
    cy.get('input#confirm-email').type('john.doe2@example.com');

    cy.get('#send-button').click();

    cy.contains('Invite Sent!').should('be.visible');
    cy.contains('Please check your email for the invite.').should('be.visible');
    cy.get('#success-button').should('be.visible');
  });

  it('should fail to request an invite and succeed the 2nd time', () => {
    cy.get('#request-invite-button').click();

    cy.get('input#full-name').type('John Doe');
    cy.get('input#email').type('usedemail@airwallex.com');
    cy.get('input#confirm-email').type('usedemail@airwallex.com');

    cy.get('#send-button').click();

    cy.contains('Error').should('be.visible');
    cy.contains('Bad Request: Email is already in use').should('be.visible');
    cy.get('#error-button').should('be.visible');
    cy.get('#error-button').click();

    // 2nd request
    cy.get('input#email').type('john.doe@example.com');
    cy.get('input#confirm-email').type('john.doe@example.com');

    cy.get('#send-button').click();

    cy.contains('Invite Sent!').should('be.visible');
    cy.contains('Please check your email for the invite.').should('be.visible');
    cy.get('#success-button').should('be.visible');
    cy.get('#success-button').click();
  });

  it('should show input validation', () => {
    cy.get('#request-invite-button').click();

    cy.get('input#full-name').type('Jo').blur();
    cy.contains('Name must be at least 3 characters long').should('be.visible');
    cy.get('input#full-name').type('hn Doe');

    cy.get('input#email').type('john.doe@example').blur();
    cy.contains('Email is not valid').should('be.visible');
    cy.get('input#email').type('.com');

    cy.get('input#confirm-email').type('john.doe@example').blur();
    cy.contains('Emails do not match').should('be.visible');
    cy.get('input#confirm-email').type('.com');
    cy.get('#send-button').click();

    cy.contains('Invite Sent!').should('be.visible');
    cy.contains('Please check your email for the invite.').should('be.visible');
    cy.get('#success-button').should('be.visible');
  });
});
