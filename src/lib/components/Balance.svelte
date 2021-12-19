<script>
  export let transactions;

  $: balance = transactions.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
</script>

<h2>
  Balance: {balance}
</h2>
