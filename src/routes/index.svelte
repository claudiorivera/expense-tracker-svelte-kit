<script context="module" lang="ts">
  export const prerender = true;
  export async function load({ fetch }) {
    const url = `/api/transactions`;
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
  }
</script>

<script lang="ts">
  import AddTransaction from "$lib/components/AddTransaction.svelte";

  import Heading from "$lib/components/Heading.svelte";
  import IncomeExpenseSummary from "$lib/components/IncomeExpenseSummary.svelte";
  import TransactionsList from "$lib/components/TransactionsList.svelte";
  import type { Transaction } from "$lib/types";
  export let transactions: Transaction[];

  $: balance = transactions.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
</script>

<svelte:head>
  <title>Expense Tracker</title>
</svelte:head>

<h1 class="py-3 font-bold text-3xl">Expense Tracker</h1>

<Heading title="Balance">
  <span class={balance < 0 ? "text-red-500" : "text-green-500"}>${balance}</span
  >
</Heading>
<IncomeExpenseSummary {transactions} />

<Heading title="Transactions" />
<TransactionsList {transactions} />

<Heading title="Add Transaction" />
<AddTransaction />
