import React from "react";
import { AdminNegocioOrdersList } from "../../components/admin/adminNegociosOrdersList";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../utils/fetch";

export const AdminNegociosOrdersPage = () => {
  const orders = useLoaderData();
  return (
    <div>
      <AdminNegocioOrdersList orders={orders} />
    </div>
  );
};
export function loader({ params }) {
  return fetchData(`/orders/negocio/${params.idNegocio}`);
}
