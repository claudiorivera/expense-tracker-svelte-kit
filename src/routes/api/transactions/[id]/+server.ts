import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

export const DELETE = async ({ params }: RequestEvent) => {
  await mongooseConnect();

  await TransactionModel.findOneAndDelete({
    _id: params.id,
  });

  return new Response(undefined, { status: 204 });
};
