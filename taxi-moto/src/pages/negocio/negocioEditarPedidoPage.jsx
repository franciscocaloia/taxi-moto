import React from "react";
import { redirect, useLocation } from "react-router-dom";
import { PedidoForm } from "../../components/negocio/PedidoForm";
import { submitData } from "../../utils/fetch";
import { getPricing } from "../../utils/pricing";

export const NegocioEditarPedidoPage = () => {
  const location = useLocation();
  return <PedidoForm order={location.state} />;
};

export async function action({ request, params }) {
  const data = await request.formData();
  const order = JSON.parse(data.get("order"));
  const {
    auth: user,
    mapInput: { route },
  } = JSON.parse(data.get("state"));
  if (!(route.to && route.from)) {
    return json("Debe ingresar una ubicacion en el mapa");
  }
  order.direction = data.get("direction");
  order.phone = data.get("phone");
  order.date = data.get("date");
  order.route = route;
  const amount = data.get("amount");
  const pricing = await getPricing(route.totalDistance);
  order.totalAmount = {
    amount,
    ...pricing,
  };
  return submitData(
    `/orders/${order._id}`,
    { method: "put", body: JSON.stringify(order) },
    `/negocio/${order.negocio}/pedidos/${order._id}`
  );
}
