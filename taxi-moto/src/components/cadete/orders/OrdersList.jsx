import React from "react";
import { OrdersListItem } from "./ordersListItem";

export const OrdersList = ({ orders }) => {
  return (
    <ul className="lg:grid lg:grid-cols-2 2xl:grid-cols-3">
      {orders?.map((order) => (
        <OrdersListItem key={order._id} order={order} />
      ))}
    </ul>
  );
};
