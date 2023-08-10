import React from "react";
import { fetchData, submitDataWithErrorReturn } from "../../utils/fetch";
import { useLoaderData } from "react-router-dom";
import { AdminNegocioOrderDetail } from "../../components/admin/adminNegocioOrderDetail";

export const AdminNegociosOrdersDetailPage = () => {
  const order = useLoaderData();
  return <>{order && <AdminNegocioOrderDetail order={order} />}</>;
};

export async function loader({ params }) {
  return fetchData(`/orders/${params.idPedido}`);
}

export async function action({ params, request }) {
  const data = await request.formData();
  return submitDataWithErrorReturn(
    `/orders/${params.idPedido}/state/${data.get("state")}`,
    { method: "put" },
    `/cadete/${params.idCadete}/pedidos`
  );
}
