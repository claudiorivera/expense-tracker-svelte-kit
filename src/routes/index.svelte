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
  import Balance from "$lib/components/Balance.svelte";
  import type { Transaction } from "$lib/types";
  export let transactions: Transaction[];
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Expense Tracker</h1>
<Balance {transactions} />

<!-- <IncomeExpenseSummary /> -->

<!-- <h2>Transactions:</h2>
<TransactionsList />
<h2>Add Transaction:</h2>
<AddTransaction /> -->
<style>
</style>
