import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../cfg/cfg.js";
import { loginUser, signupUser } from "../controller/authController.js";
export const authRouter = Router();

export function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.sendStatus(403);
  }
  const authToken = req.headers.authorization.split(" ")[1];
  try {
    const validatedToken = jwt.verify(authToken, SECRET);
    req._id = validatedToken;
  } catch (error) {
    return res.json({ error: "No auth token" });
  }
  next();
}

authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const data = await loginUser(username, password);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/signin", async (req, res, next) => {
  const newUser = req.body;
  try {
    const token = await signupUser(newUser);
    console.log(token);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});
