import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { OrderDetail } from "../../components/cadete/orders/orderDetail";

export const CadetePedidosDetailPage = () => {
  const order = useLoaderData();
  return <OrderDetail order={order} />;
};
export async function action({ request, params }) {
  const data = await request.formData();
  const update = { [`state.${data.get("state")}`]: true };
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      `http://localhost:8080/orders/${params.idPedido}`,
      {
        method: "put",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    if (!response.ok) {
      throw response;
    }
    return redirect(`/cadete/${params.idCadete}/pedidos/${params.idPedido}`);
  }

  return null;
}
