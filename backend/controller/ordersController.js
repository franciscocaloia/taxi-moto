import { client } from "../cfg/mongodb.js";
import { MongoContainer } from "../container/mongoContainer.js";

const ordersCollection = client.db("taxi-moto").collection("orders");
const ordersContainer = new MongoContainer(ordersCollection);

export async function getOrdersByIdNegocio(idNegocio) {
  return await ordersContainer.getManyByFilter({ negocio: idNegocio });
}

export async function postOrder(order) {
  return await ordersContainer.save(order);
}

export async function deleteOrder(idOrder) {
  return await ordersContainer.delete(idOrder);
}
