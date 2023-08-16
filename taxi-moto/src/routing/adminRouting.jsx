import { loader as adminLayoutLoader } from "../layout/adminLayout.jsx";
import {
  AdminNegocioLayout,
  loader as adminNegocioLayoutLoader,
} from "../layout/adminNegocioLayout.jsx";
import { AdminCadetesForm } from "../pages/admin/adminCadetesForm.jsx";
import {
  AdminCadetesPage,
  loader as adminCadetesLoader,
} from "../pages/admin/adminCadetesPage.jsx";
import {
  AdminNegociosDebtPage,
  action as adminNegociosDebtAction,
} from "../pages/admin/adminNegociosDebtPage.jsx";

import { AdminNegociosDetailPage } from "../pages/admin/adminNegociosDetailPage.jsx";
import {
  AdminNegociosOrdersDetailPage,
  loader as adminNegociosOrdersDetailLoader,
  action as adminNegociosOrdersDetailAction,
} from "../pages/admin/adminNegociosOrdersDetailPage.jsx";
import {
  AdminNegociosOrdersPage,
  loader as adminNegociosOrdersLoader,
} from "../pages/admin/adminNegociosOrdersPage.jsx";
import {
  AdminNegociosPage,
  loader as adminNegociosLoader,
} from "../pages/admin/adminNegociosPage.jsx";
import { Layout as AuthLayout } from "../utils/auth.jsx";
export const adminRouting = {
  path: "admin",
  loader: adminLayoutLoader,
  element: <AuthLayout />,
  children: [
    {
      path: "negocio",
      loader: adminNegociosLoader,
      element: <AdminNegociosPage />,
    },
    {
      path: "negocio/:idNegocio",
      element: <AdminNegocioLayout />,
      loader: adminNegocioLayoutLoader,
      children: [
        {
          index: true,
          element: <AdminNegociosDetailPage />,
        },
        {
          path: "orders",
          loader: adminNegociosOrdersLoader,
          element: <AdminNegociosOrdersPage />,
        },
        {
          path: "orders/:idPedido",
          loader: adminNegociosOrdersDetailLoader,
          action: adminNegociosOrdersDetailAction,
          element: <AdminNegociosOrdersDetailPage />,
        },
        {
          path: "debt",
          action: adminNegociosDebtAction,
          element: <AdminNegociosDebtPage />,
        },
      ],
    },
    {
      path: "cadete",
      loader: adminCadetesLoader,
      element: <AdminCadetesPage />,
    },
    {
      path: "cadete/new",
      element: <AdminCadetesForm />,
    },
  ],
};
