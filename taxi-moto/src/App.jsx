import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/layout";
import { CadetePage } from "./pages/cadete/cadetePage";
import { CadetePedidosPage,loader as cadetePedidosLoader } from "./pages/cadete/cadetePedidosPage";
import { ErrorPage } from "./pages/errorPage";
import { LoginPage, action as loginAction } from "./pages/loginPage";
import {
  NegocioEditarPedidoPage,
  action as editarPedidoAction,
} from "./pages/negocio/negocioEditarPedidoPage";
import { NegocioInformacionPage } from "./pages/negocio/negocioInformacionPage";
import {
  NegocioNuevoPedidoPage,
  action as nuevoPedidoAction,
} from "./pages/negocio/negocioNuevoPedidoPage";
import { NegocioPage } from "./pages/negocio/negocioPage";
import {
  action as editarEstadoPedidoAction,
  loader as negocioPedidosDetailLoader,
  NegocioPedidosDetailPage,
} from "./pages/negocio/negocioPedidosDetailPage";
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
                  path: "nuevopedido",
                  action: nuevoPedidoAction,
                  element: <NegocioNuevoPedidoPage />,
                },
                {
                  path: "editarpedido/:idPedido",
                  action: editarPedidoAction,
                  element: <NegocioEditarPedidoPage />,
                },
                {
                  path: ":idNegocio/editarEstadopedido/:idPedido",
                  action: editarEstadoPedidoAction,
                },
                {
                  path: ":idNegocio/info",
                  element: <NegocioInformacionPage />,
                },
                {
                  path: ":idNegocio/pedidos",
                  element: <NegocioPedidosPage />,
                  loader: negocioPedidosLoader,
                },
                {
                  path: ":idNegocio/pedidos/:idPedido",
                  element: <NegocioPedidosDetailPage />,
                  loader: negocioPedidosDetailLoader,
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
                  path: ":idCadete/pedidos",
                  loader:cadetePedidosLoader,
                  element: <CadetePedidosPage />,
                },
                {
                  path: ":idCadete/info",
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
