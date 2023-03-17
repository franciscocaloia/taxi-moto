import { Router } from "express";
import {
  deleteOrder,
  getNegociosWithOrders,
  getOrdersById,
  getOrdersByIdCadete,
  getOrdersByIdNegocio,
  postOrder,
  putOrder,
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
    const data = await getNegociosWithOrders();
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
