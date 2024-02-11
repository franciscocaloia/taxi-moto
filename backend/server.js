import express from "express";
import {
  getCadetes,
  getNegocios,
  getUserById,
  putUser,
} from "./controller/authController.js";
import { authMiddleware, authRouter } from "./router/authRouter.js";
import { ordersRouter } from "./router/ordersRouter.js";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import {
  cancelarPedido,
  getNegociosWithOrders,
  getOrdersById,
  getOrdersByIdCadete,
  notificarPedido,
} from "./controller/ordersController.js";
import cors from "cors";
import { isCompletedOrder } from "./util/validation.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.options("/*", (_, res) => {
  res.sendStatus(200);
});
app.use(authRouter);

app.get("/user", authMiddleware, async (req, res, next) => {
  const user = await getUserById(req.user._id);
  if (user) {
    return res.json(user);
  }
  return next(new NotAuthError("No se ha encontrado usuario"));
});

app.put("/user/:idUser", authMiddleware, async (req, res, next) => {
  try {
    const data = await putUser(req.params.idUser, req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
app.get("/negocio", async (req, res, next) => {
  try {
    const data = await getNegocios();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
app.get("/negocio/:idNegocio", async (req, res, next) => {
  try {
    const data = await getUserById(req.params.idNegocio);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
app.get("/cadete", async (req, res, next) => {
  try {
    const data = await getCadetes();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});
app.get("/cadete/:idCadete", async (req, res, next) => {
  try {
    const data = await getUserById(req.params.idCadete);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get("/negociowithorders", authMiddleware, async (req, res) => {
  return res.json(await getNegociosWithOrders());
});
app.use("/orders", authMiddleware, ordersRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ data: { message: message } });
});

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer, {
  cors: { origin: "*" },
});
app.io = io;
io.on("connection", (socket) => {
  socket.on("cadeteConnection", async (idCadete) => {
    const orders = await getOrdersByIdCadete(idCadete);
    orders.forEach((order) => {
      if (!isCompletedOrder(order)) {
        if (!order.canceled) {
          socket.join(order._id);
        } else if (!order.notified) {
          socket.emit("orderCanceled", order);
        }
      }
    });
  });
  socket.on("orderCanceledNotified", async (id) => {
    await notificarPedido(id);
  });
  socket.on("orderCanceled", async (id) => {
    try {
      const order = await getOrdersById(id);
      await cancelarPedido(id);
      socket.to(id).emit("orderCanceled", order);
    } catch (error) {
      socket.emit("orderCanceledError", error);
    }
  });
});

httpServer.listen(8080, () => {
  console.log("Listening on port" + httpServer.address().port);
});
