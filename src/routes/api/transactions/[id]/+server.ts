import { TransactionModel } from "$lib/models/transaction";
import { dbConnect } from "$lib/mongoose-connect";
import type { RequestEvent } from "@sveltejs/kit";

export const DELETE = async ({ params }: RequestEvent) => {
	await dbConnect();

	await TransactionModel.findOneAndDelete({
		_id: params.id,
	});

	return new Response(undefined, { status: 204 });
};
