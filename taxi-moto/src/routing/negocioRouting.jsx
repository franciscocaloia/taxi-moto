import {
  NegocioEditarPedidoPage,
  loader as editarPedidoLoader,
  action as editarPedidoAction,
} from "../pages/negocio/negocioEditarPedidoPage";
import { NegocioInformacionPage } from "../pages/negocio/negocioInformacionPage";
import {
  NegocioNuevoPedidoPage,
  action as nuevoPedidoAction,
} from "../pages/negocio/negocioNuevoPedidoPage";
import { NegocioPage } from "../pages/negocio/negocioPage";
import {
  action as editarEstadoPedidoAction,
  loader as negocioPedidosDetailLoader,
  NegocioPedidosDetailPage,
} from "../pages/negocio/negocioPedidosDetailPage";
import {
  loader as negocioPedidosLoader,
  NegocioPedidosPage,
} from "../pages/negocio/negocioPedidosPage";
import { Layout as AuthLayout } from "../utils/auth.jsx";
import { loader as negocioLayoutLoader } from "../layout/negocioLayout.jsx";

export const negocioRouting = {
  path: "/negocio",
  element: <AuthLayout />,
  loader: negocioLayoutLoader,
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
};
