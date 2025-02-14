import mongoose from "mongoose";
import { MONGO_CONNECTION_URL, MONGO_DB_NAME } from "../config.js";

export const mongoDB = mongoose.createConnection(MONGO_CONNECTION_URL, {
  dbName: MONGO_DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


