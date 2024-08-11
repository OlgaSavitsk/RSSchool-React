/// <reference types="vitest" />

import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "../src/mocks/node";
import { afterAll, beforeAll, expect } from "vitest";

expect.extend(matchers);

beforeAll(() => server.listen());
afterAll(() => server.close());
