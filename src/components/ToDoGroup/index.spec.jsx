import React from "react";
import { render } from "@testing-library/react";
import ToDoGroup from "./index";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("ToDoGroup", () => {
  it("should render the component", () => {
    const { getByText, queryAllByRole } = render(
      <ToDoGroup heading="Test ToDo Group" todos={[]}></ToDoGroup>,
    );

    expect(getByText("Test ToDo Group")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });

  it("should render the correct number of ToDoItems", () => {
    const todos = [
      { id: 1, description: "Test ToDo 1", completed: false, createdAt: new Date().toISOString() },
      { id: 2, description: "Test ToDo 2", completed: true, createdAt: new Date().toISOString() },
    ];

    const { getByText, queryAllByRole } = render(
      <TodoContext.Provider value={{}}>
        <ToDoGroup heading="Test ToDo Group" todos={todos}></ToDoGroup>,
      </TodoContext.Provider>,
    );

    expect(queryAllByRole("listitem")).toHaveLength(2);

    const firstItem = getByText("Test ToDo 1");
    const secondItem = getByText("Test ToDo 2");

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });
});
