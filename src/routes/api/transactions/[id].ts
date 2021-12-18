import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { Transaction } from "$lib/types";
import type { Request } from "@sveltejs/kit";

export const get = async (req: Request): Promise<{ body: Transaction }> => {
  await mongooseConnect();

  const transaction = await TransactionModel.findOne({
    _id: req.params.id,
  });

  return {
    body: transaction,
  };
};
