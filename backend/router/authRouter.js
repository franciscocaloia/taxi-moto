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

authRouter.post("/signin", upload.single("image"), async (req, res, next) => {
  const newUser = { ...req.body, image: req.file.path };
  console.log(newUser);
  try {
    const token = await signupUser(newUser);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});
authRouter.put("/signin/:idCadete", async (req, res, next) => {
  const newUser = req.body;
  try {
    const token = await putUser(req.params.idCadete, newUser);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
});
authRouter.delete("/signin/:idCadete", async (req, res, next) => {
  try {
    const token = await deleteUser(req.params.idCadete);
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
authRouter.post("/testNuevoCadete", (req, res, next) => {
  return res.sendStatus(200);
});

authRouter.get("/images/:idImage", (req, res, next) => {
  return res.sendFile(`images/${req.params.idImage}`, {
    root: __dirname,
  });
});
