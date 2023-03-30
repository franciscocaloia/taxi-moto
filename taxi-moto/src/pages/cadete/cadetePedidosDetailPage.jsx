import React, { useEffect } from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderDetail } from "../../components/cadete/orders/orderDetail";
import { submitDataWithErrorReturn } from "../../utils/fetch";

export const CadetePedidosDetailPage = () => {
  const order = useLoaderData();
  const error = useActionData();
  useEffect(() => {
    if (error) {
      toast.error("Error: " + error.data?.message);
    }
  }, [error]);
  return <>{order && <OrderDetail order={order} />}</>;
};
export async function action({ request, params }) {
  const data = await request.formData();

  return submitDataWithErrorReturn(
    `/orders/${params.idPedido}/state/${data.get("state")}`,
    {
      method: "put",
    },
    `/cadete/${params.idCadete}/pedidos/${params.idPedido}`
  );
}
