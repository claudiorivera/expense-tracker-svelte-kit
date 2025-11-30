import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { TransactionModel } from "$lib/models/transaction";
import type { Transaction } from "$lib/types";

export async function seed() {
	await mongoose.connect(process.env.MONGODB_URI as string);

	const transactions: Array<Transaction> = Array.from({ length: 10 }, () => {
		const isExpense = faker.datatype.boolean();

		return {
			_id: faker.database.mongodbObjectId().toString(),
			description: isExpense ? faker.commerce.product() : "Paycheck",
			amount: Number(
				faker.finance.amount({
					min: isExpense ? -500 : 500,
					max: isExpense ? -1 : 500,
				}),
			),
		};
	});

	console.log("🗄️ Wiping database...");
	await TransactionModel.deleteMany();

	console.log("🌱 Seeding database...");
	for (const transaction of transactions) {
		const newTransaction = new TransactionModel(transaction);
		await newTransaction.save();
	}

	await mongoose.disconnect();
}
