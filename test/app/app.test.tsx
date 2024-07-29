import { expect, test } from "vitest";
import { renderWithRouter } from "../router";
import App from "../../src/App";

test("Not-found page", () => {
    const { getByText } = renderWithRouter(
        <App />
    )
    expect(getByText('Switch to light')).toBeInTheDocument();
});