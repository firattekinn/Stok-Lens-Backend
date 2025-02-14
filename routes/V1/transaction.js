import express from "express";
import { BadRequestResponse, GoodRequestResponse, UserMiddleware, generateToken } from "../../helpers/request.js";
import { ERROR_TYPES } from "../../enums/errorTypes.js";
import { User } from "../../mongoose/models/user.js";
import { Transaction } from "../../mongoose/models/transaction.js";
import { TRANSACTION_TYPES } from "../../enums/transactionTypes.js";

const router = express.Router();

router.post("/new", UserMiddleware, async (req, res) => {
  try {

    if (!Object.keys(TRANSACTION_TYPES).includes(req.body.transactionType)) {
      return BadRequestResponse(ERROR_TYPES.INVALID_TRANSACTION_TYPE, res);
    }

    if (!req.body.totalTransactionFee) {
      if (!req.body.amount) {
        req.body.amount = 1;
      }
      req.body.totalTransactionFee = req.body.amount * req.body.price
    }

    if (req.body.extraFee) {
      if (req.body.transactionType === TRANSACTION_TYPES.PURCHASE) {
        req.body.totalTransactionFee += req.body.extraFee;
      }
      else if (req.body.transactionType === TRANSACTION_TYPES.SALE) {
        req.body.totalTransactionFee -= req.body.extraFee;
      }
    }

    const transaction = new Transaction({ ...req.body, userId: req.user.id });

    return GoodRequestResponse({ transaction }, res);

  } catch (error) {

    console.log("🚀 ~ auth.js:37 ~ router.post ~ error:", error);

    return BadRequestResponse(ERROR_TYPES.NATIVE_ERROR, res, error.message);
  }
});


router.get("/:id", UserMiddleware, async (req, res) => {
  try {

    const transaction = await Transaction.getTransactionById(req.params.id);
    if (!transaction) return BadRequestResponse(ERROR_TYPES.TRANSACTION_NOT_FOUND, res)

    if (!transaction.isOwner(req.user)) {
      return BadRequestResponse(ERROR_TYPES.BAD_GUY_ERROR, res)
    }

    return GoodRequestResponse({ transaction }, res);

  } catch (error) {

    console.log("🚀 ~ auth.js:37 ~ router.post ~ error:", error);

    return BadRequestResponse(ERROR_TYPES.NATIVE_ERROR, res, error.message);
  }
});

export { router as TransactionRouter };