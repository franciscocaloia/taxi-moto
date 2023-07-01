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
import { loader as adminLayoutLoader } from "./layout/adminLayout";
import { loader as negocioLayoutLoader } from "./layout/negocioLayout";
import { loader as cadeteLayoutLoader } from "./layout/cadeteLayout";
import { Layout as AuthLayout, logoutAction } from "./utils/auth.jsx";
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
