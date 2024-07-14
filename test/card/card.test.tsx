import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CardComponent } from '../../src/components/card/index'
import { BrowserRouter as Router } from "react-router-dom";

const dataResponse = {
    id: 1,
    gender: 'male',
    hair_color: 'blond',
    height: '172',
    mass: '77',
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/12/'
}

describe('Card', () => {

    test('card component renders the relevant card data', () => {
        const { getByText } = render(
            <Router>
                <CardComponent item={dataResponse} />
            </Router>)
        expect(getByText(dataResponse.name)).toBeInTheDocument()
        expect(getByText(dataResponse.gender)).toBeInTheDocument()
        expect(getByText(dataResponse.hair_color)).toBeInTheDocument()
        expect(getByText(dataResponse.height)).toBeInTheDocument()
        expect(getByText(dataResponse.mass)).toBeInTheDocument()
    })
})