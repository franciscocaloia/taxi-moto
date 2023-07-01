import React from "react";
import { AdminNegocioOrdersListItem } from "./adminNegocioOrderListItem";

export const AdminNegocioOrdersList = ({ orders }) => {
  return (
    <ul className="lg:grid lg:grid-cols-2 2xl:grid-cols-3 ">
      {orders?.map((order) => (
        <AdminNegocioOrdersListItem key={order._id} order={order} />
      ))}
    </ul>
  );
};
