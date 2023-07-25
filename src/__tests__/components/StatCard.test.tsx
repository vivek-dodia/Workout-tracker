import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StatCard from "../../components/StatCard";

describe("StatCard component", () => {
  it("renders with label and value", () => {
    const label = "Sets";
    const value = 12;
    const { getByText, container } = render(<StatCard label={label} value={value} />);
    const labelElement = getByText(label);
    const valueElement = getByText(value.toString());
    const statCardElement = container.querySelector(".bg-white");

    expect(labelElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
    expect(statCardElement).toBeInTheDocument();
  });

  it("applies correct label and value", () => {
    const label = "Reps";
    const value = 120;
    const { getByText } = render(<StatCard label={label} value={value} />);
    const labelElement = getByText(label);
    const valueElement = getByText(value.toString());

    expect(labelElement).toHaveTextContent(label);
    expect(valueElement).toHaveTextContent(value.toString());
  });

  it("renders with the correct styling", () => {
    const label = "Volume";
    const value = "10000 kg";
    const { container } = render(<StatCard label={label} value={value} />);
    const statCardElement = container.querySelector(".bg-white");

    expect(statCardElement).toHaveClass("px-4");
    expect(statCardElement).toHaveClass("py-4");
    expect(statCardElement).toHaveClass("rounded-lg");
    expect(statCardElement).toHaveClass("shadow-md");
    expect(statCardElement).toHaveClass("whitespace-nowrap");
  });
});
