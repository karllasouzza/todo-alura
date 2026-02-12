import React from "react";
import { getByRole, render } from "@testing-library/react";
import { ToDoItem } from "./index";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("ToDoItem", () => {
  it("should render the component", () => {
    const item = {
      description: "Test ToDo Item",
      createdAt: new Date().toISOString(),
      completed: false,
    };

    const { getByText, getByRole } = render(
      <TodoContext.Provider value={{}}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    expect(getByText("Test ToDo Item")).toBeInTheDocument();
    expect(getByText(new Date(item.createdAt).toLocaleDateString("pt-BR"))).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeInTheDocument();
  });

  it("should call toggleItemCompleted when checkbox is clicked", () => {
    const item = {
      description: "Test ToDo Item",
      createdAt: new Date().toISOString(),
      completed: false,
    };

    const toggleItemCompleted = jest.fn();

    const { getByRole } = render(
      <TodoContext.Provider value={{ toggleItemCompleted }}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    const checkbox = getByRole("checkbox");
    checkbox.click();

    expect(checkbox).toBeChecked();
    expect(toggleItemCompleted).toHaveBeenCalledTimes(1);
    expect(toggleItemCompleted).toHaveBeenCalledWith(item);
  });

  it("should call removeTodo when delete button is clicked", () => {
    const item = {
      description: "Test ToDo Item",
      createdAt: new Date().toISOString(),
      completed: false,
    };

    const removeTodo = jest.fn();

    const { getByRole } = render(
      <TodoContext.Provider value={{ removeTodo }}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    const deleteButton = getByRole("button", { name: /delete/i });
    deleteButton.click();

    expect(removeTodo).toHaveBeenCalledTimes(1);
    expect(removeTodo).toHaveBeenCalledWith(item);
  });

  it("should call selectTodoForEdit when edit button is clicked", () => {
    const item = {
      description: "Test ToDo Item",
      createdAt: new Date().toISOString(),
      completed: false,
    };

    const selectTodoForEdit = jest.fn();

    const { getByRole } = render(
      <TodoContext.Provider value={{ selectTodoForEdit }}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    const editButton = getByRole("button", { name: /edit/i });
    editButton.click();

    expect(selectTodoForEdit).toHaveBeenCalledTimes(1);
    expect(selectTodoForEdit).toHaveBeenCalledWith(item);
  });
});
