import React from "react";
import { useLoaderData } from "react-router-dom";
import { NegocioOrderList } from "../../components/cadete/orders/negoicoOrderList";

export const CadeteNegociosPedidosPage = () => {
  const orders = useLoaderData();
  return <NegocioOrderList orders={orders} />;
};
export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/cadete/negocio/" + params.idNegocio,
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
