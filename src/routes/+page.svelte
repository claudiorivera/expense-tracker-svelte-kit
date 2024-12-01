<script lang="ts">
import AddTransaction from "$lib/components/add-transaction.svelte";
import Heading from "$lib/components/heading.svelte";
import IncomeExpenseSummary from "$lib/components/income-expense-summary.svelte";
import TransactionsList from "$lib/components/transactions-list.svelte";
import { formatCurrency } from "$lib/format-currency";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

let { transactions } = $state(data);

let balance = $derived(
	transactions.reduce((acc, curr) => {
		return acc + curr.amount;
	}, 0),
);
</script>

<svelte:head>
  <title>Expense Tracker</title>
</svelte:head>

<div class="mx-auto max-w-xs py-10 md:max-w-lg">
  <h1 class="py-3 text-3xl font-bold">Expense Tracker</h1>

  <Heading>
    Balance:
    <span class={balance < 0 ? "text-red-500" : "text-green-500"}>
      {formatCurrency(balance)}
    </span>
  </Heading>
  <IncomeExpenseSummary {transactions} />

  <Heading>Transactions</Heading>
  <TransactionsList {transactions} />

  <Heading>Add Transaction</Heading>
  <AddTransaction data={data.form} />
</div>
