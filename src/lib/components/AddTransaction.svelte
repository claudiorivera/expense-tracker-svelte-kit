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
      <div class="flex gap-5">
        <div class="flex items-center gap-1">
          <input
            name="transactionType-expense"
            type="radio"
            class="form-radio"
            bind:group={transactionType}
            value="expense"
            checked
          />
          <label for="transactionType-expense">Expense</label>
        </div>
        <div class="flex items-center gap-1">
          <input
            name="transactionType-income"
            type="radio"
            bind:group={transactionType}
            value="income"
          />
          <label for="transactionType-income">Income</label>
        </div>
      </div>
      <div>
        <label for="description" class="mr-2">Description</label>
        <input
          class="form-input rounded my-2"
          type="text"
          name="description"
          placeholder="Description"
          bind:value={description}
        />
      </div>
      <div>
        <label for="amount" class="mr-2">Amount</label>
        <input
          class="form-input rounded my-2"
          type="number"
          step="0.01"
          name="amount"
          placeholder="0.00"
          bind:value={amount}
        />
      </div>
    </div>
  </div>
  <button
    class="px-4 py-3 bg-indigo-500 rounded mx-auto my-3 w-1/2 text-white font-bold text-xl"
    type="submit">Submit</button
  >
</form>
