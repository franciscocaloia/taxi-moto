import React from "react";
import { Link } from "react-router-dom";

export const OrderActions = ({ order }) => {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <button className="btn btn-primary w-full ">Pedido retirado</button>
      <button className="btn btn-primary w-full ">Pedido abonado</button>
      <Link
        state={order}
        to={`/negocio/editarpedido/${order._id}`}
        z
        className="btn btn-primary w-full "
      >
        Editar pedido
      </Link>
      <button className="btn btn-success w-full ">Finalizar pedido</button>
      <button className="btn btn-error  w-full ">Cancelar pedido</button>
    </div>
  );
};
