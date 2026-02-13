import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormToDo from "./index";
import { TodoContext } from "../TodoProvider/TodoContext";
import customRender from "../../helpers/customRender";

describe("FormToDo", () => {
  it("should render the component", () => {
    const { getByRole } = customRender(<FormToDo onSubmit={() => {}} />, {
      selectedTodo: { description: "Test description" },
    });

    expect(getByRole("form")).toBeInTheDocument();
  });

  it("should render the description in the input when selectedTodo is provided", () => {
    const { getByRole } = customRender(<FormToDo onSubmit={() => {}} />, {
      selectedTodo: { description: "Test description" },
    });

    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("textbox")).toHaveValue("Test description");
  });

  it("should call onSubmit when the form is submitted", async () => {
    const handleSubmit = jest.fn();

    const { getByRole } = customRender(<FormToDo onSubmit={handleSubmit} />, {
      selectedTodo: { description: "Test description" },
    });

    const input = getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "New description");
    const button = getByRole("button", { name: /Salvar item/i });
    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
