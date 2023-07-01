import React from "react";
import { useLoaderData } from "react-router-dom";
import { NegociosList } from "../../components/cadete/orders/negociosList";
import { fetchData } from "../../utils/fetch";

export const CadeteNegociosPage = () => {
  const negocios = useLoaderData().filter(
    (negocio) => negocio.availableOrders !== 0
  );
  return (
    <>
      {negocios.length !== 0 ? (
        <NegociosList negocios={negocios} />
      ) : (
        <h2>No hay pedidos disponibles</h2>
      )}
    </>
  );
};

export async function loader() {
  return fetchData("/orders/negociowithorders");
}
