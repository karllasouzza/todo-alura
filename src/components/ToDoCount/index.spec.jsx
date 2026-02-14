import React from "react";
import { render } from "@testing-library/react";
import { ToDoCount } from "./index";
import { getTodos } from "../../services/TodoService";

jest.mock("../../services/TodoService");

describe("ToDoCount", () => {
  it("should render the component correctly", async () => {
    getTodos.mockResolvedValue([]);

    const { findByText } = render(<ToDoCount />);

    const count = await findByText("0");

    expect(count).toBeInTheDocument();
  });

  it.each([
    { todos: [{ id: 1, description: "Test 1" }], expected: "1" },
    {
      todos: [
        { id: 1, description: "Test 1" },
        { id: 2, description: "Test 2" },
      ],
      expected: "2",
    },
    { todos: [], expected: "0" },
  ])("should display the correct count of todos", async ({ todos, expected }) => {
    getTodos.mockResolvedValue(todos);

    const { findByText } = render(<ToDoCount />);

    const count = await findByText(expected);
    expect(count).toBeInTheDocument();
  });
});
