import React from "react";
import { useLoaderData } from "react-router-dom";
import { NegociosList } from "../../components/cadete/orders/negociosList";

export const CadeteNegociosPage = () => {
  const negocios = useLoaderData();
  return <NegociosList negocios={negocios} />;
};

export async function loader() {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch("http://localhost:8080/negocios", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw response;
    }
    return response;
  }
  return null;
}
