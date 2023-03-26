import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { NegocioOrderDetail } from "../../components/cadete/orders/negocioOrderDetail";

export const CadeteNegociosPedidosDetailPage = () => {
  const order = useLoaderData();
  return <NegocioOrderDetail order={order} />;
};
export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/" + params.idPedido,
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

export async function action({ params, request }) {
  const data = await request.formData();
  const cadete = JSON.parse(data.get("cadete"));
  const update = { "state.TOMADO": true, cadete };
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/" + params.idPedido,
      {
        method: "put",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
    if (!response.ok) {
      throw response;
    }
    return redirect(`/cadete/${params.idCadete}/pedidos`);
  }

  return null;
}
