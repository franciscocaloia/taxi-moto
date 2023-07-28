import { loader as adminLayoutLoader } from "../layout/adminLayout.jsx";
import {
  AdminNegocioLayout,
  loader as adminNegocioLayoutLoader,
} from "../layout/adminNegocioLayout.jsx";
import {
  AdminNegociosDebtPage,
  loader as adminNegociosDebtLoader,
  action as adminNegociosDebtAction,
} from "../pages/admin/adminNegociosDebtPage.jsx";
import { AdminNegociosDetailPage } from "../pages/admin/adminNegociosDetailPage.jsx";
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
          path: "debt",
          loader: adminNegociosDebtLoader,
          action: adminNegociosDebtAction,
          element: <AdminNegociosDebtPage />,
        },
      ],
    },

    {
      path: "cadetes",
    },
  ],
};
