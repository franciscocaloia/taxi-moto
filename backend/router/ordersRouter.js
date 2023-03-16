import { Router } from "express";
import {
  deleteOrder,
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



// ordersRouter.get("/", async (req, res, next) => {
//   try {
//     const data = await getOrders(req.body);
//     return res.json(data);
//   } catch (error) {
//     next(error);
//   }
// });
ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = await postOrder(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});


ordersRouter.get("/negocio", async (req, res, next) => {
  try {
    const data = await getOrdersByIdNegocio(req.user);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cadete", async (req, res, next) => {
  try {
    const data = await getOrdersByIdCadete(req.user);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:idPedido", async (req, res, next) => {
  try {
    const data = await getOrdersById(req.params.idPedido);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:idPedido", async (req, res, next) => {
  try {
    const data = await putOrder(req.params.idPedido, req.body);
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
