import React, { useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { OrdersList } from "../../components/negocio/orders/ordersList";
import { isCompletedOrder } from "../../utils/validation";

export const NegocioPedidosPage = () => {
  const data = useLoaderData();
  const sortedOrders = useMemo(
    () =>
      data.reduce(
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
    [data]
  );
  return (
    <div className="w-5/6 mx-auto lg:w-4/5">
      <h2 className="card-title capitalize border-b-2 border-b-base-200">
        Pedidos pendientes
      </h2>
      {sortedOrders.pending.length !== 0 ? (
        <OrdersList orders={sortedOrders.pending} />
      ) : (
        <>
          <div
            className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl"
            to="/negocio/nuevopedido"
            relative="path"
          >
            <p>No tienes pedidos registrados</p>
            <Link
              className="btn btn-primary"
              to="/negocio/nuevopedido"
              relative="path"
            >
              Registrar pedido
            </Link>
          </div>
        </>
      )}
      <h2 className="card-title capitalize border-b-2 border-b-base-200">
        Pedidos completados
      </h2>
      <OrdersList orders={sortedOrders.completed} />
    </div>
  );
};

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "http://localhost:8080/orders/negocio/" + params.idNegocio,
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
