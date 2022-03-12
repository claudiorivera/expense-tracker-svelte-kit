<script lang="ts">
  import { formatDollarAmount } from "$lib/formatDollarAmount";
  import { fade } from "svelte/transition";
  import type { HydratedDocument } from "mongoose";

  import type { Transaction } from "$lib/types";
  import DeleteIcon from "./DeleteIcon.svelte";

  export let transactions: HydratedDocument<Transaction>[];
  export let fetchTransactions: () => Promise<void>;

  const handleDelete = async (_id: string) => {
    await fetch(`/api/transactions/${_id}`, {
      method: "DELETE",
    });
    fetchTransactions();
  };
</script>

<ul class="shadow rounded m-1 p-1 bg-white">
  {#each transactions as transaction (transaction._id.toString())}
    <li class="p-3 hover:font-bold border-b last:border-none" transition:fade>
      <div class="flex items-center">
        <button
          class="mr-1"
          type="button"
          on:click={() => {
            handleDelete(transaction._id.toString());
          }}
        >
          <DeleteIcon />
        </button>
        <div class="flex-grow">{transaction.description}</div>
        <div>{formatDollarAmount(transaction.amount)}</div>
      </div>
    </li>
  {/each}
</ul>
