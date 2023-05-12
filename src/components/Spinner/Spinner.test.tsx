import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders without crashing", () => {
    render(<Spinner />);
  });

  it("adds the 'center' class when center prop is true", () => {
    const { getByTestId } = render(<Spinner center />);
    expect(getByTestId("spinner")).toHaveClass("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2");
  });

  it("adds the provided className", () => {
    const { getByTestId } = render(<Spinner className="foo" />);
    expect(getByTestId("spinner")).toHaveClass("foo");
  });
});
