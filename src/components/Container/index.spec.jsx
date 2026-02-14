import { render } from "@testing-library/react";
import { Container } from "./index";

describe("Container", () => {
  it("should render correctly", () => {
    const { container} = render(<Container>Test</Container>);
    expect(container.querySelector(".container")).toHaveClass("container");
  });

  it("should render children correctly", () => {
    const { getByText } = render(<Container>Test</Container>);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
