import React from "react";
import { Link } from "react-router-dom";
export const AdminNegocioOrdersListItem = ({ order }) => {
  return (
    <li className="my-3 lg:m-6">
      <Link
        className="card bg-base-100 shadow-xl transition-all duration-200 hover:scale-105"
        to={`/negocio/${order.negocio._id}/pedidos/${order._id}`}
      >
        <div className="card-body flex-row">
          <div className="flex flex-col w-5/6">
            <h2 className="card-title capitalize">{order.direction}</h2>
            <p className="pl-4">
              Horario de entrega:{" "}
              {order.date === "" ? "Entrega Inmediata" : order.date}
            </p>
            <p className="pl-4">
              Horario de alta:{" "}
              {new Date(order.orderDate).toLocaleString("es-AR", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
