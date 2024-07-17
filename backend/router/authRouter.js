import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../cfg/cfg.js";
import multer from "multer";
import {
  deleteUser,
  loginUser,
  putUser,
  signupUser,
  signupUserArray,
} from "../controller/authController.js";
import path from "path";

const __dirname = path.dirname("");
export const authRouter = Router();
const upload = multer({ dest: "images" });

export function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.sendStatus(403);
  }
  const authToken = req.headers.authorization.split(" ")[1];
  try {
    const validatedToken = jwt.verify(authToken, SECRET);
    req.user = validatedToken;
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

authRouter.post("/signin_cadete", async (req, res, next) => {
  const newUser = req.body
  try {
    const token = await signupUser(newUser);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});
authRouter.post("/signin_negocio", upload.single("image"), async (req, res, next) => {
  const state = JSON.parse(req.body.state)
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    direction: req.body.direction,
    location: state.mapInput.mapCoords,
    type: "negocio",
    debt:0,
    image: req.file.path,
  }
  try {
    const token = await signupUser(newUser);
    return res.json({ token });
    // return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
authRouter.put("/signin_cadete/:idCadete",upload.single("image"), async (req, res, next) => {
  const newUser = {...req.body,...(req.file && { image: req.file.path })}
  try {
    const token = await putUser(req.params.idCadete, newUser);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});
authRouter.put("/signin_negocio/:idNegocio",upload.single("image"), async (req, res, next) => {
  const state = JSON.parse(req.body.state)
  const newUser = {
    ...(req.body.name && {name: req.body.name}),
    ...(req.body.username && {username: req.body.username}),
    ...(req.body.password && {password: req.body.password}),
    ...(req.body.phone && {phone: req.body.phone,}),
    ...(req.body.direction && {direction: req.body.direction,}),
    ...(state.mapInput.mapCoords && {location: state.mapInput.mapCoords}),
    ...(req.file.path && {image: req.file.path}),
  }
  try {
    const token = await putUser(req.params.idNegocio, newUser);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});
authRouter.delete("/signin/:idUser", async (req, res, next) => {
  try {
    const token = await deleteUser(req.params.idUser);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/signupArray", async (req, res, next) => {
  const array = req.body;
  try {
    await signupUserArray(array);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
authRouter.post("/testNuevoCadete",upload.single("image"), (req, res, next) => {
  console.log(req.file)
  return res.sendStatus(200);
});

authRouter.get("/images/:idImage", (req, res, next) => {
  return res.sendFile(`images/${req.params.idImage}`, {
    root: __dirname,
  });
});
