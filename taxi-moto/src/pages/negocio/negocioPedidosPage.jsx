import React, { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { OrdersList } from "../../components/negocio/orders/ordersList";
import { fetchData } from "../../utils/fetch";
import { isCompletedOrder } from "../../utils/validation";

export const NegocioPedidosPage = () => {
  const orders = useLoaderData();
  const today = new Date();

  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({
      date: today
        .toLocaleDateString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-"),
    });
  }, []);
  function dateChangeHandler(event) {
    setSearchParams({ date: event.target.value });
  }
  return (
    <div className="w-5/6 mx-auto lg:w-4/5">
      <h2 className="card-title capitalize border-b-2 border-b-base-200">
        Pedidos pendientes
      </h2>
      {orders.pending.length !== 0 ? (
        <OrdersList orders={orders.pending} />
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
      <input
        defaultValue={searchParams.get("date")? searchParams.get("date") : today
        .toLocaleDateString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-")}
        type="date"
        onChange={dateChangeHandler}
      ></input>
      <OrdersList orders={orders.completed} />
    </div>
  );
};

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const initDate = Date.parse(date + " GMT-0300") 
  const finalDate = initDate + 86400000;
  return fetchData(
    `/orders/negocio/${params.idNegocio}?initDate=${initDate}&finalDate=${finalDate}`
  );
}