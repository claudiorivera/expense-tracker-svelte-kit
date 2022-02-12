import type { Transaction } from "$lib/types";
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema<Transaction>({
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
  transactionType: {
    type: String,
    default: "EXPENSE",
  },
});

export const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);
