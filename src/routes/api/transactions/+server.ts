import { TransactionModel } from "$lib/models/Transaction";
import { mongooseConnect } from "$lib/mongooseConnect";
import type { Transaction } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { HydratedDocument } from "mongoose";

export const GET: RequestHandler = async () => {
  await mongooseConnect();

  const transactions: HydratedDocument<Transaction>[] =
    await TransactionModel.find();

  return json(transactions);
};

export const POST: RequestHandler = async ({ request }) => {
  await mongooseConnect();

  const body = await request.json();
  const transaction: HydratedDocument<Transaction> = new TransactionModel(body);
  const savedTransaction = await transaction.save();

  return json(savedTransaction, {
    status: 201,
  });
};
