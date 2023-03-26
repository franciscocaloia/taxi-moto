import React from "react";
import { useNavigate } from "react-router-dom";
import { NegocioOrderListItem } from "./negocioOrderListItem";

export const NegocioOrderList = ({ orders }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(0);
        }}
      >
        refresh
      </button>
      <ul className="w-5/6 mx-auto lg:grid lg:grid-cols-2 2xl:grid-cols-3 lg:w-4/5">
        {orders?.map((order) => (
          <NegocioOrderListItem key={order._id} order={order} />
        ))}
      </ul>
    </>
  );
};
