import { client } from "../cfg/mongodb";
import { MongoContainer } from "../container/mongoContainer";

const ordersCollection = client.db("taxi-moto").collection("orders");
const ordersContainer = new MongoContainer(ordersCollection);

export async function getOrderByIdNegocio(idNegocio) {
  return await ordersContainer.getByFilter({ idNegocio });
}

export async function postOrder(order) {
  return await ordersContainer.save(order);
}
