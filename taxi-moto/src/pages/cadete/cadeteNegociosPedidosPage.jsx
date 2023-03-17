import React from "react";
import { useLocation } from "react-router-dom";
import { NegocioOrderList } from "../../components/cadete/orders/negoicoOrderList";

export const CadeteNegociosPedidosPage = () => {
  const location = useLocation();
  return <NegocioOrderList orders={location.state} />;
};
