import type { Transaction } from "$lib/types";
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema<Transaction>({
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

export const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);
