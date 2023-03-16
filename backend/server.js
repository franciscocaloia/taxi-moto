import express from "express";
import { getUserById } from "./controller/authController.js";
import { authMiddleware, authRouter } from "./router/authRouter.js";
import { ordersRouter } from "./router/ordersRouter.js";

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

app.get("/user", authMiddleware, async (req, res) => {
  return res.json(await getUserById(req.user._id));
});

app.use(
  "/orders",
  authMiddleware,
  ordersRouter
);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});
app.listen(8080, () => {
  console.log("Listening on port");
});
