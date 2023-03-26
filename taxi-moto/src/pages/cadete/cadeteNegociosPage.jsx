import React from "react";
import { useLoaderData } from "react-router-dom";
import { NegociosList } from "../../components/cadete/orders/negociosList";
import { fetchData } from "../../utils/fetch";

export const CadeteNegociosPage = () => {
  const negocios = useLoaderData();
  return <NegociosList negocios={negocios} />;
};

export async function loader() {
  return fetchData("/negocios");
}
