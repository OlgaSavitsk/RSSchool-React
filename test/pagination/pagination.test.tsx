import { expect, describe, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PaginationComponent } from "../../src/components/pagination";

describe("Pagination", () => {

    test("the component updates URL query parameter when page changes", () => {
        const func = vi.fn()
        render(
            <PaginationComponent setPage={(page: number) => func(page)} />
        )
        const nextButton = screen.getByText('Next')
        fireEvent.click(nextButton)
        expect(func).toHaveBeenCalledWith(2);
    });
});