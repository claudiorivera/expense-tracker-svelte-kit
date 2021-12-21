<script lang="ts">
  import type { Transaction } from "$lib/types";

  export let transactions: Transaction[];
  export let fetchTransactions: () => Promise<void>;

  const handleDelete = async (_id: string) => {
    await fetch(`/api/transactions/${_id}`, {
      method: "DELETE",
    });
    fetchTransactions();
  };
</script>

<ul>
  {#each transactions as transaction}
    <li>
      <button
        type="button"
        on:click={() => {
          handleDelete(transaction._id);
        }}
      >
        🗑️</button
      >
      {transaction.description}
      {transaction.amount}
    </li>
  {/each}
</ul>
