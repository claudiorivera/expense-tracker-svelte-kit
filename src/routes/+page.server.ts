import { addTransactionFormSchema } from "$lib/addTransactionFormSchema";
import { TransactionModel } from "$lib/models/Transaction";
import { dbConnect } from "$lib/mongooseConnect";
import type { Transaction } from "$lib/types";
import { error, fail, type Actions, type Load } from "@sveltejs/kit";
import type { HydratedDocument } from "mongoose";
import { superValidate } from "sveltekit-superforms/server";

export const load: Load = async ({ fetch }) => {
	const url = "/api/transactions";
	const res = await fetch(url);

	if (res.ok) {
		return {
			transactions: await res.json(),
			form: await superValidate(addTransactionFormSchema),
		};
	}

	throw error(500, `Could not load ${url}`);
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, addTransactionFormSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await dbConnect();

		const transaction: HydratedDocument<Transaction> = new TransactionModel(
			form.data,
		);

		await transaction.save();

		return {
			form,
		};
	},
};
