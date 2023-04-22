import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/layout";
import { CadetePage } from "./pages/cadete/cadetePage";
import {
  CadeteNegociosPage,
  loader as cadeteNegociosLoader,
} from "./pages/cadete/cadeteNegociosPage";
import {
  CadetePedidosPage,
  loader as cadetePedidosLoader,
} from "./pages/cadete/cadetePedidosPage";
import { ErrorPage } from "./pages/errorPage";
import { LoginPage, action as loginAction } from "./pages/loginPage";
import {
  NegocioEditarPedidoPage,
  loader as editarPedidoLoader,
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

import { checkAuthLoader, logoutAction } from "./utils/auth.js";
import {
  CadeteInfoPage,
  action as cadeteInfoAction,
} from "./pages/cadete/cadeteInfoPage";
import {
  CadeteNegociosPedidosPage,
  loader as cadeteNegociosPedidosLoader,
} from "./pages/cadete/cadeteNegociosPedidosPage";
import {
  CadeteNegociosPedidosDetailPage,
  loader as cadetePedidosDetailLoader,
  action as cadeteNegociosPedidosDetailAction,
} from "./pages/cadete/cadeteNegociosPedidosDetailPage";
import {
  CadetePedidosDetailPage,
  action as cadetePedidoDetailAction,
} from "./pages/cadete/cadetePedidosDetailPage";
import { socket } from "./socket.js";
import { useEffect } from "react";
function App() {
  socket.on("orderCancelled", (order) => {
    console.log("Orden cancelada: " + order.direction);
  });
  const router = createBrowserRouter([
    {
      path: "/",
      loader: checkAuthLoader,
      shouldRevalidate: () => {},
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
                  loader: editarPedidoLoader,
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
                  loader: negocioPedidosDetailLoader,
                  action: editarEstadoPedidoAction,
                  element: <NegocioPedidosDetailPage />,
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
                  loader: cadetePedidosLoader,
                  element: <CadetePedidosPage />,
                },
                {
                  path: ":idCadete/pedidos/:idPedido",
                  loader: cadetePedidosDetailLoader,
                  action: cadetePedidoDetailAction,
                  element: <CadetePedidosDetailPage />,
                },
                {
                  path: ":idCadete/negocios",
                  loader: cadeteNegociosLoader,
                  element: <CadeteNegociosPage />,
                },
                {
                  path: ":idCadete/negocios/:idNegocio/pedidos",
                  loader: cadeteNegociosPedidosLoader,
                  element: <CadeteNegociosPedidosPage />,
                },
                {
                  path: ":idCadete/negocios/:idNegocio/pedidos/:idPedido",
                  loader: cadetePedidosDetailLoader,
                  action: cadeteNegociosPedidosDetailAction,
                  element: <CadeteNegociosPedidosDetailPage />,
                },
                {
                  path: ":idCadete/editarPedido/:idPedido",
                },
                {
                  path: ":idCadete/info",
                  action: cadeteInfoAction,
                  element: <CadeteInfoPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
