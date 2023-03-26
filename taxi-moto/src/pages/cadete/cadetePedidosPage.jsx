import React, { useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { OrdersList } from "../../components/cadete/orders/ordersList.jsx";
import { fetchData } from "../../utils/fetch";
import { isCompletedOrder } from "../../utils/validation";

export const CadetePedidosPage = () => {
  const orders = useLoaderData();
  const sortedOrders = useMemo(
    () =>
      orders.reduce(
        (acc, curr) => {
          if (isCompletedOrder(curr)) {
            acc.completed.push(curr);
          } else {
            acc.pending.push(curr);
          }
          return acc;
        },
        {
          pending: [],
          completed: [],
        }
      ),
    [orders]
  );
  return (
    <div className="w-5/6 mx-auto lg:w-4/5">
      <h2 className="card-title capitalize border-b-2 border-b-base-200">
        Pedidos pendientes
      </h2>
      {sortedOrders.pending.length !== 0 ? (
        <OrdersList orders={sortedOrders.pending} />
      ) : (
        <Link
          className="card bg-base-100 p-6 m-6 shadow-xl transition-all duration-200 hover:scale-105"
          to="../negocios"
          relative="path"
        >
          Tomar pedidos
        </Link>
      )}
      <h2 className="card-title capitalize border-b-2 border-b-base-200">
        Pedidos completados
      </h2>
      <OrdersList orders={sortedOrders.completed} />
    </div>
  );
};

export async function loader({ params }) {
  return fetchData(`/orders/cadete/${params.idCadete}`);
}
