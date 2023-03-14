import React from "react";
import { CadeteCard } from "../../cadete/cadeteCard";
import { Map } from "../../map/map";
import { Routing } from "../../map/routing";
import { OrderActions } from "./orderActions";
import { OrderBadges } from "./orderBadges";

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
          <div className="flex gap-3">
            <table className="table table-compact w-full">
              <tbody>
                <tr>
                  <th>Precio</th>
                  <td>${order.totalAmount.amount}</td>
                </tr>
                <tr>
                  <th>Envio</th>
                  <td>${order.totalAmount.shipment}</td>
                </tr>
                <tr>
                  <th>Servicio</th>
                  <td>${order.totalAmount.additional}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>${totalAmount}</th>
                </tr>
              </tfoot>
            </table>
            <OrderBadges state={order.state} />
          </div>
          <h2 className="card-title capitalize border-b-2 border-b-base-200">
            Cadete asignado
          </h2>
          <CadeteCard cadete={order.cadete} />
          <div className="border-b-2 border-b-base-200"></div>
          <OrderActions order={order} />
        </div>
      </div>
    </div>
  );
};
