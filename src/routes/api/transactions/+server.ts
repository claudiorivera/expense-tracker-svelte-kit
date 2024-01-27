import { TransactionModel } from "$lib/models/transaction";
import { dbConnect } from "$lib/mongoose-connect";
import type { Transaction } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { HydratedDocument } from "mongoose";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	await dbConnect();

	const transactions: HydratedDocument<Transaction>[] =
		await TransactionModel.find();

	return json(transactions);
};

export const POST: RequestHandler = async ({ request }) => {
	await dbConnect();

	const body = await request.json();
	const transaction: HydratedDocument<Transaction> = new TransactionModel(body);
	const savedTransaction = await transaction.save();

	return json(savedTransaction, {
		status: 201,
	});
};
