<script>
  export let transactions;

  $: balance = transactions.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
</script>

<section class="text-xl font-bold">
  Balance: <span class={balance < 0 ? "text-red-500" : "text-green-500"}
    >${balance}</span
  >
</section>
