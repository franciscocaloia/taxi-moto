import { Router } from "express";
import {
  abonarPedido,
  deleteOrder,
  entregarPedido,
  getAvailableOrdersByIdNegocio,
  getNegocioDebt,
  getNegociosWithOrders,
  getOrdersById,
  getOrdersByIdCadete,
  getOrdersByIdNegocio,
  postOrder,
  putOrder,
  retirarPedido,
  setState,
  tomarPedido,
} from "../controller/ordersController.js";

export const ordersRouter = Router();

ordersRouter.get("/prices", (req, res, next) => {
  return res.status(200).json({
    0: {
      shipment: 800,
      additional: 50,
    },
    1000: {
      shipment: 50,
      additional: 0,
    },
    1500: {
      shipment: 50,
      additional: 0,
    },
    2000: {
      shipment: 50,
      additional: 0,
    },
    2500: {
      shipment: 50,
      additional: 0,
    },
    3000: {
      shipment: 50,
      additional: 0,
    },
    3500: {
      shipment: 50,
      additional: 0,
    },
    4000: {
      shipment: 50,
      additional: 0,
    },
    4500: {
      shipment: 50,
      additional: 0,
    },
    5000: {
      shipment: 50,
      additional: 0,
    },
    5500: {
      shipment: 50,
      additional: 0,
    },
    6000: {
      shipment: 50,
      additional: 0,
    },
    6500: {
      shipment: 50,
      additional: 0,
    },
    7000: {
      shipment: 50,
      additional: 0,
    },
    7500: {
      shipment: 50,
      additional: 0,
    },
    8000: {
      shipment: 50,
      additional: 0,
    },
    8500: {
      shipment: 50,
      additional: 0,
    },
    9000: {
      shipment: 50,
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
    const data = await getOrdersByIdNegocio(req.params.idNegocio,
    parseInt(req.query.initDate),
    parseInt(req.query.finalDate));
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/negocio/:idNegocio/debt", async (req, res, next) => {
  try {
    const data = await getNegocioDebt(
      req.params.idNegocio,
      parseInt(req.query.initDate),
      parseInt(req.query.finalDate)
    );
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/negociowithorders", async (req, res, next) => {
  try {
    const data = await getNegociosWithOrders();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cadete/:idCadete", async (req, res, next) => {
  try {
    const data = await getOrdersByIdCadete(
      req.params.idCadete,
      parseInt(req.query.initDate),
      parseInt(req.query.finalDate)
    );
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
ordersRouter.put("/:idOrder/state/:state", async (req, res, next) => {
  try {
    if (req.user.type === "admin") {
      setState(req.params.idOrder, req.params.state);
    } else {
      switch (req.params.state) {
        case "TOMADO":
          res.json(await tomarPedido(req.params.idOrder, req.user._id));
          break;
        case "RETIRADO":
          res.json(await retirarPedido(req.params.idOrder));
          break;
        case "ABONADO":
          res.json(await abonarPedido(req.params.idOrder));
          break;
        case "ENTREGADO":
          res.json(await entregarPedido(req.params.idOrder));
          break;
      }
    }
  } catch (error) {
    console.log(error);
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

ordersRouter.delete("/:idOrder", async (req, res, next) => {
  try {
    const data = await deleteOrder(req.params.idOrder);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
