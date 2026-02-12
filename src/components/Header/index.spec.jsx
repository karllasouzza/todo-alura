import { render } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
  it("should render the component", () => {
    expect(render(<Header />)).toBeTruthy();
  });

  it("should render the component with the correct class", () => {
    const { container } = render(<Header />);

    expect(container.querySelector(".header")).toBeInTheDocument();
  });

  it("should render the component with the correct children", () => {
    const { getByText, debug } = render(<Header>Test</Header>);

    debug();

    expect(getByText("Test")).toBeInTheDocument();
  });
});
