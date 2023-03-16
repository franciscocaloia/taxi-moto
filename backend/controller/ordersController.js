import { client } from "../cfg/mongodb.js";
import { MongoContainer } from "../container/mongoContainer.js";

const ordersCollection = client.db("taxi-moto").collection("orders");
const ordersContainer = new MongoContainer(ordersCollection);

export async function getOrdersByIdNegocio(user) {
  const { _id } = user;
  const query = { negocio: _id };
  return await ordersContainer.getManyByFilter(query);
}
export async function getOrdersByIdCadete(user) {
  const { _id } = user;
  const query = { negocio: _id };
  const asignedOrders = await ordersContainer.getManyByFilter(query);
  if(!asignedOrders.length){
    const allOrders = await ordersContainer.getAll()
    const sortedOrders = allOrders.reduce((acc,current)=>{
      if(acc[current.negocio]){
        acc[current.negocio].push(current)
      }else{
        acc[current.negocio]=[current]
      }
      return acc
    },{})
    return {sortedOrders}
  }
  return {asignedOrders};
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
