import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Click me</Button>);
  });

  it("renders children", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("adds the provided className", () => {
    const { getByText } = render(<Button className="foo">Click me</Button>);
    expect(getByText("Click me")).toHaveClass("foo");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
