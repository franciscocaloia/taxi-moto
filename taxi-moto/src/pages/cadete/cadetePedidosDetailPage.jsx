import React from "react";
import { useLoaderData } from "react-router-dom";
import { OrderDetail } from "../../components/cadete/orders/orderDetail";
import { submitData } from "../../utils/fetch";

export const CadetePedidosDetailPage = () => {
  const order = useLoaderData();
  return <OrderDetail order={order} />;
};
export async function action({ request, params }) {
  const data = await request.formData();
  const update = { [`state.${data.get("state")}`]: true };

  return submitData(
    `/orders/${params.idPedido}`,
    {
      method: "put",
      body: JSON.stringify(update),
    },
    `/cadete/${params.idCadete}/pedidos/${params.idPedido}`
  );
}
