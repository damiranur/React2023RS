import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("BUTTON COMPONENT", () => {
  it("renders a button with the provided text", () => {
    const { getByText } = render(
      <Button handleClick={() => {}}>Search</Button>,
    );
    const button = getByText("Search");
    expect(button).toBeInTheDocument();
  });

  it("calls the handleClick function when clicked", () => {
    const handleClickMock = jest.fn();
    const { getByText } = render(
      <Button handleClick={handleClickMock}>Click Me</Button>,
    );
    const button = getByText("Click Me");

    fireEvent.click(button);
    expect(handleClickMock).toHaveBeenCalled();
  });
});
