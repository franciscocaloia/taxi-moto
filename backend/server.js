import express from "express";
import {
  getNegocios,
  getUserById,
  putUser,
} from "./controller/authController.js";
import { authMiddleware, authRouter } from "./router/authRouter.js";
import { ordersRouter } from "./router/ordersRouter.js";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

const app = express();
app.use(express.json());

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

app.get("/negocios", authMiddleware, async (req, res) => {
  return res.json(await getNegocios());
});
app.use("/orders", authMiddleware, ordersRouter);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ data: { message: message } });
});

// app.listen(8080, () => {
//   console.log("Listening on port");
// });

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
app.io = io;
httpServer.listen(8080, () => {
  console.log("Listening on port" + httpServer.address().port);
});
