import React, { useEffect } from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { NegocioOrderDetail } from "../../components/cadete/orders/negocioOrderDetail";
import { fetchData, submitDataWithErrorReturn } from "../../utils/fetch";

export const CadeteNegociosPedidosDetailPage = () => {
  const order = useLoaderData();
  const error = useActionData();
  useEffect(() => {
    console.log(error);
    if (error) {
      toast.error("Error: " + error.data?.message);
    }
  }, [error]);
  return <>{order && <NegocioOrderDetail order={order} />}</>;
};
export async function loader({ params }) {
  return fetchData(`/orders/${params.idPedido}`);
}

export async function action({ params, request }) {
  const data = await request.formData();
  return submitDataWithErrorReturn(
    `/orders/${params.idPedido}/state/${data.get("state")}`,
    { method: "put" },
    `/cadete/${params.idCadete}/pedidos`
  );
}
