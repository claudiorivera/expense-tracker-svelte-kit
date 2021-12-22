export const formatDollarAmount = (amount: number): string => {
  const amountIsNegative = amount < 0;
  const wrapInParenthesis = (n: number): string =>
    `(${Math.abs(n).toFixed(2)})`;

  if (amountIsNegative) {
    return wrapInParenthesis(amount);
  } else {
    return amount.toFixed(2);
  }
};
