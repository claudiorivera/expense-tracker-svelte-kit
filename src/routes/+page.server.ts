import { addTransactionFormSchema } from "$lib/add-transaction-form-schema";
import { TransactionModel } from "$lib/models/transaction";
import { dbConnect } from "$lib/mongoose-connect";
import { type Actions, fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	await dbConnect();

	const form = await superValidate(zod(addTransactionFormSchema));

	const transactions = await TransactionModel.find().lean();

	return {
		transactions: transactions.map((transaction) => ({
			...transaction,
			_id: transaction._id.toString(),
		})),
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

		const transaction = new TransactionModel(form.data);

		await transaction.save();

		return {
			form,
		};
	},
	delete: async ({ request }) => {
		const formData = await request.formData();

		await dbConnect();

		await TransactionModel.findOneAndDelete({
			_id: formData.get("transactionId"),
		});
	},
};
