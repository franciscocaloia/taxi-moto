import React from "react";
import { json } from "react-router-dom";
import { PedidoForm } from "../../components/negocio/PedidoForm";
import { submitData } from "../../utils/fetch";
import { getPricing } from "../../utils/pricing";

export const NegocioNuevoPedidoPage = () => {
  return (
    <>
      <h2>Nuevo Pedido</h2>
      <PedidoForm />
    </>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();
  const {
    auth: user,
    mapInput: { route },
  } = JSON.parse(data.get("state"));
  if (!(route.to && route.from)) {
    return json({ map: "Debe ingresar una ubicacion en el mapa" });
  }
  const direction = data.get("direction");
  const phone = data.get("phone");
  const amount = data.get("amount");
  const date = data.get("date");
  const pricing = await getPricing(route.totalDistance);
  const order = {
    negocio: user,
    direction,
    phone,
    date,
    state: {
      REGISTRADO: true,
      TOMADO: false,
      RETIRADO: false,
      ABONADO: false,
      ENTREGADO: false,
    },
    totalAmount: {
      amount,
      ...pricing,
    },
    route,
    orderDate: Date.now(),
  };
  return submitData(
    "/orders",
    { method: "post", body: JSON.stringify(order) },
    "/negocio"
  );
}
