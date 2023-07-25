import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Avatar from "../../components/Avatar";

describe("Avatar component", () => {
  it("renders with initials", () => {
    const initials = "JD";
    const { getByText, container } = render(<Avatar initials={initials} />);
    const initialsElement = getByText(initials);
    const avatarElement = container.querySelector(".relative");

    expect(initialsElement).toBeInTheDocument();
    expect(avatarElement).toBeInTheDocument();
  });

  it("applies correct initials", () => {
    const initials = "AB";
    const { getByText } = render(<Avatar initials={initials} />);
    const initialsElement = getByText(initials);

    expect(initialsElement).toHaveTextContent(initials);
  });

  it("renders with the correct background color", () => {
    const initials = "XY";
    const { container } = render(<Avatar initials={initials} />);
    const avatarElement = container.querySelector(".relative");

    expect(avatarElement).toHaveClass("bg-gray-100");
  });

  it("renders with the correct size", () => {
    const initials = "LM";
    const { container } = render(<Avatar initials={initials} />);
    const avatarElement = container.querySelector(".relative");

    expect(avatarElement).toHaveClass("w-10 h-10");
  });
});
