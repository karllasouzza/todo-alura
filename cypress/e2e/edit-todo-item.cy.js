describe.only("Edit Todo Item", () => {
  it.only("should edit a todo item", () => {
    cy.visit("http://192.168.0.108:5173/");

    const todoItem = cy.contains("New cat added", { timeout: 7000 });

    todoItem.should("be.visible");
    todoItem.parent().find("[aria-label='edit']").click();

    cy.get("form").should("be.visible");

    cy.get("input[name='description']").clear().type("Cat is now edited");
    cy.get("button[type='submit']").click();
    cy.contains("Cat is now edited", { timeout: 5000 }).should("be.visible");
  });
});
