import { MongoClient } from "mongodb";
import { MONGO_URL } from "./cfg.js";
export const client = await MongoClient.connect(MONGO_URL);
