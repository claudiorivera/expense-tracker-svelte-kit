import mongoose from "mongoose";
import type { Transaction } from "$lib/types";

const { model, models, Schema } = mongoose;

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
	(models.Transaction as mongoose.Model<Transaction>) ??
	model<Transaction>("Transaction", TransactionSchema);
