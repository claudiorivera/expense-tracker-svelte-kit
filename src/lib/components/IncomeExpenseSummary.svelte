<script lang="ts">
  export let transactions;

  $: totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);

  $: totalExpenses = Math.abs(
    transactions
      .filter((transaction) => transaction.amount <= 0)
      .reduce((acc, curr) => {
        return (acc += curr.amount);
      }, 0),
  );
</script>

<div class="shadow rounded m-1 p-1 bg-white">
  <div class="flex justify-between">
    <div class="flex-grow border-r text-center">
      <div>INCOME</div>
      <div class="text-green-500">${totalIncome}</div>
    </div>
    <div class="flex-grow text-center">
      <div>EXPENSES</div>
      <div class="text-red-500">-${totalExpenses}</div>
    </div>
  </div>
</div>
