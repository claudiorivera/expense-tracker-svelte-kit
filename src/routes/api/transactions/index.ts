import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { Transaction } from "$lib/types";
import type { RequestEvent } from "@sveltejs/kit/types/internal";
import type { HydratedDocument } from "mongoose";

export const get = async () => {
  await mongooseConnect();

  const transactions = await TransactionModel.find();

  return {
    body: transactions,
  };
};

export const post = async ({ request }: RequestEvent) => {
  await mongooseConnect();

  const body = await request.json();
  const transaction = new TransactionModel(body);
  const savedTransaction = await transaction.save();

  return {
    status: 201,
    body: savedTransaction,
  };
};
