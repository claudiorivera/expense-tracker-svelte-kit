import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { Transaction } from "$lib/types";
import type { Request } from "@sveltejs/kit";

export const get = async (): Promise<{ body: Transaction[] }> => {
  await mongooseConnect();

  const transactions = await TransactionModel.find();

  return {
    body: transactions,
  };
};

export const post = async (req: Request): Promise<{ body: Transaction }> => {
  const transaction = await TransactionModel.create(req.body);

  return {
    body: transaction,
  };
};
