<script context="module" lang="ts">
  export const load = async ({ fetch }) => {
    const url = "/api/transactions";
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          transactions: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  };
</script>

<script lang="ts">
  import AddTransaction from "$lib/components/AddTransaction.svelte";
  import Heading from "$lib/components/Heading.svelte";
  import IncomeExpenseSummary from "$lib/components/IncomeExpenseSummary.svelte";
  import TransactionsList from "$lib/components/TransactionsList.svelte";
  import { formatDollarAmount } from "$lib/formatDollarAmount";
  import type { Transaction } from "$lib/types";

  export let transactions: Transaction[];

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    transactions = (await res.json()) as Transaction[];
  };

  $: balance = transactions.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
</script>

<svelte:head>
  <title>Expense Tracker</title>
</svelte:head>

<div class="max-w-md mx-auto py-10">
  <h1 class="py-3 font-bold text-3xl">Expense Tracker</h1>

  <Heading title="Balance">
    <span
      slot="inline-content"
      class={balance < 0 ? "text-red-500" : "text-green-500"}
      >${formatDollarAmount(balance)}</span
    >
  </Heading>
  <IncomeExpenseSummary {transactions} />

  <Heading title="Transactions" />
  <TransactionsList {transactions} {fetchTransactions} />

  <Heading title="Add Transaction" />
  <AddTransaction {fetchTransactions} />
</div>
