import React from "react";
import { redirect } from "react-router-dom";
import { NewPedidoForm } from "../../components/negocio/newPedidoForm";
import { getPricing } from "../../utils/pricing";

export const NegocioNuevoPedidoPage = () => {
  return (
    <>
      <h2>Nuevo Pedido</h2>
      <NewPedidoForm />
    </>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();
  const {
    auth: user,
    mapInput: { route },
  } = JSON.parse(data.get("state"));
  const direction = data.get("direction");
  const phone = data.get("phone");
  const amount = data.get("amount");
  const date = data.get("date");
  const pricing = await getPricing(route.totalDistance);
  const order = {
    negocio: user._id,
    direction,
    phone,
    date,
    state: "TOMADO",
    totalAmount: {
      amount,
      ...pricing,
    },
  };
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch("http://localhost:8080/orders", {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw response;
    }
    return redirect("/negocio");
  }

  return null;
}
