import React, { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { OrdersList } from "../../components/negocio/orders/ordersList";
import { fetchData } from "../../utils/fetch";
import { isCompletedOrder } from "../../utils/validation";
import useInput from "../../hooks/useInput";

export const NegocioPedidosPage = () => {
  const orders = useLoaderData();
  const today = new Date();
  const [date, setDate] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );
  function dateChangeHandler(event) {
    setDate(event.target.value);
  }
  const sortedOrders = useMemo(
    () =>
      orders.reduce(
        (acc, curr) => {
          if (curr.canceled) {
            acc.canceled.push(curr);
          } else {
            if (isCompletedOrder(curr)) {
              acc.completed.push(curr);
            } else {
              acc.pending.push(curr);
            }
          }
          return acc;
        },
        {
          pending: [],
          completed: [],
          canceled: [],
        }
      ),
    [orders]
  );

  const filteredCompletedOrders = useMemo(() => {
    const filterDate = new Date(date).toLocaleDateString("es-AR", {
      timeZone: "ART",
    });
    return sortedOrders.completed.filter((order) => {
      const orderDate = new Date(order.orderDate);
      orderDate.setHours(orderDate.getHours() - 6);
      return (
        orderDate.toLocaleDateString("es-AR", {
          // timeZone: "ART",
        }) === filterDate
      );
    });
  }, [date]);
  return (
    <div className="w-5/6 mx-auto lg:w-4/5">
      <h2 className="card-title capitalize border-b-2 border-b-base-200">
        Pedidos pendientes
      </h2>
      {sortedOrders.pending.length !== 0 ? (
        <OrdersList orders={sortedOrders.pending} />
      ) : (
        <>
          <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
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
      <input type="date" onChange={dateChangeHandler} value={date}></input>
      <OrdersList orders={filteredCompletedOrders} />
    </div>
  );
};

export async function loader({ params }) {
  return fetchData(`/orders/negocio/${params.idNegocio}`);
}
