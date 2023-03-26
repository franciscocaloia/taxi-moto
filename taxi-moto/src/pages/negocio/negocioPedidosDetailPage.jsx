import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { OrderDetail } from "../../components/negocio/orders/orderDetail";

export const NegocioPedidosDetailPage = () => {
  const order = useLoaderData();
  return <OrderDetail order={order} />;
};

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      `http://localhost:8080/orders/${params.idPedido}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw response;
    }
    return response;
  }
  return null;
}

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

    return redirect(`/negocio/${params.idNegocio}/pedidos/${params.idPedido}`);
  }

  return null;
}
