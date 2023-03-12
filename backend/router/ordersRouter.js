import { Router } from "express";
import {
  deleteOrder,
  getOrdersByIdNegocio,
  postOrder,
} from "../controller/ordersController.js";
import { NotAuthError } from "../util/error.js";

export const ordersRouter = Router();

ordersRouter.get("/:idNegocio", async (req, res, next) => {
  if (req._id === req.params.idNegocio) {
    try {
      const data = await getOrdersByIdNegocio(req.params.idNegocio);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  } else {
    next(new NotAuthError("Acceso denegado"));
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await postOrder(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:idOrder", async (req, res, next) => {
  console.log("ahre");
  try {
    const data = await deleteOrder(req.params.idOrder);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

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
    // 6500: {
    //   shipment: 40,
    //   additional: 0,
    // },
  });
});
