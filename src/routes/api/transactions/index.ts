import type { Transaction } from "$lib/types";

export const get = async (): Promise<{ body: Transaction[] }> => {
  const transactions: Transaction[] = [
    {
      description: "Lunch",
      amount: 12.5,
    },
  ];

  return {
    body: transactions,
  };
};

export const post = async (): Promise<{ body: Transaction[] }> => {
  const transactions = [];

  return {
    body: transactions,
  };
};
