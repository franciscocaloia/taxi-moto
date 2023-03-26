import React from "react";
import { useLoaderData } from "react-router-dom";
import { NegocioOrderList } from "../../components/cadete/orders/negoicoOrderList";
import { fetchData } from "../../utils/fetch";

export const CadeteNegociosPedidosPage = () => {
  const orders = useLoaderData();
  return <NegocioOrderList orders={orders} />;
};
export async function loader({ params }) {
  return fetchData(`/orders/cadete/negocio/${params.idNegocio}`);
}
