import React from "react";
import { Link } from "react-router-dom";
import { OrderBadges } from "./orderBadges";
export const OrdersListItem = ({ order }) => {
  let totalAmount = 0;
  for (const key in order.totalAmount) {
    totalAmount += parseInt(order.totalAmount[key]);
  }
  return (
    <li className="my-3 lg:m-6">
      <Link
        className="card bg-base-100 shadow-xl transition-all duration-200 hover:scale-105"
        to={`/negocio/${order.negocio}/pedidos/${order._id}`}
      >
        <div className="card-body flex-row">
          <div className="flex flex-col w-5/6">
            <h2 className="card-title capitalize">{order.direction}</h2>
            <p className="pl-4">Total: ${totalAmount}</p>
          </div>
          <OrderBadges state={order.state} />
        </div>
      </Link>
    </li>
  );
};
