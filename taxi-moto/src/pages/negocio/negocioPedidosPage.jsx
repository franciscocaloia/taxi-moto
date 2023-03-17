import React from "react";
import { useLoaderData } from "react-router-dom";
import { OrdersList } from "../../components/negocio/orders/ordersList";

export const NegocioPedidosPage = () => {
  const data = useLoaderData();
  return (
    <>
      <OrdersList orders={data.orders} />
    </>
  );
};

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/negocio/" + params.idNegocio,
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
