import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
