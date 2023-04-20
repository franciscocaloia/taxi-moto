import React, { useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { fetchData } from "../../utils/fetch";
import { OrdersList } from "../../components/cadete/orders/ordersList";
import { isCompletedOrder } from "../../utils/validation";

export const CadetePedidosPage = () => {
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
        <div className="card max-w-xs bg-base-100 p-6 m-6 shadow-xl">
          <Link className="btn btn-primary" to="../negocios" relative="path">
            Tomar pedidos
          </Link>
        </div>
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
  return fetchData(`/orders/cadete/${params.idCadete}`);
}
