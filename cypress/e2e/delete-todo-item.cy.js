describe("Delete Todo Item", () => {
  it("should delete a todo item", () => {
    cy.visit("http://192.168.0.108:5173/");

    cy.contains("New cat added", { timeout: 7000 })
      .parent()
      .find("[aria-label='delete']")
      .click();

    cy.contains("New cat added").should("not.exist");
  });
});
