import { Router } from "express";
import { getNegocios, incUser } from "../controller/authController.js";
import {
  abonarPedido,
  deleteOrder,
  entregarPedido,
  getAvailableOrdersByIdNegocio,
  getOrdersById,
  getOrdersByIdCadete,
  getOrdersByIdNegocio,
  postOrder,
  putOrder,
  retirarPedido,
  tomarPedido,
} from "../controller/ordersController.js";

export const ordersRouter = Router();

ordersRouter.get("/prices", (req, res, next) => {
  return res.status(200).json({
    0: {
      shipment: 200,
      additional: 40,
    },
    2000: {
      shipment: 20,
      additional: -20,
    },
    2500: {
      shipment: 40,
      additional: 0,
    },
    3000: {
      shipment: 40,
      additional: 20,
    },
    3500: {
      shipment: 20,
      additional: 20,
    },
    4000: {
      shipment: 40,
      additional: 0,
    },
    4500: {
      shipment: 40,
      additional: 0,
    },
    5000: {
      shipment: 40,
      additional: 0,
    },
    5500: {
      shipment: 40,
      additional: 0,
    },
    6000: {
      shipment: 40,
      additional: 0,
    },
  });
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = await postOrder(req.body);
    await incUser(req.body.negocio._id, { availableOrders: 1 });
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/negocio/:idNegocio", async (req, res, next) => {
  try {
    const data = await getOrdersByIdNegocio(req.params.idNegocio);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/negocio", async (req, res, next) => {
  try {
    const data = await getNegocios();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cadete/:idCadete", async (req, res, next) => {
  try {
    const data = await getOrdersByIdCadete(req.params.idCadete);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cadete/negocio/:idNegocio", async (req, res, next) => {
  try {
    const data = await getAvailableOrdersByIdNegocio(req.params.idNegocio);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:idOrder", async (req, res, next) => {
  try {
    const data = await getOrdersById(req.params.idOrder);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:idOrder", async (req, res, next) => {
  try {
    const data = await putOrder(req.params.idOrder, req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:idOrder/cancelar", async (req, res, next) => {
  try {
    const data = await cancelOrder(req.params.idOrder);
    req.app.io;
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:idOrder/state/:state", async (req, res, next) => {
  try {
    const functions = {
      TOMADO: tomarPedido,
      RETIRADO: retirarPedido,
      ABONADO: abonarPedido,
      ENTREGADO: entregarPedido,
    };
    console.log(req.user);
    res.json(
      await functions[req.params.state](req.params.idOrder, req.user._id)
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

ordersRouter.delete("/:idOrder", async (req, res, next) => {
  try {
    const data = await deleteOrder(req.params.idOrder);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
