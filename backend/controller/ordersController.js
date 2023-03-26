import { client } from "../cfg/mongodb.js";
import { MongoContainer } from "../container/mongoContainer.js";
import { getNegocios, postUser } from "./authController.js";

const ordersCollection = client.db("taxi-moto").collection("orders");
const ordersContainer = new MongoContainer(ordersCollection);

export async function getOrdersByIdNegocio(idNegocio) {
  const query = { "negocio._id": idNegocio };
  return await ordersContainer.getManyByFilter(query);
}
export async function getAvailableOrdersByIdNegocio(idNegocio) {
  const query = {
    $and: [{ "negocio._id": idNegocio }, { "state.TOMADO": false }],
  };
  return await ordersContainer.getManyByFilter(query);
}

export async function getOrdersByIdCadete(idCadete) {
  const query = { "cadete._id": idCadete };
  const asignedOrders = await ordersContainer.getManyByFilter(query);
  return asignedOrders;
}

export async function getNegociosWithOrders() {
  const negocios = await getNegocios();
  const allOrders = await ordersContainer.getManyByFilter({
    "state.TOMADO": false,
  });
  const sortedOrders = allOrders.reduce((acc, current) => {
    if (acc[current.negocio._id]) {
      acc[current.negocio._id].push(current);
    } else {
      acc[current.negocio._id] = [current];
    }
    return acc;
  }, {});
  negocios.forEach((negocio) => {
    negocio.orders = sortedOrders[negocio._id] ?? [];
  });
  return negocios;
}

export async function getOrdersById(idPedido) {
  return await ordersContainer.getById(idPedido);
}

export async function postOrder(order) {
  return await ordersContainer.save(order);
}

export async function deleteOrder(idOrder) {
  return await ordersContainer.delete(idOrder);
}

export async function putOrder(idOrder, order) {
  delete order._id;
  return await ordersContainer.update(idOrder, { $set: order });
}
