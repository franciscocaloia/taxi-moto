import React from "react";
import { useLoaderData } from "react-router-dom";
import { PedidoForm } from "../../components/negocio/PedidoForm";
import { fetchData, submitDataWithErrorReturn } from "../../utils/fetch";
import { getPricing } from "../../utils/pricing";

export const NegocioEditarPedidoPage = () => {
  const order = useLoaderData();
  return <PedidoForm order={order} />;
};

export async function loader({ params }) {
  return fetchData(`/orders/${params.idPedido}`);
}

export async function action({ request, params }) {
  const data = await request.formData();
  const order = JSON.parse(data.get("order"));
  const {
    auth: user,
    mapInput: { route },
  } = JSON.parse(data.get("state"));
  if (!(route.to && route.from)) {
    return json({ map: "Debe ingresar una ubicacion en el mapa" });
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
  return submitDataWithErrorReturn(
    `/orders/${order._id}`,
    { method: "put", body: JSON.stringify(order) },
    `/negocio/${order.negocio}/pedidos/${order._id}`
  );
}
