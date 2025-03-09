import {
	TransactionType,
	addTransactionFormSchema,
} from "$lib/add-transaction-form-schema";
import { TransactionModel } from "$lib/models/transaction";
import { dbConnect } from "$lib/mongoose-connect";
import { type Actions, fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";

const form = await superValidate(zod(addTransactionFormSchema));
export type AddTransactionForm = typeof form;

export const load: PageServerLoad = async () => {
	await dbConnect();

	const transactionDocs = await TransactionModel.find().lean();

	const transactions = transactionDocs.map((transaction) => ({
		...transaction,
		_id: transaction._id.toString(),
	}));

	return {
		transactions,
		form,
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(addTransactionFormSchema));

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await dbConnect();

		const transaction = new TransactionModel({
			...form.data,
			amount:
				form.data.transactionType === TransactionType.Expense
					? -form.data.amount
					: form.data.amount,
		});

		await transaction.save();

		return {
			form,
		};
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get("id");

		await dbConnect();

		await TransactionModel.findOneAndDelete({
			_id: id,
		});

		return {
			success: true,
		};
	},
};
