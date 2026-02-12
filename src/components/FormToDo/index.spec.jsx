import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  it("should call onSubmit when the form is submitted", async () => {
    const handleSubmit = jest.fn();
    const { getByRole } = render(
      <TodoContext.Provider value={{ selectedTodo: { description: "Test description" } }}>
        <FormToDo onSubmit={handleSubmit} />
      </TodoContext.Provider>,
    );

    const input = getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "New description");
    const button = getByRole("button", { name: /Salvar item/i });
    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
