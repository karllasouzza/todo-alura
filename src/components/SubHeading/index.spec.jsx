import React from "react";
import { render } from "@testing-library/react";
import { SubHeading } from "./index";

describe("SubHeading", () => {
  it("should render the component", () => {
    const { queryByText } = render(<SubHeading>To Study</SubHeading>);

    expect(queryByText("To Study")).toBeInTheDocument();
  });

  it("shouldn't render the component without children", () => {
    const { queryByText } = render(<SubHeading></SubHeading>);
    expect(queryByText("To Study")).toBeNull();
  });
});
