<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  export let fetchTransactions: () => Promise<void>;

  enum TransactionType {
    EXPENSE = "EXPENSE",
    INCOME = "INCOME",
  }

  const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm(
    {
      initialValues: {
        description: "",
        amount: 0,
        transactionType: TransactionType.EXPENSE,
      },
      validationSchema: yup.object().shape({
        description: yup.string().required("Please enter a description"),
        amount: yup.number().not([0], "Please enter an amount").required(),
        transactionType: yup
          .string()
          .oneOf([TransactionType.EXPENSE, TransactionType.INCOME]),
      }),

      onSubmit: async ({ description, amount, transactionType }) => {
        await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            amount:
              transactionType === TransactionType.EXPENSE ? -amount : amount,
          }),
        });
        fetchTransactions();
      },
    },
  );
</script>

<form
  on:submit={handleSubmit}
  class="shadow rounded m-1 p-1 bg-white flex flex-col"
>
  <div class="flex flex-wrap justify-start m-3">
    <div class="flex-grow flex flex-col items-end">
      <div class="flex gap-5">
        <div class="flex items-center gap-1">
          <input
            id="transactionType-expense"
            name="transactionType"
            on:change={handleChange}
            type="radio"
            class="peer form-radio hidden"
            value={TransactionType.EXPENSE}
            checked={$form.transactionType === TransactionType.EXPENSE}
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
            name="transactionType"
            on:change={handleChange}
            type="radio"
            class="peer form-radio hidden"
            value={TransactionType.INCOME}
            checked={$form.transactionType === TransactionType.INCOME}
          />
          <label
            for="transactionType-income"
            class="my-2 p-2 w-20 text-center bg-slate-400 rounded ring  ring-slate-400 bg-transparent peer-checked:bg-indigo-500 peer-checked:text-white peer-checked:ring-indigo-600 cursor-pointer"
            >Income</label
          >
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="description" class="mr-2">Description</label>
          <input
            class="form-input rounded my-2"
            type="text"
            name="description"
            placeholder="Description"
            bind:value={$form.description}
          />
        </div>
        {#if $errors.description}
          <small class="self-end text-red-500">{$errors.description}</small>
        {/if}
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <label for="amount" class="mr-2">Amount</label>
          <input
            inputmode="decimal"
            class="form-input rounded my-2"
            type="number"
            step="0.01"
            name="amount"
            bind:value={$form.amount}
          />
        </div>
        {#if $errors.amount}
          <small class="self-end text-red-500">{$errors.amount}</small>
        {/if}
      </div>
    </div>
  </div>
  <button
    class="px-4 py-3 bg-indigo-500 disabled:bg-gray-500 rounded mx-auto my-3 w-1/2 text-white font-bold text-xl disabled:pointer-events-none"
    disabled={$isSubmitting}
    type="submit">Submit</button
  >
</form>
