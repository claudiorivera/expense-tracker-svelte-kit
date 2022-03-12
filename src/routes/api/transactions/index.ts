import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { Transaction } from "$lib/types";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

export const get = async (): Promise<{ body: Transaction[] }> => {
  await mongooseConnect();

  const transactions = await TransactionModel.find();

  return {
    body: transactions,
  };
};

export const post = async ({
  request,
}: RequestEvent): Promise<{ body: Transaction }> => {
  const body = await request.json();
  const transaction = await TransactionModel.create(body);

  return {
    body: transaction,
  };
};
