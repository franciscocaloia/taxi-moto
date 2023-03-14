import { client } from "../cfg/mongodb.js";
import jwt from "jsonwebtoken";
import { MongoContainer } from "../container/mongoContainer.js";
import bcrypt from "bcrypt";
import {
  NotAuthError,
  NotFoundError,
  UnprocessableError,
} from "../util/error.js";
import { SECRET } from "../cfg/cfg.js";

const usersCollection = client.db("taxi-moto").collection("users");
const usersContainer = new MongoContainer(usersCollection);

export async function loginUser(username, password) {
  const user = await usersContainer.getByFilter({ username });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ _id: user._id, type: user.type }, SECRET);
      const type = user.type;
      return { token, type };
    } else {
      throw new NotAuthError("Contraseña incorrecta");
    }
  } else {
    throw new NotFoundError("Usuario inexistente");
  }
}

export async function signupUser(newUser) {
  const { username, password } = newUser;
  const existingUser = await usersContainer.getByFilter({ username });
  if (existingUser) {
    throw new UnprocessableError("Usuario existente");
  } else {
    const hash = bcrypt.hashSync(password, 8);
    const user = await usersContainer.save({ ...newUser, password: hash });
    return jwt.sign(user._id, SECRET);
  }
}

export async function getUsers() {
  return await usersContainer.getAll();
}

export async function postUser(user) {
  return await usersContainer.save(user);
}

export async function getUserByFilter(filter) {
  return await usersContainer.getByFilter(filter);
}

export async function getUserById(id) {
  const user = await usersContainer.getById(id);
  delete user.password;
  return user;
}
