import React from "react";
import { useLoaderData } from "react-router-dom";
import { OrderDetail } from "../../components/negocio/orders/orderDetail";
import { fetchData, submitData } from "../../utils/fetch";

export const NegocioPedidosDetailPage = () => {
  const order = useLoaderData();
  return <OrderDetail order={order} />;
};

export async function loader({ params }) {
  return fetchData(`/orders/${params.idPedido}`);
}

export async function action({ request, params }) {
  const data = await request.formData();
  const update = { [`state.${data.get("state")}`]: true };
  return submitData(
    `/orders/${params.idPedido}`,
    {
      method: "put",
      body: JSON.stringify(update),
    },
    `/negocio/${params.idNegocio}/pedidos/${params.idPedido}`
  );
}
