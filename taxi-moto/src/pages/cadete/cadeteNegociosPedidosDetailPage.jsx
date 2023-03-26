import React from "react";
import { useLoaderData } from "react-router-dom";
import { NegocioOrderDetail } from "../../components/cadete/orders/negocioOrderDetail";
import { fetchData, submitData } from "../../utils/fetch";

export const CadeteNegociosPedidosDetailPage = () => {
  const order = useLoaderData();
  return <NegocioOrderDetail order={order} />;
};
export async function loader({ params }) {
  return fetchData(`/orders/${params.idPedido}`);
}

export async function action({ params, request }) {
  const data = await request.formData();
  const cadete = JSON.parse(data.get("cadete"));
  const update = { "state.TOMADO": true, cadete };

  return submitData(
    `/orders/${params.idPedido}`,
    {
      method: "put",
      body: JSON.stringify(update),
    },
    `/cadete/${params.idCadete}/pedidos`
  );
}
