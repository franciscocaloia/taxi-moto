import { ObjectId } from "mongodb";
import { isCompletedOrder } from "../../taxi-moto/src/utils/validation.js";
import { client } from "../cfg/mongodb.js";
import { MongoContainer } from "../container/mongoContainer.js";
import { UnprocessableError } from "../util/error.js";
import { getNegocios, getUserById, incUser } from "./authController.js";

const ordersCollection = client.db("taxi-moto").collection("orders");
const ordersContainer = new MongoContainer(ordersCollection);

export async function getOrdersByIdNegocio(idNegocio,initDate,finalDate) {
  const pendingOrdersQuery = {
    $and: [
      { "negocio._id": idNegocio },
      { canceled: { $exists: false } },
      {
        $or: [
          { "state.REGISTRADO": false },
          { "state.TOMADO": false },
          { "state.RETIRADO": false },
          { "state.ABONADO": false },
          { "state.ENTREGADO": false },
        ],
      },
    ],
  };
  const completedOrdersQuery = {
    $and: [
      { "negocio._id": idNegocio },
      { canceled: { $exists: false } },
      {
        $and: [
          { "state.REGISTRADO": true },
          { "state.TOMADO": true },
          { "state.RETIRADO": true },
          { "state.ABONADO": true },
          { "state.ENTREGADO": true },
        ],
      },
      { orderDate: { $gt: initDate } },
      { orderDate: { $lt: finalDate } }
    ],
  };
  const canceledOrdersQuery = {
    $and: [{ "negocio._id": idNegocio }, { canceled: { $exists: true } }],
  };
  const pendingOrders = await ordersContainer.getManyByFilter(
    pendingOrdersQuery,
    { orderDate: -1 }
  );
  const completedOrders = await ordersContainer.getManyByFilter(
    completedOrdersQuery,
    { orderDate: -1 }
  );
  const canceledOrders = await ordersContainer.getManyByFilter(
    canceledOrdersQuery,
    { orderDate: -1 }
  );
  
  return { pending: pendingOrders, completed: completedOrders, canceled: canceledOrders };
}
export async function getAvailableOrdersByIdNegocio(idNegocio) {
  const query = {
    $and: [
      { "negocio._id": idNegocio },
      { "state.TOMADO": false },
      { canceled: { $exists: false } },
    ],
  };
  return await ordersContainer.getManyByFilter(query, { orderDate: 1 });
}

export async function getOrdersByIdCadete(idCadete, initDate, finalDate) {
  const pendingOrdersQuery = {
    $and: [
      { "cadete._id": idCadete },
      { canceled: { $exists: false } },
      {
        $or: [
          { "state.REGISTRADO": false },
          { "state.TOMADO": false },
          { "state.RETIRADO": false },
          { "state.ABONADO": false },
          { "state.ENTREGADO": false },
        ],
      },
    ],
  };
  const completedOrdersQuery = {
    $and: [
      { "cadete._id": idCadete },
      { canceled: { $exists: false } },
      {
        $and: [
          { "state.REGISTRADO": true },
          { "state.TOMADO": true },
          { "state.RETIRADO": true },
          { "state.ABONADO": true },
          { "state.ENTREGADO": true },
        ],
      },
      { orderDate: { $gt: initDate } },
      { orderDate: { $lt: finalDate } }
    ],
  };
  const canceledOrdersQuery = {
    $and: [{ "cadete._id": idCadete }, { canceled: { $exists: true } }],
  };
  const pendingOrders = await ordersContainer.getManyByFilter(
    pendingOrdersQuery,
    { orderDate: -1 }
  );
  const completedOrders = await ordersContainer.getManyByFilter(
    completedOrdersQuery,
    { orderDate: -1 }
  );
  const canceledOrders = await ordersContainer.getManyByFilter(
    canceledOrdersQuery,
    { orderDate: -1 }
  );
  return { pending: pendingOrders, completed: completedOrders, canceled: canceledOrders };
}

export async function getNegocioDebt(idNegocio, initDate, finalDate) {
  //db.orders.aggregate([{"$match":{$and: [{ orderDate: { $gt: 1690576140000 } },{ orderDate: { $lt: 1690770540000 } },{"negocio._id":"641345786ba00a31280a29f3"}]}},{ "$group": { "_id": null, "sum": { "$sum": "$totalAmount.additional" }}}])
  const match = {
    $and: [
      { orderDate: { $gt: initDate } },
      { orderDate: { $lt: finalDate } },
      { "negocio._id": idNegocio },
    ],
  };
  const group = {
    _id: null,
    totalQuantity: { $sum: "$totalAmount.additional" },
  };
  return await ordersContainer.aggregate(match, group);
}

export async function getNegociosWithOrders() {
  const negocios = await getNegocios();
  const allOrders = await ordersContainer.getManyByFilter(
    {
      $and: [{ "state.TOMADO": false }, { canceled: { $exists: false } }],
    },
    { orderDate: 1 }
  );
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
  delete update._id;
  return await ordersContainer.update(idOrder, { $set: update });
}

export async function cancelarPedido(idOrder) {
  const order = await ordersContainer.getById(idOrder);
  if (isCompletedOrder(order))
    throw new UnprocessableError("El pedido ya fue entregado");
  return await ordersContainer.update(idOrder, {
    $set: { canceled: true, notified: false },
  });
}
export async function notificarPedido(idOrder) {
  return await ordersContainer.update(idOrder, { $set: { notified: true } });
}

export async function tomarPedido(idOrder, idCadete) {
  const cadete = await getUserById(idCadete);
  if (!cadete ){
    throw new UnprocessableError("El cadete no existe");
  }
  const result = await ordersContainer.updateWhere(
    { _id: new ObjectId(idOrder), "state.TOMADO": false },
    { $set: { cadete, [`state.TOMADO`]: true } }
  );
  if (result.modifiedCount === 0) {
    throw new UnprocessableError("El pedido ya tiene un cadete asignado");
  }
  const order = await ordersContainer.getById(idOrder);
  await incUser(order.negocio._id, {
    debt: order.totalAmount.additional,
  });
  return result;
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
