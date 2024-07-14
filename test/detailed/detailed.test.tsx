import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { DetailsComponent } from "../../src/components/details";
import { getPeople } from "../../src/services/people.api";

const dataResponse = {
    id: '12',
    gender: 'male',
    hair_color: 'blond',
    height: '172',
    mass: '77',
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/12/'
}

describe('Detailed', () => {

    beforeEach(async () => {
        await getPeople(dataResponse.id)
        vi.spyOn(axios, "get").mockReturnValue(
            new Promise((resolve) =>
                resolve({
                    ok: true,
                    data: dataResponse,
                }),
            ),
        );
        render(
            <Router>
                <DetailsComponent />
            </Router>)
    });
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('loading indicator is displayed while fetching data', async () => {
        expect(screen.getByText('Loading...'))

    });
})