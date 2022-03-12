import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

export const del = async ({ params }: RequestEvent) => {
  await mongooseConnect();

  await TransactionModel.findOneAndDelete({
    _id: params.id,
  });

  return {
    status: 204,
  };
};
