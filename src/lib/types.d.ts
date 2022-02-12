/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Transaction {
  _id: Types.ObjectId;
  description: string;
  amount: number;
  transactionType: "INCOME" | "EXPENSE";
}
