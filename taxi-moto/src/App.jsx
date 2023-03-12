import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/layout";
import { CadetePage } from "./pages/cadete/cadetePage";
import { CadetePedidosPage } from "./pages/cadete/cadetePedidosPage";
import { ErrorPage } from "./pages/errorPage";
import { LoginPage, action as loginAction } from "./pages/loginPage";
import { NegocioInformacionPage } from "./pages/negocio/negocioInformacionPage";
import {
  NegocioNuevoPedidoPage,
  action as nuevoPedidoAction,
} from "./pages/negocio/negocioNuevoPedidoPage";
import { NegocioPage } from "./pages/negocio/negocioPage";
import {
  loader as negocioPedidosLoader,
  NegocioPedidosPage,
} from "./pages/negocio/negocioPedidosPage";
import { AuthProvider } from "./store/useAuth";
import { checkAuthLoader, logoutAction } from "./utils/auth.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: checkAuthLoader,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: "logout",
          action: logoutAction,
        },
        {
          shouldRevalidate: () => false,
          children: [
            {
              path: "/negocio",
              children: [
                {
                  index: true,
                  element: <NegocioPage />,
                },
                {
                  path: "pedidos/:idNegocio",
                  element: <NegocioPedidosPage />,
                  loader: negocioPedidosLoader,
                },
                {
                  path: "nuevopedido",
                  action: nuevoPedidoAction,
                  element: <NegocioNuevoPedidoPage />,
                },
                {
                  path: "info/:idNegocio",
                  element: <NegocioInformacionPage />,
                },
              ],
            },
            {
              path: "/cadete",
              children: [
                {
                  index: true,
                  element: <CadetePage />,
                },
                {
                  path: "pedidos",
                  element: <CadetePedidosPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
