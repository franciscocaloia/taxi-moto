import { client } from "../cfg/mongodb.js";
import { MongoContainer } from "../container/mongoContainer.js";

const ordersCollection = client.db("taxi-moto").collection("orders");
const ordersContainer = new MongoContainer(ordersCollection);

export async function getOrdersByIdUser(user) {
  const { type, _id } = user;
  const query = {};
  query[type] = _id;
  return await ordersContainer.getManyByFilter(query);
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
  return await ordersContainer.update(idOrder, order);
}
