import { loader as adminLayoutLoader } from "../layout/adminLayout.jsx";
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
      path: "negocio/:idNegocio/pedidos",
      loader: adminNegociosOrdersLoader,
      element: <AdminNegociosOrdersPage />,
    },

    {
      path: "cadetes",
    },
  ],
};
