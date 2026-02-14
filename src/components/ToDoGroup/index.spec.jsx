import React from "react";
import { render } from "@testing-library/react";
import ToDoGroup from "./index";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("ToDoGroup", () => {
  it("should render the component with loading message", () => {
    const { getByText, queryAllByRole } = render(
      <ToDoGroup heading="Test ToDo Group" todos={[]} isLoading={true}></ToDoGroup>,
    );

    expect(getByText("Carregando...")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });

  it("should render the component with empty list message", () => {
    const { getByText, queryByText, queryAllByRole } = render(
      <ToDoGroup heading="Test ToDo Group" todos={[]} isLoading={false}></ToDoGroup>,
    );

    expect(getByText("Nenhum item encontrado")).toBeInTheDocument();
    expect(queryByText("Carregando...")).toBeNull();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });

  it.each([
    { isLoading: false, todos: [] },
    { isLoading: true, todos: [] },
    {
      isLoading: false,
      todos: [
        {
          id: 1,
          description: "Test ToDo 1",
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ])("should render the component with the heading all time", ({ isLoading, todos }) => {
    const { getByText, queryByText, queryAllByRole } = render(
      <TodoContext.Provider value={{}}>
        <ToDoGroup heading="Test ToDo Group" todos={todos} isLoading={isLoading}></ToDoGroup>,
      </TodoContext.Provider>,
    );

    expect(getByText("Test ToDo Group")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(todos.length);

    if (isLoading) {
      expect(getByText("Carregando...")).toBeInTheDocument();
    } else {
      expect(queryByText("Carregando...")).toBeNull();
    }
  });

  it("should render the correct number of ToDoItems", () => {
    const todos = [
      { id: 1, description: "Test ToDo 1", completed: false, createdAt: new Date().toISOString() },
      { id: 2, description: "Test ToDo 2", completed: true, createdAt: new Date().toISOString() },
    ];

    const { getByText, queryAllByRole } = render(
      <TodoContext.Provider value={{}}>
        <ToDoGroup heading="Test ToDo Group" todos={todos} isLoading={false}></ToDoGroup>,
      </TodoContext.Provider>,
    );

    expect(queryAllByRole("listitem")).toHaveLength(2);

    const firstItem = getByText("Test ToDo 1");
    const secondItem = getByText("Test ToDo 2");

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  describe("false positive test", () => {
    it("should render empty list when todos is empty", () => {
      const { getByText } = render(
        <TodoContext.Provider value={{}}>
          <ToDoGroup heading="Test ToDo Group" todos={[]} isLoading={false} />,
        </TodoContext.Provider>,
      );

      expect(getByText("Nenhum item encontrado")).toBeInTheDocument();
    });
  });
});
