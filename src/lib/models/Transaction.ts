import type { Transaction } from "$lib/types";
import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema<Transaction>({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const TransactionModel =
  models.Transaction || model<Transaction>("Transaction", TransactionSchema);
