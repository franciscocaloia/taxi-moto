import React from "react";
import { useLoaderData } from "react-router-dom";

export const CadetePedidosPage = () => {
  const data = useLoaderData()
  return <div>PedidosPage</div>;
};

export async function loader({}) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/cadete",
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