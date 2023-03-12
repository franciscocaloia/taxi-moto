import React from "react";
import { useLoaderData } from "react-router-dom";

export const NegocioPedidosPage = () => {
  const orders = useLoaderData();
  console.log(orders);
  return <div>negocioPedidosPage</div>;
};

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/" + params.idNegocio,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) {
      throw response;
    }
    // console.log(await response.json());
    return response;
  }
  return null;
}
