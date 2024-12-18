import { TransactionModel } from "$lib/models/transaction";
import { dbConnect, dbDisconnect } from "$lib/mongoose-connect";
import type { Transaction } from "$lib/types";
import { faker } from "@faker-js/faker";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const secret = request.headers.get("authorization")?.split(" ")[1];

	if (secret !== process.env.CRON_SECRET) {
		return json({ message: "Unauthorized" }, { status: 401 });
	}

	await dbConnect();

	const transactions: Transaction[] = Array.from({ length: 10 }, () => {
		const isExpense = faker.datatype.boolean();

		return {
			description: isExpense ? faker.commerce.product() : "Paycheck",
			amount: Number(
				faker.finance.amount({
					min: isExpense ? -500 : 500,
					max: isExpense ? -1 : 500,
				}),
			),
		};
	});

	await TransactionModel.deleteMany();

	await Promise.all(
		transactions.map((transaction) => new TransactionModel(transaction).save()),
	);

	await dbDisconnect();

	return json({
		status: 204,
	});
};
