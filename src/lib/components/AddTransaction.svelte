<script lang="ts">
  export let fetchTransactions: () => Promise<void>;

  let description: string;
  let amount: number;
  let transactionType: string = "expense";

  const transformAmount = (amount: number) =>
    transactionType === "expense" ? -amount : amount;

  const handleSubmit = async () => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, amount: transformAmount(amount) }),
    });
    description = "";
    amount = null;
    fetchTransactions();
  };
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="shadow rounded m-1 p-1 bg-white flex flex-col"
>
  <div class="flex flex-wrap justify-start m-3">
    <div class="flex-grow flex flex-col items-end">
      <div class="flex gap-3">
        <label
          >Expense<input
            type="radio"
            bind:group={transactionType}
            value="expense"
            checked
          /></label
        >
        <label
          >Income<input
            type="radio"
            bind:group={transactionType}
            value="income"
          /></label
        >
      </div>
      <label
        >Description<input
          type="text"
          name="description"
          placeholder="Description"
          bind:value={description}
        /></label
      >
      <label
        >Amount<input
          type="number"
          step="0.01"
          name="amount"
          placeholder="0.00"
          bind:value={amount}
        /></label
      >
    </div>
  </div>
  <button
    class="p-2 bg-indigo-500 rounded mx-auto my-3 w-1/2 text-white font-bold"
    type="submit">Submit</button
  >
</form>
