<script lang="ts">
import AddTransaction from "$lib/components/add-transaction.svelte";
import Heading from "$lib/components/heading.svelte";
import IncomeExpenseSummary from "$lib/components/income-expense-summary.svelte";
import TransactionsList from "$lib/components/transactions-list.svelte";
import { formatCurrency } from "$lib/format-currency";
import { cn } from "$lib/utils";
import type { PageData } from "./$types";

export let data: PageData;

$: balance = data.transactions.reduce((acc, curr) => {
	return acc + curr.amount;
}, 0);
</script>

<svelte:head>
  <title>Expense Tracker</title>
</svelte:head>

<div class="flex flex-col gap-8">
  <h1 class="text-3xl font-bold">Expense Tracker</h1>
  
  <div>
    <Heading title="Balance">
      <span
        slot="inline-content"
        class={cn("text-green-500", balance < 0 && "text-red-500")}
        >{formatCurrency(balance)}</span
      >
    </Heading>
    <IncomeExpenseSummary transactions={data.transactions} />
  </div>
  
  <div>
    <Heading title="Transactions" />
    <TransactionsList transactions={data.transactions} />
  </div>
  
  <div>
    <Heading title="Add Transaction" />
    <AddTransaction form={data.form} />
  </div>
</div>
