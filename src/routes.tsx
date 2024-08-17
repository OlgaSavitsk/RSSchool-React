import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFound } from "./pages/not-found";
import { UncontrolledFormPage } from "./pages/uncontrol";
import { ControlledFormPage } from "./pages/control";
import { MainPage } from "./pages/main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "uncontrol",
        element: <UncontrolledFormPage />,
      },
      {
        path: "control",
        element: <ControlledFormPage />,
      },
    ],
  },
]);
