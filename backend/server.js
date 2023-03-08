import express from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "./controller/authController.js";
import { authMiddleware, authRouter } from "./router/authRouter.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRouter);

// app.use(authMiddleware);

app.get("/user", authMiddleware, async (req, res) => {
  return res.json(await getUserById(req._id));
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});
app.listen(8080, () => {
  console.log("Listening on port");
});
