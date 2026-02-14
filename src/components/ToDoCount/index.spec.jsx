import React from "react";
import { render } from "@testing-library/react";
import { ToDoCount } from "./index";
import { getTodos } from "../../services/TodoService";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/TodoService");

describe("ToDoCount", () => {
  describe("ToDoCount component", () => {
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

  describe("ToDoRefreshButton", () => {
    it("should render correctly", () => {
      const { container } = render(<ToDoCount />);

      expect(container.querySelector(".todo-refresh-button")).toBeInTheDocument();
      expect(container.querySelector(".todo-refresh-button")).toHaveAttribute("disabled");
    });

    it("should call onClick when button is clicked", async () => {
      getTodos.mockResolvedValue([
        { id: 1, description: "Test 1" },
        { id: 2, description: "Test 2" },
      ]);

      const { getByRole, findByText } = render(<ToDoCount />);

      expect(getByRole("button", { name: /refresh/i })).toBeDisabled();

      const initialCount = await findByText("2");
      expect(initialCount).toBeInTheDocument();

      // Button is enabled after the initial load
      expect(getByRole("button", { name: /refresh/i })).toBeEnabled();

      getTodos.mockClear();
      getTodos.mockResolvedValue([
        { id: 1, description: "Test 1" },
        { id: 2, description: "Test 2" },
        { id: 3, description: "Test 3" },
      ]);

      // Click the refresh button
      const button = getByRole("button", { name: /refresh/i });
      await userEvent.click(button);

      expect(getTodos).toHaveBeenCalledTimes(1);

      // await for the count to update after clicking the refresh button
      const updatedCount = await findByText("3");
      expect(updatedCount).toBeInTheDocument();
    });
  });
});
