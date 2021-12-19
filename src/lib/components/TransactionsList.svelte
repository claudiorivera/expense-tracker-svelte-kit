<script lang="ts">
  import type { Transaction } from "$lib/types";

  export let transactions: Transaction[];
</script>

<ul>
  {#each transactions as transaction}
    <li>{transaction.description} {transaction.amount}</li>
  {/each}
</ul>
