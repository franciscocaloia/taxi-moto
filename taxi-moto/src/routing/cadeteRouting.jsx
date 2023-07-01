import { CadetePage } from "../pages/cadete/cadetePage";
import {
  CadeteNegociosPage,
  loader as cadeteNegociosLoader,
} from "../pages/cadete/cadeteNegociosPage";
import {
  CadetePedidosPage,
  loader as cadetePedidosLoader,
} from "../pages/cadete/cadetePedidosPage";

import { loader as cadeteLayoutLoader } from "../layout/cadeteLayout";
import { Layout as AuthLayout, logoutAction } from "../utils/auth.jsx";
import {
  CadeteInfoPage,
  action as cadeteInfoAction,
} from "../pages/cadete/cadeteInfoPage";
import {
  CadeteNegociosPedidosPage,
  loader as cadeteNegociosPedidosLoader,
} from "../pages/cadete/cadeteNegociosPedidosPage";
import {
  CadeteNegociosPedidosDetailPage,
  loader as cadetePedidosDetailLoader,
  action as cadeteNegociosPedidosDetailAction,
} from "../pages/cadete/cadeteNegociosPedidosDetailPage";
import {
  CadetePedidosDetailPage,
  action as cadetePedidoDetailAction,
} from "../pages/cadete/cadetePedidosDetailPage";

export const cadeteRouting = {
  path: "/cadete",
  element: <AuthLayout />,
  loader: cadeteLayoutLoader,
  children: [
    {
      index: true,
      element: <CadetePage />,
    },
    {
      path: ":idCadete",
      children: [
        {
          path: "pedidos",
          loader: cadetePedidosLoader,
          element: <CadetePedidosPage />,
        },
        {
          path: "pedidos/:idPedido",
          loader: cadetePedidosDetailLoader,
          action: cadetePedidoDetailAction,
          element: <CadetePedidosDetailPage />,
        },
        {
          path: "negocios",
          loader: cadeteNegociosLoader,
          element: <CadeteNegociosPage />,
        },
        {
          path: "negocios/:idNegocio/pedidos",
          loader: cadeteNegociosPedidosLoader,
          element: <CadeteNegociosPedidosPage />,
        },
        {
          path: "negocios/:idNegocio/pedidos/:idPedido",
          loader: cadetePedidosDetailLoader,
          action: cadeteNegociosPedidosDetailAction,
          element: <CadeteNegociosPedidosDetailPage />,
        },
        {
          path: "editarPedido/:idPedido",
        },
        {
          path: "info",
          action: cadeteInfoAction,
          element: <CadeteInfoPage />,
        },
      ],
    },
  ],
};
