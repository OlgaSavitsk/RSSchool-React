/// <reference types="vitest" />

import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "../src/mocks/node";

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
