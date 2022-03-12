<script lang="ts">
  import { formatDollarAmount } from "$lib/formatDollarAmount";
  import type { Transaction } from "$lib/types";

  export let transactions: Transaction[];

  $: totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);

  $: totalExpenses = transactions
    .filter((transaction) => transaction.amount <= 0)
    .reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);
</script>

<div class="shadow rounded m-1 p-1 bg-white">
  <div class="flex justify-between">
    <div class="flex-grow border-r text-center">
      <div>INCOME</div>
      <div class="text-green-500">${formatDollarAmount(totalIncome)}</div>
    </div>
    <div class="flex-grow text-center">
      <div>EXPENSES</div>
      <div class="text-red-500">${formatDollarAmount(totalExpenses)}</div>
    </div>
  </div>
</div>
