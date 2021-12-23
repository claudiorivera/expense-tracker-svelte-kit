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
            id="transactionType-expense"
            type="radio"
            class="peer form-radio hidden"
            bind:group={transactionType}
            value="expense"
          />
          <label
            for="transactionType-expense"
            class="my-2 p-2 w-20 text-center bg-slate-400 rounded ring  ring-slate-400 bg-transparent peer-checked:bg-indigo-500 peer-checked:text-white peer-checked:ring-indigo-600 cursor-pointer"
            >Expense</label
          >
        </div>
        <div class="flex items-center gap-1">
          <input
            id="transactionType-income"
            type="radio"
            class="peer form-radio hidden"
            bind:group={transactionType}
            value="income"
          />
          <label
            for="transactionType-income"
            class="my-2 p-2 w-20 text-center bg-slate-400 rounded ring  ring-slate-400 bg-transparent peer-checked:bg-indigo-500 peer-checked:text-white peer-checked:ring-indigo-600 cursor-pointer"
            >Income</label
          >
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
          inputmode="decimal"
          class="form-input rounded my-2"
          type="number"
          pattern={`^\d*(\.\d{(0, 2)})?$`}
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
