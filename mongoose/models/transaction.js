import mongoose from "mongoose";
import { mongoDB } from '../index.js'

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  date: { type: Date },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionType: { type: String, required: true },
  productName: { type: String, default: 'UNKNOWN' },
  productShortenedName: { type: String },
  documentUrl: { type: String },
  amount: { type: Number, default: 1 },
  price: { type: Number, required: true },
  totalTransactionFee: { type: Number },
  documentAnalyzedByAI: { type: Boolean, default: false },
  extraFee: { type: Number },
  AIAnalysis: { type: Object }

}, { versionKey: false, autoIndex: true, timestamps: true });

TransactionSchema.methods.isOwner = function (user) {
  return this.userId.toString() === user.id;
};

TransactionSchema.pre('save', function (next) {
  next();
});

TransactionSchema.statics.getTransactionById = async function (id) {
  return await this.findById(id);
};

TransactionSchema.statics.getAllTransactions = async function (user, filters = {}) {
  let query = { userId: user.id };

  for (const key in filters) {
    if (filters[key] !== undefined) {
      switch (key) {
        case 'startDate':
          query.date = { ...query.date, $gte: new Date(filters.startDate) };
          break;
        case 'endDate':
          query.date = { ...query.date, $lte: new Date(filters.endDate) };
          break;

        case 'minAmount':
          query.amount = { ...query.amount, $gte: Number(filters.minAmount) };
          break;
        case 'maxAmount':
          query.amount = { ...query.amount, $lte: Number(filters.maxAmount) };
          break;
        case 'minPrice':
          query.price = { ...query.price, $gte: Number(filters.minPrice) };
          break;
        case 'maxPrice':
          query.price = { ...query.price, $lte: Number(filters.maxPrice) };
          break;
        case 'minTotalTransactionFee':
          query.totalTransactionFee = { ...query.totalTransactionFee, $gte: Number(filters.minTotalTransactionFee) };
          break;
        case 'maxTotalTransactionFee':
          query.totalTransactionFee = { ...query.totalTransactionFee, $lte: Number(filters.maxTotalTransactionFee) };
          break;

        case 'documentAnalyzedByAI':
          query.documentAnalyzedByAI = filters.documentAnalyzedByAI === 'true';
          break;

        case 'transactionType':
        case 'productName':
        case 'productShortenedName':
          if (filters[key + '_contains'] === 'true') {
            query[key] = { $regex: filters[key], $options: 'i' };
          } else {
            query[key] = filters[key];
          }
          break;

        default:
          break;
      }
    }
  }

  return await this.find(query);
};


TransactionSchema.statics.updateTransaction = async function (id, userId, updateData) {
  const transaction = await this.findById(id);
  if (!transaction) throw new Error('Transaction not found');
  if (!transaction.isOwner(userId)) throw new Error('Unauthorized access');

  return await this.findByIdAndUpdate(id, updateData, { new: true });
};




export const Transaction = mongoDB.model('transactions', TransactionSchema);
