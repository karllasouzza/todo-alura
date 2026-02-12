import mergeClass from "./mergeClass";

describe("./mergeClass.js", () => {
  it("should return the correct class name when item is completed", () => {
    const result = mergeClass(true);
    expect(result).toBe("todo-item completed");
  });

  it("should return the correct class name when item is not completed", () => {
    const result = mergeClass(false);
    expect(result).toBe("todo-item");
  });
});
