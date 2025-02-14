import express from "express";
import { AuthRouter } from "./auth.js";
import { TransactionRouter } from "./transaction.js";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/transaction", TransactionRouter);


export { router as V1Router };