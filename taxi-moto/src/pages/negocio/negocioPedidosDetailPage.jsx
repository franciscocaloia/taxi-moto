import React, { useEffect } from "react";
import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderDetail } from "../../components/negocio/orders/orderDetail";
import {
  fetchData,
  submitData,
  submitDataWithErrorReturn,
} from "../../utils/fetch";

export const NegocioPedidosDetailPage = () => {
  const order = useLoaderData();
  const error = useActionData();
  useEffect(() => {
    console.log(error);
    if (error) {
      toast.error("Error: " + error.data?.message);
    }
  }, [error]);
  return <>{order && <OrderDetail order={order} />}</>;
};

export async function loader({ params }) {
  return fetchData(`/orders/${params.idPedido}`);
}

export async function action({ request, params }) {
  const data = await request.formData();
  return submitDataWithErrorReturn(
    `/orders/${params.idPedido}/state/${data.get("state")}`,
    {
      method: "put",
    },
    `/negocio/${params.idNegocio}/pedidos/${params.idPedido}`
  );
}
