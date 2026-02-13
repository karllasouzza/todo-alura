import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { TodoProvider } from "./index";
import { getTodos } from "../../services/TodoService";

jest.mock("../../services/TodoService");

describe("TodoProvider", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should correctly provide component getting todos on mount", async () => {
    render(<TodoProvider />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(getTodos).toHaveBeenCalledTimes(1);
    });
  });
});
