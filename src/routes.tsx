import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFound } from "./pages/not-found";
import { DetailsComponent } from "./components/details";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
          {
            path: "people/:id",
            element: <DetailsComponent />,
          },
        ],
    },
])