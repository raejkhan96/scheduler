// import cy from "cypress"

describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    
    // Test passes
    // cy.get("li")
    //   .contains("Tuesday")
    //   .click()
    
    // Test fails, needs rgba(0,0,0,0)
    // cy.contains("li", "Tuesday")
    //   .should("have.css", "background-color", "rgb(242, 242, 242)");
    
    // Test passes
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");

    // Test passes 
    // cy.contains("li", "Tuesday")
    //   .should("have.css", "background-color", "rgba(0, 0, 0, 0)");

    // Test fails 
    // Expected to find content: 'Tuesday' within the selector: '[data-testid=day]' but never did.
    // cy.contains("[data-testid=day]", "Tuesday")
    //   .click()
    //   .should("have.class", "day-list__item--selected ")

    // cy.contains("[data-testid=day]", "Tuesday")
    //   .click()
    //   .should("have.class", "day-list__item--selected")
  });

});