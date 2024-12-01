import type { Transaction } from "$lib/types";
import mongoose, { Model } from "mongoose";
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

export const TransactionModel: Model<Transaction> =
	models.Transaction ?? model<Transaction>("Transaction", TransactionSchema);
