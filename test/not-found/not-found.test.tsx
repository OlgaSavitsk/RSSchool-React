import { expect, test } from "vitest";
import { NotFound } from "../../src/pages/not-found";
import { renderWithRouter } from "../router";

test("Not-found page", () => {
    const { getByText } = renderWithRouter(
        <NotFound />
    )
    const page = getByText('404')
    expect(page).toBeInTheDocument();
});