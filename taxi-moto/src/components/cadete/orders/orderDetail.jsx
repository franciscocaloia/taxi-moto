import React from "react";
import { useNavigation } from "react-router-dom";
import { isCompletedOrder } from "../../../utils/validation";
import { Map } from "../../map/map";
import { Routing } from "../../map/routing";
import { NegocioCard } from "../../negocio/negocioCard";
import { OrderBadges } from "../../negocio/orders/orderBadges";
import { CadeteOrderActions } from "./cadeteOrderActions";

export const OrderDetail = ({ order }) => {
  let totalAmount = 0;
  for (const key in order.totalAmount) {
    totalAmount += parseInt(order.totalAmount[key]);
  }
  return (
    <div className="w-full h-full p-6 lg:w-4/5 xl:w-2/3  mx-auto">
      <div className="card lg:h-full lg:card-side bg-base-100 shadow-xl">
        <div className="w-full h-60 lg:h-full lg:w-1/2 lg:py-6 lg:pl-6">
          <Map bounds={[order.route.from, order.route.to]}>
            <Routing route={order.route} />
          </Map>
        </div>
        <div className="card-body lg:w-1/2 p-6">
          <h2 className="card-title capitalize border-b-2 border-b-base-200">
            {order.direction}
          </h2>
          <h3>Contacto: {order.phone}</h3>
          <h3>
            Horario: {order.date === "" ? "Entrega Inmediata" : order.date}
          </h3>
          <div className="flex gap-3">
            <table className="table table-compact w-full">
              <tbody>
                <tr>
                  <th>Total</th>
                  <td>${totalAmount}</td>
                </tr>
                <tr>
                  <th>Ganancia</th>
                  <td>${order.totalAmount.shipment}</td>
                </tr>
              </tbody>
            </table>
            <OrderBadges state={order.state} />
          </div>

          <NegocioCard negocio={order.negocio} />
          {!isCompletedOrder(order) && <CadeteOrderActions order={order} />}
        </div>
      </div>
    </div>
  );
};
