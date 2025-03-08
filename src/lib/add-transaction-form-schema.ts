import { z } from "zod";

export const TransactionType = {
	Expense: "Expense",
	Income: "Income",
} as const;

export type TransactionType = keyof typeof TransactionType;

export const addTransactionFormSchema = z.object({
	description: z.string().min(1, "Description is required"),
	amount: z.coerce.number().positive("Please enter a positive number"),
	transactionType: z
		.nativeEnum(TransactionType)
		.default(TransactionType.Expense),
});

export type AddTransactionFormSchema = typeof addTransactionFormSchema;
