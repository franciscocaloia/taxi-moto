import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/layout";
import { ErrorPage } from "./pages/errorPage";
import {
  LoginPage,
  loader as loginLoader,
  action as loginAction,
} from "./pages/loginPage";
import { logoutAction } from "./utils/auth.jsx";
import { cadeteRouting } from "./routing/cadeteRouting";
import { negocioRouting } from "./routing/negocioRouting";
import { adminRouting } from "./routing/adminRouting";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LoginPage />,
          loader: loginLoader,
          action: loginAction,
        },
        {
          path: "logout",
          action: logoutAction,
        },
        negocioRouting,
        cadeteRouting,
        adminRouting,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
