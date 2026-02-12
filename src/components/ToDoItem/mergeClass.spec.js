import mergeClass from "./mergeClass";

describe("./mergeClass.js", () => {
  it.each([
    { input: true, expected: "todo-item completed" },
    { input: false, expected: "todo-item" },
  ])("should return the correct class name for input $input", ({ input, expected }) => {
    const result = mergeClass(input);
    expect(result).toBe(expected);
  });
});
