import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { OrdersList } from "../../components/cadete/orders/ordersList";

export const CadetePedidosPage = () => {
  const orders = useLoaderData();
  return (
    <>
      {!(orders?.length === 0) ? (
        <OrdersList orders={orders} />
      ) : (
        <Link to="../negocios" relative="path">
          Tomar pedidos
        </Link>
      )}
    </>
  );
};

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/cadete/" + params.idCadete,
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
