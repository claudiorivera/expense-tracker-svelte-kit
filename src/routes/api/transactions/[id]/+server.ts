import { TransactionModel } from "$lib/models/Transaction";
import { dbConnect } from "$lib/mongooseConnect";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

export const DELETE = async ({ params }: RequestEvent) => {
  await dbConnect();

  await TransactionModel.findOneAndDelete({
    _id: params.id,
  });

  return new Response(undefined, { status: 204 });
};
