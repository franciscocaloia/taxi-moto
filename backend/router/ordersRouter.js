import { Router } from "express";
import { getOrderByIdNegocio } from "../controller/ordersController";

export const ordersRouter = Router();

ordersRouter.get(":idNegocio", async (req, res, next) => {
  try {
    const data = await getOrdersByIdNegocio(req.params.idNegocio);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post(":idNegocio", async (req, res, error) => {
  try {
    const data = await postOrder(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
