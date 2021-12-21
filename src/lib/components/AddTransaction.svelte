<script lang="ts">
  import type { Transaction } from "$lib/types";

  export let fetchTransactions: () => Promise<void>;

  let description: string;
  let amount: number;

  const handleSubmit = async () => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, amount }),
    });
    description = "";
    amount = null;
    fetchTransactions();
  };
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="shadow rounded m-1 p-1 bg-white"
>
  <input type="text" name="description" bind:value={description} />
  <input type="number" name="amount" bind:value={amount} />
  <button type="submit">Submit</button>
</form>
