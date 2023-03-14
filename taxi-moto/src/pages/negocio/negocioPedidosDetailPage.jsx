import React from "react";
import { useLoaderData } from "react-router-dom";
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
