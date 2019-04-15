describe('General Start Web Page Test', function() {
  it('Visits the Test Application to check if it responding', function() {
    cy.visit('http://localhost:3000/')
  })
  it('finds the content "Applied"', function() {
    cy.contains('Applied')
  })
  it('finds the content "Interviewing"', function() {
    cy.contains('Interviewing')
  })
  it('finds the content "Hired"', function() {
    cy.contains('Hired')
  })
  it('finds the content "City"', function() {
    cy.contains('City')
  })
  it('finds the content "Name"', function() {
    cy.contains('Name')
  })
  it('finds the content "Submit"', function() {
    cy.contains('Submit')
  })
  it('finds the content "Clear"', function() {
    cy.contains('Clear')
  })
  it('checks that all crew members are present', function() {
    cy.contains('julia cunningham')
    cy.contains('sheffield')
    cy.contains('lloyd gonzalez')
    cy.contains('hereford')
    cy.contains('emma stewart')
    cy.contains('worcester')
    cy.contains('danielle moore')
    cy.contains('cardiff')
    cy.contains('linda ruiz')
    cy.contains('liverpool')
  })
  it('Checks input to the Name field', function() {
    cy.get('#name').type("julia").should("have.value", "julia")
  })
  it('Checks input to the City field', function() {
    cy.get('#city').type("liverpool").should("have.value", "liverpool")
  })
})

describe('Filtering Web Page Test', function() {
  it('Visits the Test Application', function() {
    cy.visit('http://localhost:3000/')
  })
  it('Checks user filtering by the Name "julia"', function() {
    cy.get('#name').type("julia");
    cy.get('[type="submit"]').click();

    cy.contains('julia cunningham');
    cy.contains('sheffield');
    cy.contains('lloyd gonzalez').should('not.exist');
    cy.contains('hereford').should('not.exist');
    cy.contains('emma stewart').should('not.exist');
    cy.contains('worcester').should('not.exist');
    cy.contains('danielle moore').should('not.exist');
    cy.contains('cardiff').should('not.exist');
    cy.contains('linda ruiz').should('not.exist');
    cy.contains('liverpool').should('not.exist');
  })
  it('Checks filter clear button', function() {
    cy.get('#filters > [type="button"]').click();

    cy.contains('julia cunningham');
    cy.contains('sheffield');
    cy.contains('lloyd gonzalez');
    cy.contains('hereford');
    cy.contains('emma stewart');
    cy.contains('worcester');
    cy.contains('danielle moore');
    cy.contains('cardiff');
    cy.contains('linda ruiz');
    cy.contains('liverpool');
  })
  it('Checks user filtering by the City "liverpool"', function() {
    cy.get('#name').clear();
    cy.get('#city').type("liverpool");
    cy.get('[type="submit"]').click();

    cy.contains('julia cunningham').should('not.exist');
    cy.contains('sheffield').should('not.exist');
    cy.contains('lloyd gonzalez').should('not.exist');
    cy.contains('hereford').should('not.exist');
    cy.contains('emma stewart').should('not.exist');
    cy.contains('worcester').should('not.exist');
    cy.contains('danielle moore').should('not.exist');
    cy.contains('cardiff').should('not.exist');
    cy.contains('linda ruiz');
    cy.contains('liverpool');
  })
  it('Checks user filtering by the Name "emma" and City "worcester"', function() {
    cy.get('#name').clear();
    cy.get('#name').type("emma");
    cy.get('#city').clear();
    cy.get('#city').type("worcester");
    cy.get('[type="submit"]').click();

    cy.contains('julia cunningham').should('not.exist');
    cy.contains('sheffield').should('not.exist');
    cy.contains('lloyd gonzalez').should('not.exist');
    cy.contains('hereford').should('not.exist');
    cy.contains('emma stewart');
    cy.contains('worcester');
    cy.contains('danielle moore').should('not.exist');
    cy.contains('cardiff').should('not.exist');
    cy.contains('linda ruiz').should('not.exist');
    cy.contains('liverpool').should('not.exist');
  })
  it('Checks user filtering when the Name and City are empty', function() {
    cy.get('#name').clear();
    cy.get('#city').clear();
    cy.get('[type="submit"]').click();

    cy.contains('julia cunningham');
    cy.contains('sheffield');
    cy.contains('lloyd gonzalez');
    cy.contains('hereford');
    cy.contains('emma stewart');
    cy.contains('worcester');
    cy.contains('danielle moore');
    cy.contains('cardiff');
    cy.contains('linda ruiz');
    cy.contains('liverpool');
  })
  it('Checks user filtering when the Name and City contains not existing user data', function() {
    cy.get('#name').clear();
    cy.get('#name').type("joe!@#$%^&*()-+");
    cy.get('#city').clear();
    cy.get('#city').type("coldtown!@#$%^&*()-+");
    cy.get('[type="submit"]').click();

    cy.contains('julia cunningham').should('not.exist');
    cy.contains('sheffield').should('not.exist');
    cy.contains('lloyd gonzalez').should('not.exist');
    cy.contains('hereford').should('not.exist');
    cy.contains('emma stewart').should('not.exist');
    cy.contains('worcester').should('not.exist');
    cy.contains('danielle moore').should('not.exist');
    cy.contains('cardiff').should('not.exist');
    cy.contains('linda ruiz').should('not.exist');
    cy.contains('liverpool').should('not.exist');
  })

})

describe('Moving User through Appl./Interv./Hired stages', function() {
  it('Visits the Test Application', function() {
    cy.visit('http://localhost:3000/')
  })
  it('Moves User "lloyd" from Applied to Interviewing stage', function() {
    cy.get(':nth-child(2) > .CrewMember-toolbar > .CrewMember-up').click();
    cy.get('.App-container > :nth-child(1)').contains('lloyd gonzalez').should('not.exist');
    cy.get('.App-container > :nth-child(2)').contains('lloyd gonzalez').should('exist');
    cy.get('.App-container > :nth-child(3)').contains('lloyd gonzalez').should('not.exist');
  })
  it('Moves User "lloyd" from Interviewing to Hired stage', function() {
  cy.get(':nth-child(2) > :nth-child(1) > .CrewMember-container > .CrewMember-toolbar > .CrewMember-up').click();
  cy.get('.App-container > :nth-child(2)').contains('lloyd gonzalez').should('not.exist');
  cy.get('.App-container > :nth-child(2)').contains('lloyd gonzalez').should('not.exist');
  cy.get('.App-container > :nth-child(3)').contains('lloyd gonzalez').should('exist');
  })
  it('Moves User "julia" from Hired to Interviewing stage', function() {
  cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2) > .CrewMember-toolbar > button').click();
  cy.get('.App-container > :nth-child(1)').contains('julia cunningham').should('not.exist');
  cy.get('.App-container > :nth-child(2)').contains('julia cunningham').should('exist');
  cy.get('.App-container > :nth-child(3)').contains('julia cunningham').should('not.exist');
  })
  it('Moves User "julia" from Interviewing  to Applies stage', function() {
  cy.get(':nth-child(2) > :nth-child(1) > .CrewMember-container > .CrewMember-toolbar > :nth-child(1)').click();
  cy.get('.App-container > :nth-child(1)').contains('julia cunningham').should('exist');
  cy.get('.App-container > :nth-child(2)').contains('julia cunningham').should('not.exist');
  cy.get('.App-container > :nth-child(3)').contains('julia cunningham').should('not.exist');
  })
  
})