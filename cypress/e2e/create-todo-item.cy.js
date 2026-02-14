describe.only("should create and ToDo", () => {
  it("should create a new ToDo item", () => {
    cy.visit("http://192.168.0.108:5173/");

    cy.get("button.fab").click();

    cy.get("input[name='description']").type("New cat added");
    cy.get("button[type='submit']").click();
    cy.contains("New cat added", { timeout: 5000 }).should("be.visible");
  });
});
