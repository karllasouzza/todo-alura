import React from "react";
import { render } from "@testing-library/react";
import { FabButton } from "./index";

describe("FabButton", () => {
  it("renders the button with children", () => {
    const onclick = jest.fn();

    const { getByRole } = render(<FabButton onClick={onclick}>Click Me</FabButton>);
    const buttonElement = getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("fab");
    expect(buttonElement).toHaveTextContent("Click Me");
  });
});
