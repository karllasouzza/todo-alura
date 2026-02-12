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

  it("should render the description after 200ms", async () => {
    const { findByText } = render(<SubHeading>To Study</SubHeading>);

    const description = await findByText("This is a description");

    expect(description).toBeInTheDocument();
  })
});
