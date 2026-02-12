import React from "react";
import { getByRole, render } from "@testing-library/react";
import FormToDo from "./index";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("FormToDo", () => {
  it("should render the component", () => {
    const { getByRole } = render(
      <TodoContext.Provider value={{ selectedTodo: { description: "Test description" } }}>
        <FormToDo onSubmit={() => {}} />
      </TodoContext.Provider>,
    );

    expect(getByRole("form")).toBeInTheDocument();
  });

  it("should render the description in the input when selectedTodo is provided", () => {
    const { getByRole } = render(
      <TodoContext.Provider value={{ selectedTodo: { description: "Test description" } }}>
        <FormToDo onSubmit={() => {}} />
      </TodoContext.Provider>,
    );

    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("textbox")).toHaveValue("Test description");
  });
});
