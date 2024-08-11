import { expect, describe, test } from "vitest";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "../../src/error-handling/error-boundary";

describe("Error boundary", () => {
  test("should throw error", () => {
    const ThrowError = () => {
      throw new Error("Unexpected Render Error occured!");
    };
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(getByText("Error!!")).toBeInTheDocument();
  });
});
