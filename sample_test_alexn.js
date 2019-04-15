var users = ['julia cunningham','lloyd gonzalez', 'emma stewart', 'danielle moore', 'linda ruiz' ];
var citys = ['sheffield', 'hereford', 'worcester', 'cardiff', 'liverpool'];
var index = 0

describe('General Start Web Page Test', function() {
  it('Visits the Test Application to check if it responding', function() {
    cy.visit('http://localhost:3000/')
  })
  /*checking that all elements of start page exist*/
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
    for (index = 0; index < users.length; ++index) {
    cy.contains(users[index])
    cy.contains(citys[index])
    }
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
    /*entering julia in the name field*/
    cy.get('#name').type("julia");
    cy.get('[type="submit"]').click();
    /*checking that only user julia is displayed*/
    cy.contains(users[0]);
    cy.contains(citys[0]);
    for (index = 1; index < users.length; ++index) {
    cy.contains(users[index]).should('not.exist');
    cy.contains(citys[index]).should('not.exist');
    }
  })

  it('Checks filter clear button', function() {
    /*cliking clear button*/
    cy.get('#filters > [type="button"]').click();
    /*checking that all user are displayed now*/
    for (index = 0; index < users.length; ++index) {
    cy.contains(users[index]);
    cy.contains(citys[index]);
    }
  })

  it('Checks user filtering by the City "liverpool"', function() {
    /*entering liverpool in the city field*/
    cy.get('#name').clear();
    cy.get('#city').type("liverpool");
    cy.get('[type="submit"]').click();
    /*checking that only user from liverpool displayed*/
    for (index = 0; index < (users.length - 1); ++index) {
    cy.contains(users[index]).should('not.exist');
    cy.contains(citys[index]).should('not.exist');
    }
    cy.contains(users[4]);
    cy.contains(citys[4]);
  })

  it('Checks user filtering by the Name "emma" and City "worcester"', function() {
    /*entering worcester in the city field and emma in the name field*/
    cy.get('#name').clear();
    cy.get('#name').type("emma");
    cy.get('#city').clear();
    cy.get('#city').type("worcester");
    cy.get('[type="submit"]').click();
    /*checking that only user emma from worcester is displayed*/
    for (index = 0; index < users.length; ++index) {
    if (index == 2) { 
        cy.contains(users[index]);
        cy.contains(citys[index]);
        }
    else{
        cy.contains(users[index]).should('not.exist');
        cy.contains(citys[index]).should('not.exist');
        }
    }
  })

  it('Checks user filtering when the Name and City are empty', function() {
    /*clearing the city and name field and clicking submit*/
    cy.get('#name').clear();
    cy.get('#city').clear();
    cy.get('[type="submit"]').click();
    /*checking that all users are displayed now*/
    for (index = 0; index < users.length; ++index) {
    cy.contains(users[index]);
    cy.contains(citys[index]);
    }
  })

  it('Checks user filtering when the Name and City contains not existing user data', function() {
    /*entering some junk data into the city and name fields and clicking submit*/
    cy.get('#name').clear();
    cy.get('#name').type("joe!@#$%^&*()-+");
    cy.get('#city').clear();
    cy.get('#city').type("coldtown!@#$%^&*()-+");
    cy.get('[type="submit"]').click();
    /*checking that no users are displayed now*/
    for (index = 0; index < users.length; ++index) {
    cy.contains(users[index]).should('not.exist');
    cy.contains(citys[index]).should('not.exist');
    }
  })
})

describe('Moving User through Appl./Interv./Hired stages', function() {
  it('Visits the Test Application', function() {
    cy.visit('http://localhost:3000/')
  })

  it('Moves User "lloyd" from Applied to Interviewing stage', function() {
    /*clicking right arrow in the user box*/
    cy.get(':nth-child(2) > .CrewMember-toolbar > .CrewMember-up').click();
    /*checking that user now in Interviewing area*/
    cy.get('.App-container > :nth-child(1)').contains(users[1]).should('not.exist');
    cy.get('.App-container > :nth-child(2)').contains(users[1]).should('exist');
    cy.get('.App-container > :nth-child(3)').contains(users[1]).should('not.exist');
  })

  it('Moves User "lloyd" from Interviewing to Hired stage', function() {
    /*clicking right arrow in the user box*/
    cy.get(':nth-child(2) > :nth-child(1) > .CrewMember-container > .CrewMember-toolbar > .CrewMember-up').click();
    /*checking that user now in Hired area*/
    cy.get('.App-container > :nth-child(2)').contains(users[1]).should('not.exist');
    cy.get('.App-container > :nth-child(2)').contains(users[1]).should('not.exist');
    cy.get('.App-container > :nth-child(3)').contains(users[1]).should('exist');
  })

  it('Moves User "julia" from Hired to Interviewing stage', function() {
    /*clicking left arrow in the user box*/
    cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2) > .CrewMember-toolbar > button').click();
    /*checking that user now in Interviewing area*/
    cy.get('.App-container > :nth-child(1)').contains(users[0]).should('not.exist');
    cy.get('.App-container > :nth-child(2)').contains(users[0]).should('exist');
    cy.get('.App-container > :nth-child(3)').contains(users[0]).should('not.exist');
  })

  it('Moves User "julia" from Interviewing  to Applied stage', function() {
    /*clicking left arrow in the user box*/
    cy.get(':nth-child(2) > :nth-child(1) > .CrewMember-container > .CrewMember-toolbar > :nth-child(1)').click();
    /*checking that user now in Interviewing area*/
    cy.get('.App-container > :nth-child(1)').contains(users[0]).should('exist');
    cy.get('.App-container > :nth-child(2)').contains(users[0]).should('not.exist');
    cy.get('.App-container > :nth-child(3)').contains(users[0]).should('not.exist');
  })
})