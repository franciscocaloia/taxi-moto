import { client } from "../cfg/mongodb.js";
import { MongoContainer } from "../container/mongoContainer.js";
import { UnprocessableError } from "../util/error.js";
import { getNegocios, getUserById, incUser } from "./authController.js";

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
      acc[current.negocio._id]++;
    } else {
      acc[current.negocio._id] = 1;
    }
    return acc;
  }, {});
  negocios.forEach((negocio) => {
    negocio.availableOrders = sortedOrders[negocio._id] ?? 0;
  });
  console.log(negocios);
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

export async function putOrder(idOrder, update) {
  const order = await getOrdersById(idOrder);
  if (order.state.ENTREGADO)
    throw new UnprocessableError("El pedido ya fue entregado");
  if (order.state.TOMADO && update.totalAmount) {
    await incUser(order.negocio._id, {
      debt: update.totalAmount.additional - order.totalAmount.additional,
    });
  }
  delete update._id;
  return await ordersContainer.update(idOrder, { $set: update });
}

export async function cancelarPedido(idOrder) {
  const order = await ordersContainer.getById(idOrder);
  if (order.cadete) {
    throw new UnprocessableError("El pedido ya tiene un cadete asignado");
  }
}

export async function tomarPedido(idOrder, idCadete) {
  const order = await ordersContainer.getById(idOrder);
  if (order.cadete) {
    throw new UnprocessableError("El pedido ya tiene un cadete asignado");
  }
  const cadete = await getUserById(idCadete);
  await incUser(order.negocio._id, {
    debt: order.totalAmount.additional,
  });
  await ordersContainer.update(idOrder, { $set: { cadete } });
  return await setState(idOrder, "TOMADO");
}

export async function retirarPedido(idOrder) {
  const order = await ordersContainer.getById(idOrder);
  if (!order.state.TOMADO) {
    throw new UnprocessableError("El pedido debe tener un cadete asignado");
  }
  return await setState(idOrder, "RETIRADO");
}

export async function abonarPedido(idOrder) {
  const order = await ordersContainer.getById(idOrder);
  if (!order.state.TOMADO) {
    throw new UnprocessableError("El pedido debe tener un cadete asignado");
  }
  return await setState(idOrder, "ABONADO");
}

export async function entregarPedido(idOrder) {
  const order = await ordersContainer.getById(idOrder);
  if (!order.state.RETIRADO) {
    throw new UnprocessableError("El pedido debe haber sido retirado");
  }
  await incUser(order.cadete._id, {
    earnings: order.totalAmount.shipment,
  });
  return await setState(idOrder, "ENTREGADO");
}

export async function setState(idOrder, state) {
  return await ordersContainer.update(idOrder, {
    $set: { [`state.${state}`]: true },
  });
}
